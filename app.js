/**
 * Uni-Planung: KI & Kognitive Informatik (Uni Bielefeld)
 * Multi-Area Degree Planner with Flexible Course-to-Module Allocation Engine
 * In-Memory Privacy Mode with Excel Export/Import.
 */

(function () {
  'use strict';

  // Clear any legacy localStorage data for privacy
  try {
    localStorage.removeItem('bielefeld_ki_study_progress_v1');
    localStorage.removeItem('bielefeld_ki_custom_modules_v1');
    localStorage.removeItem('bielefeld_ki_pflicht_v1');
    localStorage.removeItem('bielefeld_ki_pflicht_completed_v2');
    localStorage.removeItem('bielefeld_ki_pflicht_grades_v2');
  } catch (e) {
    // Ignore
  }

  // Application State (In-Memory Only)
  const state = {
    activeTab: 'tab-pflicht',
    pflichtCompletedIds: new Set(),
    pflichtGrades: {}, // { [moduleId]: 1.3 }
    loggedCourses: [] // Array of { id, name, lp, grade, possibleModuleIds: [], assignedModuleId: '' }
  };

  // DOM Elements
  const elements = {
    // Metric header
    averageGradeDisplay: document.getElementById('averageGradeDisplay'),
    gradedLpSubtext: document.getElementById('gradedLpSubtext'),
    totalDegreeLpText: document.getElementById('totalDegreeLpText'),
    totalRemainingLpSubtext: document.getElementById('totalRemainingLpSubtext'),
    pflichtLpText: document.getElementById('pflichtLpText'),
    pflichtSubtext: document.getElementById('pflichtSubtext'),
    wpLpText: document.getElementById('wpLpText'),
    wpSubtext: document.getElementById('wpSubtext'),
    mikeLpText: document.getElementById('mikeLpText'),
    mikeSubtext: document.getElementById('mikeSubtext'),
    seLpText: document.getElementById('seLpText'),
    seSubtext: document.getElementById('seSubtext'),

    // Tab badges
    tabBadgePflicht: document.getElementById('tabBadgePflicht'),
    tabBadgeWp: document.getElementById('tabBadgeWp'),
    tabBadgeMike: document.getElementById('tabBadgeMike'),
    tabBadgeSe: document.getElementById('tabBadgeSe'),
    tabBadgeCourses: document.getElementById('tabBadgeCourses'),

    // Area badges
    areaWpBadge: document.getElementById('areaWpBadge'),
    areaMikeBadge: document.getElementById('areaMikeBadge'),
    areaSeBadge: document.getElementById('areaSeBadge'),
    coursesCountBadge: document.getElementById('coursesCountBadge'),

    // Containers
    semestersContainer: document.getElementById('semestersContainer'),
    wahlpflichtTableBody: document.getElementById('wahlpflichtTableBody'),
    mikeTableBody: document.getElementById('mikeTableBody'),
    seTableBody: document.getElementById('seTableBody'),
    loggedCoursesTableBody: document.getElementById('loggedCoursesTableBody'),
    possibleModulesCheckboxGrid: document.getElementById('possibleModulesCheckboxGrid'),

    // Form elements
    addCourseForm: document.getElementById('addCourseForm'),
    inputCourseName: document.getElementById('inputCourseName'),
    inputCourseLp: document.getElementById('inputCourseLp'),
    inputCourseGrade: document.getElementById('inputCourseGrade'),

    // Actions
    resetBtn: document.getElementById('resetBtn'),
    exportExcelBtn: document.getElementById('exportExcelBtn'),
    importExcelBtn: document.getElementById('importExcelBtn'),
    fileInput: document.getElementById('fileInput')
  };

  // Initialization
  function init() {
    setupEventListeners();
    populatePossibleModulesCheckboxes();
    render();
  }

  // Populate checkbox list in course logger
  function populatePossibleModulesCheckboxes() {
    const allElectives = getAllElectiveModules();
    elements.possibleModulesCheckboxGrid.innerHTML = '';

    allElectives.forEach(mod => {
      const label = document.createElement('label');
      label.className = 'checkbox-label';
      label.title = `${mod.area}: ${mod.code} - ${mod.name} (${mod.lp} LP)`;

      label.innerHTML = `
        <input type="checkbox" name="possibleModule" value="${escapeHtml(mod.id)}" class="checkbox-input" style="width: 15px; height: 15px;">
        <span><strong>${escapeHtml(mod.code)}</strong> ${escapeHtml(mod.name)} (${mod.lp} LP - ${escapeHtml(mod.area)})</span>
      `;

      elements.possibleModulesCheckboxGrid.appendChild(label);
    });
  }

  // ==========================================
  // CALCULATIONS & AGGREGATIONS
  // ==========================================
  function calculateAllStats() {
    const allPflicht = getAllPflichtModules();

    // 1. Pflichtbereich Stats
    let pflichtLp = 0;
    let pflichtCompletedCount = 0;
    let totalWeightedGradeSum = 0;
    let totalGradedLp = 0;

    allPflicht.forEach(mod => {
      const isDone = state.pflichtCompletedIds.has(mod.id);
      const isGraded = mod.bPr !== '-' && parseInt(mod.bPr, 10) > 0;
      const grade = state.pflichtGrades[mod.id];

      if (isDone) {
        pflichtLp += mod.lp;
        pflichtCompletedCount++;
      }

      if (isGraded && grade !== undefined && grade !== null && !isNaN(grade)) {
        if (isDone || grade <= 4.0) {
          totalWeightedGradeSum += grade * mod.lp;
          totalGradedLp += mod.lp;
        }
      }
    });

    // 2. Map of filled LP and grades per elective module
    const moduleAllocations = {}; // { [moduleId]: { courses: [], filledLp: 0, weightedSum: 0, gradedLp: 0 } }

    const allElectiveModules = getAllElectiveModules();
    allElectiveModules.forEach(mod => {
      moduleAllocations[mod.id] = {
        module: mod,
        courses: [],
        filledLp: 0,
        weightedSum: 0,
        gradedLp: 0
      };
    });

    // Distribute logged courses to their assigned modules
    state.loggedCourses.forEach(course => {
      const assignedId = course.assignedModuleId;
      if (assignedId && moduleAllocations[assignedId]) {
        const bucket = moduleAllocations[assignedId];
        bucket.courses.push(course);
        bucket.filledLp += course.lp;

        if (course.grade !== null && course.grade !== undefined && !isNaN(course.grade)) {
          bucket.weightedSum += course.grade * course.lp;
          bucket.gradedLp += course.lp;

          // Add to overall degree GPA
          totalWeightedGradeSum += course.grade * course.lp;
          totalGradedLp += course.lp;
        }
      }
    });

    // 3. Category LP sums
    let wpLp = 0;
    let mikeLp = 0;
    let seLp = 0;

    WAHLPFLICHT_MODULES.forEach(m => {
      wpLp += moduleAllocations[m.id].filledLp;
    });

    MIKE_MODULES.forEach(m => {
      mikeLp += moduleAllocations[m.id].filledLp;
    });

    STRUKTURIERTE_ERGAENZUNG_MODULES.forEach(m => {
      seLp += moduleAllocations[m.id].filledLp;
    });

    const totalDegreeLp = pflichtLp + wpLp + mikeLp + seLp;
    const remainingLp = Math.max(0, 180 - totalDegreeLp);

    let overallGpa = '-';
    if (totalGradedLp > 0) {
      overallGpa = (totalWeightedGradeSum / totalGradedLp).toFixed(2).replace('.', ',');
    }

    return {
      pflichtLp,
      pflichtCompletedCount,
      totalPflichtCount: allPflicht.length,
      wpLp,
      mikeLp,
      seLp,
      totalDegreeLp,
      remainingLp,
      totalGradedLp,
      overallGpa,
      moduleAllocations
    };
  }

  // ==========================================
  // RENDERING FUNCTIONS
  // ==========================================
  function render() {
    const stats = calculateAllStats();
    renderSummary(stats);
    renderPflichtTable();
    renderElectiveAreaTable('Wahlpflicht', WAHLPFLICHT_MODULES, elements.wahlpflichtTableBody, stats.moduleAllocations);
    renderElectiveAreaTable('MiKE', MIKE_MODULES, elements.mikeTableBody, stats.moduleAllocations);
    renderElectiveAreaTable('Strukturierte Ergänzung', STRUKTURIERTE_ERGAENZUNG_MODULES, elements.seTableBody, stats.moduleAllocations);
    renderLoggedCoursesTable();
  }

  // Render Top Summary
  function renderSummary(stats) {
    elements.averageGradeDisplay.textContent = stats.overallGpa;
    elements.gradedLpSubtext.textContent = `${stats.totalGradedLp} LP benotet`;

    elements.totalDegreeLpText.textContent = stats.totalDegreeLp;
    elements.totalRemainingLpSubtext.textContent = `${stats.remainingLp} LP ausstehend (Ziel: 180 LP)`;

    elements.pflichtLpText.textContent = stats.pflichtLp;
    elements.pflichtSubtext.textContent = `${stats.pflichtCompletedCount} / ${stats.totalPflichtCount} Module`;

    elements.wpLpText.textContent = stats.wpLp;
    elements.wpSubtext.textContent = `${stats.wpLp} / 20 LP belegt`;

    elements.mikeLpText.textContent = stats.mikeLp;
    elements.mikeSubtext.textContent = `${stats.mikeLp} / 10 LP belegt`;

    elements.seLpText.textContent = stats.seLp;
    elements.seSubtext.textContent = `${stats.seLp} / 30 LP belegt`;

    // Tab badges
    elements.tabBadgePflicht.textContent = `${stats.pflichtLp}/120 LP`;
    elements.tabBadgeWp.textContent = `${stats.wpLp}/20 LP`;
    elements.tabBadgeMike.textContent = `${stats.mikeLp}/10 LP`;
    elements.tabBadgeSe.textContent = `${stats.seLp}/30 LP`;
    elements.tabBadgeCourses.textContent = `${state.loggedCourses.length} Kurse`;

    // Area badges
    elements.areaWpBadge.textContent = `${stats.wpLp} / 20 LP belegt`;
    elements.areaWpBadge.classList.toggle('done', stats.wpLp >= 20);

    elements.areaMikeBadge.textContent = `${stats.mikeLp} / 10 LP belegt`;
    elements.areaMikeBadge.classList.toggle('done', stats.mikeLp >= 10);

    elements.areaSeBadge.textContent = `${stats.seLp} / 30 LP belegt`;
    elements.areaSeBadge.classList.toggle('done', stats.seLp >= 30);

    elements.coursesCountBadge.textContent = `${state.loggedCourses.length} erfasste Veranstaltungen`;
  }

  // ------------------------------------------
  // 1. RENDER PFLICHTBEREICH TABLE
  // ------------------------------------------
  function renderPflichtTable() {
    elements.semestersContainer.innerHTML = '';

    PFLICHT_SEMESTERS.forEach(sem => {
      let semCompletedLp = 0;
      let semTotalLp = 0;
      sem.modules.forEach(m => {
        semTotalLp += m.lp;
        if (state.pflichtCompletedIds.has(m.id)) {
          semCompletedLp += m.lp;
        }
      });

      const isSemFullyDone = semCompletedLp === semTotalLp && semTotalLp > 0;

      const section = document.createElement('section');
      section.className = 'semester-section';

      section.innerHTML = `
        <div class="section-header">
          <h2 class="section-title">${escapeHtml(sem.title)}</h2>
          <span class="section-lp-badge ${isSemFullyDone ? 'done' : ''}">
            ${semCompletedLp} / ${semTotalLp} LP abgeschlossen
          </span>
        </div>
        <div class="table-responsive">
          <table class="modul-table">
            <thead>
              <tr>
                <th class="col-check" title="Erledigt">Status</th>
                <th class="col-code">Kürzel</th>
                <th class="col-name">Bezeichnung</th>
                <th class="col-lp" title="Leistungspunkte">LP</th>
                <th class="col-sem" title="Empfohlener Beginn">Empf. Beginn</th>
                <th class="col-binding" title="Bindung">Bindung</th>
                <th class="col-exam" title="Studienleistungen">SL</th>
                <th class="col-exam" title="Benotete Modulprüfungen">bPr</th>
                <th class="col-exam" title="Unbenotete Modulprüfungen">uPr</th>
                <th class="col-grade" title="Note für benotete Modulprüfung">Note</th>
              </tr>
            </thead>
            <tbody>
              <!-- Rows -->
            </tbody>
          </table>
        </div>
      `;

      const tbody = section.querySelector('tbody');

      sem.modules.forEach(mod => {
        const isDone = state.pflichtCompletedIds.has(mod.id);
        const isGraded = mod.bPr !== '-' && parseInt(mod.bPr, 10) > 0;
        const currentGrade = state.pflichtGrades[mod.id] !== undefined ? state.pflichtGrades[mod.id] : '';

        const tr = document.createElement('tr');
        if (isDone) tr.className = 'is-completed';

        let gradeCellHtml = `<span class="grade-na" title="Unbenotete Prüfung / Modul">-</span>`;
        if (isGraded) {
          gradeCellHtml = `
            <input type="number" 
                   step="0.1" 
                   min="1.0" 
                   max="5.0" 
                   class="grade-input" 
                   value="${currentGrade}" 
                   data-id="${escapeHtml(mod.id)}" 
                   title="Note für ${escapeHtml(mod.name)} eintragen">
          `;
        }

        tr.innerHTML = `
          <td class="col-check">
            <input type="checkbox" class="checkbox-input" data-id="${escapeHtml(mod.id)}" ${isDone ? 'checked' : ''} aria-label="Modul ${escapeHtml(mod.name)} als erledigt markieren">
          </td>
          <td class="col-code">${escapeHtml(mod.code)}</td>
          <td class="col-name">
            <div class="modul-name">
              <a href="${escapeHtml(mod.link)}" target="_blank" rel="noopener noreferrer">
                ${escapeHtml(mod.name)}
              </a>
            </div>
          </td>
          <td class="col-lp">${mod.lp}</td>
          <td class="col-sem">${escapeHtml(mod.semester)}</td>
          <td class="col-binding">${escapeHtml(mod.binding)}</td>
          <td class="col-exam">${escapeHtml(mod.sl)}</td>
          <td class="col-exam">${escapeHtml(mod.bPr)}</td>
          <td class="col-exam">${escapeHtml(mod.uPr)}</td>
          <td class="col-grade">${gradeCellHtml}</td>
        `;

        // Checkbox listener
        const checkbox = tr.querySelector('.checkbox-input');
        checkbox.addEventListener('change', () => {
          if (state.pflichtCompletedIds.has(mod.id)) {
            state.pflichtCompletedIds.delete(mod.id);
          } else {
            state.pflichtCompletedIds.add(mod.id);
          }
          render();
        });

        // Grade input listener
        const gradeInput = tr.querySelector('.grade-input');
        if (gradeInput) {
          gradeInput.addEventListener('change', (e) => {
            updatePflichtGrade(mod.id, e.target.value);
          });
          gradeInput.addEventListener('blur', (e) => {
            updatePflichtGrade(mod.id, e.target.value);
          });
          gradeInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') e.target.blur();
          });
        }

        tbody.appendChild(tr);
      });

      elements.semestersContainer.appendChild(section);
    });
  }

  function updatePflichtGrade(moduleId, rawValue) {
    const val = rawValue.trim().replace(',', '.');
    if (val === '') {
      delete state.pflichtGrades[moduleId];
    } else {
      const num = parseFloat(val);
      if (!isNaN(num) && num >= 1.0 && num <= 5.0) {
        state.pflichtGrades[moduleId] = num;
        if (num <= 4.0) {
          state.pflichtCompletedIds.add(moduleId);
        }
      }
    }
    render();
  }

  // ------------------------------------------
  // 2. RENDER ELECTIVE AREA TABLES (Wahlpflicht / MiKE / Strukturierte Ergänzung)
  // ------------------------------------------
  function renderElectiveAreaTable(areaName, moduleList, tbodyElement, allocations) {
    tbodyElement.innerHTML = '';

    moduleList.forEach(mod => {
      const alloc = allocations[mod.id] || { courses: [], filledLp: 0, weightedSum: 0, gradedLp: 0 };
      const isFull = alloc.filledLp >= mod.lp;
      const isPartial = alloc.filledLp > 0 && alloc.filledLp < mod.lp;

      const tr = document.createElement('tr');
      if (isFull) tr.className = 'is-completed';

      // Status pill
      let statusHtml = `<span class="badge-status-pill empty">Offen (0/${mod.lp} LP)</span>`;
      if (isFull) {
        statusHtml = `<span class="badge-status-pill full">Vollständig (${alloc.filledLp}/${mod.lp} LP)</span>`;
      } else if (isPartial) {
        statusHtml = `<span class="badge-status-pill partial">Teilweise (${alloc.filledLp}/${mod.lp} LP)</span>`;
      }

      // Average grade for module
      let modAvgGrade = '-';
      if (alloc.gradedLp > 0) {
        modAvgGrade = (alloc.weightedSum / alloc.gradedLp).toFixed(2).replace('.', ',');
      }

      // Assigned courses list html
      let assignedCoursesHtml = `<span style="color: var(--text-light); font-style: italic;">Keine Kurse zugeordnet</span>`;
      if (alloc.courses.length > 0) {
        assignedCoursesHtml = alloc.courses.map(c => `
          <div class="assigned-course-pill">
            <span><strong>${escapeHtml(c.name)}</strong> (${c.lp} LP${c.grade ? ', Note: ' + c.grade : ''})</span>
          </div>
        `).join('');
      }

      // Exam format
      let examText = '';
      if (mod.bPr !== '-') examText += `${mod.bPr} bPr `;
      if (mod.uPr !== '-') examText += `${mod.uPr} uPr`;
      if (!examText) examText = '-';

      tr.innerHTML = `
        <td class="col-code">${escapeHtml(mod.code)}</td>
        <td class="col-name">
          <div class="modul-name">
            <a href="${escapeHtml(mod.link)}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(mod.name)}
            </a>
          </div>
        </td>
        <td class="col-type">${escapeHtml(mod.type || '-')}</td>
        <td class="col-lp">${mod.lp}</td>
        <td class="col-lp" style="color: ${isFull ? 'var(--color-success)' : isPartial ? 'var(--color-warning)' : 'inherit'}; font-weight: 700;">
          ${alloc.filledLp}
        </td>
        <td>${assignedCoursesHtml}</td>
        <td class="col-exam">${escapeHtml(examText)}</td>
        <td class="col-grade" style="font-weight: 600;">${modAvgGrade}</td>
        <td class="col-type">${statusHtml}</td>
      `;

      tbodyElement.appendChild(tr);
    });
  }

  // ------------------------------------------
  // 3. RENDER LOGGED COURSES & ALLOCATION MANAGER
  // ------------------------------------------
  function renderLoggedCoursesTable() {
    elements.loggedCoursesTableBody.innerHTML = '';
    const allElectives = getAllElectiveModules();

    if (state.loggedCourses.length === 0) {
      elements.loggedCoursesTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">
            Noch keine Lehrveranstaltungen erfasst. Nutze das obige Formular, um einen Kurs (z.B. "392180 Machine Learning Methods and Applications") hinzuzufügen.
          </td>
        </tr>
      `;
      return;
    }

    state.loggedCourses.forEach(course => {
      const tr = document.createElement('tr');

      // Build Possible Modules pills
      let possiblePillsHtml = '';
      if (course.possibleModuleIds && course.possibleModuleIds.length > 0) {
        possiblePillsHtml = course.possibleModuleIds.map(modId => {
          const m = allElectives.find(x => x.id === modId);
          return m ? `<span class="assigned-course-pill" style="font-size: 0.725rem;">${escapeHtml(m.code)}</span>` : '';
        }).join(' ');
      } else {
        possiblePillsHtml = `<span style="color: var(--text-light); font-size: 0.75rem;">Alle Wahlmodule möglich</span>`;
      }

      // Build Allocation Dropdown
      // Option list: shows eligible modules first, then any other elective modules
      const optionsHtml = [];
      optionsHtml.push(`<option value="" ${!course.assignedModuleId ? 'selected' : ''}>-- Nicht zugeordnet (Kein Modul) --</option>`);

      // Eligible modules group
      if (course.possibleModuleIds && course.possibleModuleIds.length > 0) {
        optionsHtml.push(`<optgroup label="Als passend markierte Module:">`);
        course.possibleModuleIds.forEach(modId => {
          const m = allElectives.find(x => x.id === modId);
          if (m) {
            const isSelected = course.assignedModuleId === m.id ? 'selected' : '';
            optionsHtml.push(`<option value="${escapeHtml(m.id)}" ${isSelected}>${escapeHtml(m.code)} - ${escapeHtml(m.name)} (${m.lp} LP, ${escapeHtml(m.area)})</option>`);
          }
        });
        optionsHtml.push(`</optgroup>`);
      }

      // Other modules group
      optionsHtml.push(`<optgroup label="Andere Module:">`);
      allElectives.forEach(m => {
        if (!course.possibleModuleIds || !course.possibleModuleIds.includes(m.id)) {
          const isSelected = course.assignedModuleId === m.id ? 'selected' : '';
          optionsHtml.push(`<option value="${escapeHtml(m.id)}" ${isSelected}>${escapeHtml(m.code)} - ${escapeHtml(m.name)} (${m.lp} LP, ${escapeHtml(m.area)})</option>`);
        }
      });
      optionsHtml.push(`</optgroup>`);

      tr.innerHTML = `
        <td class="col-name" style="font-weight: 600;">${escapeHtml(course.name)}</td>
        <td class="col-lp">${course.lp}</td>
        <td class="col-grade">
          <input type="number" 
                 step="0.1" 
                 min="1.0" 
                 max="5.0" 
                 class="grade-input" 
                 value="${course.grade !== null && course.grade !== undefined ? course.grade : ''}" 
                 data-course-id="${escapeHtml(course.id)}" 
                 title="Note für diesen Kurs ändern">
        </td>
        <td>${possiblePillsHtml}</td>
        <td>
          <select class="module-select-dropdown" data-course-id="${escapeHtml(course.id)}">
            ${optionsHtml.join('')}
          </select>
        </td>
        <td style="text-align: center;">
          <button class="btn btn-danger btn-sm" data-action="delete-course" data-course-id="${escapeHtml(course.id)}" title="Veranstaltung entfernen">
            Löschen
          </button>
        </td>
      `;

      // Listener for changing module allocation
      const select = tr.querySelector('.module-select-dropdown');
      select.addEventListener('change', (e) => {
        course.assignedModuleId = e.target.value;
        render();
      });

      // Listener for updating course grade
      const gradeInput = tr.querySelector('.grade-input');
      gradeInput.addEventListener('change', (e) => {
        const val = e.target.value.trim().replace(',', '.');
        if (val === '') {
          course.grade = null;
        } else {
          const num = parseFloat(val);
          if (!isNaN(num) && num >= 1.0 && num <= 5.0) {
            course.grade = num;
          }
        }
        render();
      });

      // Listener for deleting course
      const deleteBtn = tr.querySelector('[data-action="delete-course"]');
      deleteBtn.addEventListener('click', () => {
        state.loggedCourses = state.loggedCourses.filter(c => c.id !== course.id);
        render();
      });

      elements.loggedCoursesTableBody.appendChild(tr);
    });
  }

  // Handle adding new course from form
  function handleAddCourse(e) {
    e.preventDefault();

    const name = elements.inputCourseName.value.trim();
    const lp = parseInt(elements.inputCourseLp.value, 10) || 5;
    const gradeVal = elements.inputCourseGrade.value.trim().replace(',', '.');
    const grade = gradeVal !== '' && !isNaN(parseFloat(gradeVal)) ? parseFloat(gradeVal) : null;

    if (!name) return;

    // Read checked possible modules
    const checkedCheckboxes = elements.possibleModulesCheckboxGrid.querySelectorAll('input[type="checkbox"]:checked');
    const possibleModuleIds = Array.from(checkedCheckboxes).map(cb => cb.value);

    // Default active assignment is the first possible module (or unassigned)
    const defaultAssignment = possibleModuleIds.length > 0 ? possibleModuleIds[0] : '';

    const newCourse = {
      id: `course-${Date.now()}`,
      name: name,
      lp: lp,
      grade: grade,
      possibleModuleIds: possibleModuleIds,
      assignedModuleId: defaultAssignment
    };

    state.loggedCourses.push(newCourse);

    // Reset form
    elements.inputCourseName.value = '';
    elements.inputCourseLp.value = '5';
    elements.inputCourseGrade.value = '';
    elements.possibleModulesCheckboxGrid.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });

    render();
  }

  // ==========================================
  // EXCEL (.CSV) EXPORT & IMPORT
  // ==========================================
  function exportToExcel() {
    const stats = calculateAllStats();
    const rows = [];

    // Header 1: Pflichtbereich
    rows.push(['Bereich', 'Fachsemester', 'Kuerzel', 'Bezeichnung', 'LP', 'Empf_Beginn', 'Bindung', 'SL', 'bPr', 'uPr', 'Status', 'Note'].join(';'));

    PFLICHT_SEMESTERS.forEach(sem => {
      sem.modules.forEach(mod => {
        const isDone = state.pflichtCompletedIds.has(mod.id);
        const statusText = isDone ? 'Abgeschlossen' : 'Offen';
        const gradeVal = state.pflichtGrades[mod.id] !== undefined ? String(state.pflichtGrades[mod.id]).replace('.', ',') : '';

        rows.push([
          '"Pflichtbereich"',
          `"${sem.title}"`,
          `"${mod.code}"`,
          `"${mod.name.replace(/"/g, '""')}"`,
          mod.lp,
          `"${mod.semester}"`,
          `"${mod.binding}"`,
          `"${mod.sl}"`,
          `"${mod.bPr}"`,
          `"${mod.uPr}"`,
          `"${statusText}"`,
          `"${gradeVal}"`
        ].join(';'));
      });
    });

    // Section 2: Logged Courses & Allocations
    rows.push('');
    rows.push(['# Erfasste Lehrveranstaltungen & Modul-Zuordnungen'].join(';'));
    rows.push(['Veranstaltungsname', 'LP', 'Note', 'Moegliche_Module_IDs', 'Zugeordnetes_Modul_ID'].join(';'));

    state.loggedCourses.forEach(c => {
      const gradeStr = c.grade !== null ? String(c.grade).replace('.', ',') : '';
      const possibleStr = (c.possibleModuleIds || []).join('|');
      rows.push([
        `"${c.name.replace(/"/g, '""')}"`,
        c.lp,
        `"${gradeStr}"`,
        `"${possibleStr}"`,
        `"${c.assignedModuleId || ''}"`
      ].join(';'));
    });

    // Summary metadata
    rows.push('');
    rows.push(`"Gesamtschnitt (gewichtet)";"${stats.overallGpa}"`);
    rows.push(`"Gesamtfortschritt";"${stats.totalDegreeLp} / 180 LP"`);
    rows.push(`"Pflichtbereich LP";"${stats.pflichtLp} / 120 LP"`);
    rows.push(`"Wahlpflicht LP";"${stats.wpLp} / 20 LP"`);
    rows.push(`"MiKE LP";"${stats.mikeLp} / 10 LP"`);
    rows.push(`"Strukturierte Ergaenzung LP";"${stats.seLp} / 30 LP"`);

    const csvContent = '\uFEFF' + rows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const fileName = `Studienplan_KI_Bielefeld_Komplett_${dateStr}.csv`;

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        let text = e.target.result;
        if (!text) return;

        if (text.charCodeAt(0) === 0xFEFF) {
          text = text.slice(1);
        }

        const lines = text.split(/\r\n|\n|\r/).filter(line => line.trim().length > 0);
        if (lines.length <= 1) {
          alert('Die ausgewählte Datei enthält keine Daten.');
          return;
        }

        let delimiter = ';';
        if (!lines[0].includes(';') && lines[0].includes(',')) delimiter = ',';
        else if (lines[0].includes('\t')) delimiter = '\t';

        // Clear existing in-memory state
        state.pflichtCompletedIds.clear();
        state.pflichtGrades = {};
        state.loggedCourses = [];

        const allPflicht = getAllPflichtModules();
        let inLoggedCoursesSection = false;
        let loggedCoursesHeaderRead = false;

        let codeIdx = -1;
        let statusIdx = -1;
        let gradeIdx = -1;
        let nameIdx = -1;

        let cNameIdx = 0;
        let cLpIdx = 1;
        let cGradeIdx = 2;
        let cPossibleIdx = 3;
        let cAssignedIdx = 4;

        for (let i = 0; i < lines.length; i++) {
          const rawLine = lines[i].trim();
          if (rawLine.startsWith('#') || rawLine.includes('Erfasste Lehrveranstaltungen')) {
            inLoggedCoursesSection = true;
            loggedCoursesHeaderRead = false;
            continue;
          }

          const cols = parseCsvLine(rawLine, delimiter);
          if (!cols || cols.length === 0) continue;

          if (!inLoggedCoursesSection) {
            // First section: Pflichtbereich
            if (codeIdx === -1) {
              const headerCols = cols.map(c => (c ? String(c).toLowerCase().trim() : ''));
              codeIdx = headerCols.findIndex(c => c.includes('kuerzel') || c.includes('kürzel') || c.includes('code'));
              statusIdx = headerCols.findIndex(c => c.includes('status'));
              gradeIdx = headerCols.findIndex(c => c.includes('note') || c.includes('grade'));
              nameIdx = headerCols.findIndex(c => c.includes('bezeichnung') || c.includes('name'));
              continue;
            }

            const rowCode = (codeIdx >= 0 && cols[codeIdx] !== undefined) ? String(cols[codeIdx]).trim() : '';
            const rowName = (nameIdx >= 0 && cols[nameIdx] !== undefined) ? String(cols[nameIdx]).trim() : '';
            const rowStatus = (statusIdx >= 0 && cols[statusIdx] !== undefined) ? String(cols[statusIdx]).trim().toLowerCase() : '';
            const rowGrade = (gradeIdx >= 0 && cols[gradeIdx] !== undefined) ? String(cols[gradeIdx]).trim().replace(',', '.') : '';

            if (!rowCode && !rowName) continue;

            const matchedMod = allPflicht.find(m => 
              (rowCode && m.code.toLowerCase() === rowCode.toLowerCase()) ||
              (rowCode && m.id.toLowerCase() === rowCode.toLowerCase()) ||
              (rowName && m.name.toLowerCase() === rowName.toLowerCase())
            );

            if (matchedMod) {
              if (rowStatus.includes('abgeschlossen') || rowStatus.includes('erledigt') || rowStatus === '1' || rowStatus === 'true' || rowStatus === 'ja' || rowStatus === 'x') {
                state.pflichtCompletedIds.add(matchedMod.id);
              }
              if (rowGrade !== '' && !isNaN(parseFloat(rowGrade))) {
                const numGrade = parseFloat(rowGrade);
                if (numGrade >= 1.0 && numGrade <= 5.0) {
                  state.pflichtGrades[matchedMod.id] = numGrade;
                  if (numGrade <= 4.0) state.pflichtCompletedIds.add(matchedMod.id);
                }
              }
            }
          } else {
            // Second section: Logged Courses
            if (!loggedCoursesHeaderRead) {
              loggedCoursesHeaderRead = true;
              continue;
            }

            if (cols.length >= 2) {
              const cName = cols[cNameIdx] ? String(cols[cNameIdx]).trim() : '';
              if (!cName || cName.includes('Gesamtschnitt') || cName.includes('Gesamtfortschritt')) continue;

              const cLp = cols[cLpIdx] ? parseInt(cols[cLpIdx], 10) || 5 : 5;
              const cGradeVal = cols[cGradeIdx] ? String(cols[cGradeIdx]).trim().replace(',', '.') : '';
              const cGrade = cGradeVal !== '' && !isNaN(parseFloat(cGradeVal)) ? parseFloat(cGradeVal) : null;
              const cPossible = cols[cPossibleIdx] ? String(cols[cPossibleIdx]).split('|').filter(x => x.trim()) : [];
              const cAssigned = cols[cAssignedIdx] ? String(cols[cAssignedIdx]).trim() : '';

              state.loggedCourses.push({
                id: `course-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                name: cName,
                lp: cLp,
                grade: cGrade,
                possibleModuleIds: cPossible,
                assignedModuleId: cAssigned
              });
            }
          }
        }

        render();
        alert(`Erfolg: Studienplan und ${state.loggedCourses.length} Veranstaltungen importiert.`);
      } catch (err) {
        console.error('Import error:', err);
        alert('Fehler beim Einlesen der Datei: ' + err.message);
      } finally {
        event.target.value = '';
      }
    };

    reader.readAsText(file, 'UTF-8');
  }

  function parseCsvLine(line, delimiter) {
    if (!line) return [];
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  }

  // ==========================================
  // EVENT LISTENERS & TAB SWITCHING
  // ==========================================
  function setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.dataset.tab;
        document.getElementById(targetId)?.classList.add('active');
        state.activeTab = targetId;
      });
    });

    // Add course form
    elements.addCourseForm.addEventListener('submit', handleAddCourse);

    // Reset button
    elements.resetBtn.addEventListener('click', () => {
      if (confirm('Möchtest du alle Eingaben im aktuellen Tab zurücksetzen?')) {
        state.pflichtCompletedIds.clear();
        state.pflichtGrades = {};
        state.loggedCourses = [];
        render();
      }
    });

    // Excel Export & Import
    elements.exportExcelBtn.addEventListener('click', exportToExcel);
    elements.importExcelBtn.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', handleFileImport);
  }

  // Utility to escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
