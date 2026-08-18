/**
 * Uni-Planung: KI & Kognitive Informatik (Uni Bielefeld)
 * Simplified In-Memory Pflichtbereich Planner with Weighted Grade Calculation
 * Note: Data is kept strictly in-memory during the active browser session and not persisted to disk.
 */

(function () {
  'use strict';

  // Clear any existing localStorage data for privacy
  try {
    localStorage.removeItem('bielefeld_ki_study_progress_v1');
    localStorage.removeItem('bielefeld_ki_custom_modules_v1');
    localStorage.removeItem('bielefeld_ki_pflicht_v1');
    localStorage.removeItem('bielefeld_ki_pflicht_completed_v2');
    localStorage.removeItem('bielefeld_ki_pflicht_grades_v2');
  } catch (e) {
    // Ignore if storage is inaccessible
  }

  // Application State (In-Memory Only)
  const state = {
    completedModuleIds: new Set(),
    grades: {} // { [moduleId]: 1.3 }
  };

  // DOM Elements
  const elements = {
    semestersContainer: document.getElementById('semestersContainer'),
    averageGradeDisplay: document.getElementById('averageGradeDisplay'),
    gradedLpSubtext: document.getElementById('gradedLpSubtext'),
    completedLpText: document.getElementById('completedLpText'),
    completedModulesSubtext: document.getElementById('completedModulesSubtext'),
    openLpText: document.getElementById('openLpText'),
    openModulesSubtext: document.getElementById('openModulesSubtext'),
    resetBtn: document.getElementById('resetBtn')
  };

  // Initialization
  function init() {
    setupEventListeners();
    render();
  }

  // Toggle Module Completed Status
  function toggleModule(moduleId) {
    if (state.completedModuleIds.has(moduleId)) {
      state.completedModuleIds.delete(moduleId);
    } else {
      state.completedModuleIds.add(moduleId);
    }
    render();
  }

  // Update Grade for a Module
  function updateGrade(moduleId, rawValue) {
    const val = rawValue.trim().replace(',', '.');
    if (val === '') {
      delete state.grades[moduleId];
    } else {
      const num = parseFloat(val);
      if (!isNaN(num) && num >= 1.0 && num <= 5.0) {
        state.grades[moduleId] = num;
        // Auto-check module if valid passing grade entered
        if (num <= 4.0) {
          state.completedModuleIds.add(moduleId);
        }
      }
    }
    render();
  }

  // Calculations: LP & Weighted Average Grade
  function calculateStats() {
    const allModules = getAllPflichtModules();
    let completedLp = 0;
    let completedCount = 0;

    let weightedGradeSum = 0;
    let totalGradedLp = 0;
    let gradedModulesCount = 0;

    allModules.forEach(mod => {
      const isDone = state.completedModuleIds.has(mod.id);
      const isGradedModule = mod.bPr !== '-' && parseInt(mod.bPr, 10) > 0;
      const grade = state.grades[mod.id];

      if (isDone) {
        completedLp += mod.lp;
        completedCount++;
      }

      // If a grade exists and module is completed or grade is present
      if (isGradedModule && grade !== undefined && grade !== null && !isNaN(grade)) {
        if (isDone || grade <= 4.0) {
          weightedGradeSum += grade * mod.lp;
          totalGradedLp += mod.lp;
          gradedModulesCount++;
        }
      }
    });

    const totalLp = 120;
    const totalCount = allModules.length;
    const openLp = Math.max(0, totalLp - completedLp);
    const openCount = Math.max(0, totalCount - completedCount);

    let averageGrade = '-';
    if (totalGradedLp > 0) {
      averageGrade = (weightedGradeSum / totalGradedLp).toFixed(2).replace('.', ',');
    }

    return {
      completedLp,
      completedCount,
      totalLp,
      totalCount,
      openLp,
      openCount,
      averageGrade,
      totalGradedLp,
      gradedModulesCount
    };
  }

  // Render everything
  function render() {
    renderSummary();
    renderSemesterTables();
  }

  // Render Summary Box
  function renderSummary() {
    const stats = calculateStats();

    elements.averageGradeDisplay.textContent = stats.averageGrade;
    elements.gradedLpSubtext.textContent = `${stats.totalGradedLp} LP (${stats.gradedModulesCount} Module) benotet eingebracht`;

    elements.completedLpText.textContent = stats.completedLp;
    elements.completedModulesSubtext.textContent = `${stats.completedCount} von ${stats.totalCount} Pflichtmodulen`;

    elements.openLpText.textContent = stats.openLp;
    elements.openModulesSubtext.textContent = `${stats.openCount} Pflichtmodule ausstehend`;
  }

  // Render Semester Tables
  function renderSemesterTables() {
    elements.semestersContainer.innerHTML = '';

    PFLICHT_SEMESTERS.forEach(sem => {
      // Calculate semester completed LP
      let semCompletedLp = 0;
      let semTotalLp = 0;
      sem.modules.forEach(m => {
        semTotalLp += m.lp;
        if (state.completedModuleIds.has(m.id)) {
          semCompletedLp += m.lp;
        }
      });

      const isSemFullyDone = semCompletedLp === semTotalLp && semTotalLp > 0;

      const section = document.createElement('section');
      section.className = 'semester-section';

      section.innerHTML = `
        <div class="semester-header">
          <h2 class="semester-title">${escapeHtml(sem.title)}</h2>
          <span class="semester-lp-badge ${isSemFullyDone ? 'done' : ''}">
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
        const isDone = state.completedModuleIds.has(mod.id);
        const isGraded = mod.bPr !== '-' && parseInt(mod.bPr, 10) > 0;
        const currentGrade = state.grades[mod.id] !== undefined ? state.grades[mod.id] : '';

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
          toggleModule(mod.id);
        });

        // Grade input listener
        const gradeInput = tr.querySelector('.grade-input');
        if (gradeInput) {
          gradeInput.addEventListener('change', (e) => {
            updateGrade(mod.id, e.target.value);
          });
          gradeInput.addEventListener('blur', (e) => {
            updateGrade(mod.id, e.target.value);
          });
          gradeInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              e.target.blur();
            }
          });
        }

        tbody.appendChild(tr);
      });

      elements.semestersContainer.appendChild(section);
    });
  }

  // Event Listeners
  function setupEventListeners() {
    // Reset inputs in current session
    elements.resetBtn.addEventListener('click', () => {
      state.completedModuleIds.clear();
      state.grades = {};
      render();
    });
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
