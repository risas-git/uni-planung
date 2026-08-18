/**
 * Uni-Planung: KI & Kognitive Informatik (Uni Bielefeld)
 * Simplified In-Memory Pflichtbereich Planner with Weighted Grade Calculation
 * Includes Excel (.csv) Export and Import capabilities.
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
    resetBtn: document.getElementById('resetBtn'),
    exportExcelBtn: document.getElementById('exportExcelBtn'),
    importExcelBtn: document.getElementById('importExcelBtn'),
    fileInput: document.getElementById('fileInput')
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

  // ==========================================
  // EXCEL (.CSV) EXPORT & IMPORT
  // ==========================================

  // Export current table as Excel-compatible CSV file
  function exportToExcel() {
    const allModules = getAllPflichtModules();
    const stats = calculateStats();

    // Excel CSV format header (using semicolon for German Excel compatibility)
    const header = [
      'Fachsemester',
      'Kuerzel',
      'Bezeichnung',
      'LP',
      'Empf_Beginn',
      'Bindung',
      'SL',
      'bPr',
      'uPr',
      'Status',
      'Note'
    ];

    const rows = [header.join(';')];

    PFLICHT_SEMESTERS.forEach(sem => {
      sem.modules.forEach(mod => {
        const isDone = state.completedModuleIds.has(mod.id);
        const statusText = isDone ? 'Abgeschlossen' : 'Offen';
        const gradeVal = state.grades[mod.id] !== undefined ? String(state.grades[mod.id]).replace('.', ',') : '';

        const rowData = [
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
        ];

        rows.push(rowData.join(';'));
      });
    });

    // Add empty row and summary metadata
    rows.push('');
    rows.push(`"Notendurchschnitt (gewichtet)";"${stats.averageGrade}"`);
    rows.push(`"Abgeschlossene LP";"${stats.completedLp} / ${stats.totalLp} LP"`);

    // UTF-8 BOM (\uFEFF) ensures Excel automatically recognizes UTF-8 (Umlauts like ä, ö, ü)
    const csvContent = '\uFEFF' + rows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const fileName = `Studienplan_KI_Bielefeld_${dateStr}.csv`;

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Import Excel (.csv / .json / .txt) file
  function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const text = e.target.result;

        // Check if JSON format
        if (text.trim().startsWith('{')) {
          const json = JSON.parse(text);
          if (json.completedModuleIds) {
            state.completedModuleIds = new Set(json.completedModuleIds);
          }
          if (json.grades) {
            state.grades = json.grades;
          }
          render();
          alert('Daten erfolgreich importiert.');
          return;
        }

        // CSV parsing
        const lines = text.split(/\r\n|\n|\r/).filter(line => line.trim().length > 0);
        if (lines.length <= 1) {
          alert('Die ausgewählte Datei enthält keine Daten.');
          return;
        }

        // Detect delimiter (semicolon or comma or tab)
        const firstLine = lines[0];
        let delimiter = ';';
        if (firstLine.includes(';') === false && firstLine.includes(',')) {
          delimiter = ',';
        } else if (firstLine.includes('\t')) {
          delimiter = '\t';
        }

        // Determine column indexes from header
        const headerCols = parseCsvLine(firstLine, delimiter).map(c => c.toLowerCase().trim());
        const codeIdx = headerCols.findIndex(c => c.includes('kuerzel') || c.includes('kürzel') || c.includes('code'));
        const statusIdx = headerCols.findIndex(c => c.includes('status'));
        const gradeIdx = headerCols.findIndex(c => c.includes('note') || c.includes('grade'));
        const nameIdx = headerCols.findIndex(c => c.includes('bezeichnung') || c.includes('name'));

        const allModules = getAllPflichtModules();
        let importedCount = 0;

        for (let i = 1; i < lines.length; i++) {
          const cols = parseCsvLine(lines[i], delimiter);
          if (cols.length === 0) continue;

          const rowCode = codeIdx >= 0 ? cols[codeIdx].trim() : '';
          const rowName = nameIdx >= 0 ? cols[nameIdx].trim() : '';
          const rowStatus = statusIdx >= 0 ? cols[statusIdx].trim().toLowerCase() : '';
          const rowGrade = gradeIdx >= 0 ? cols[gradeIdx].trim().replace(',', '.') : '';

          // Find matching module by code or name
          const matchedMod = allModules.find(m => 
            (rowCode && m.code.toLowerCase() === rowCode.toLowerCase()) ||
            (rowCode && m.id.toLowerCase() === rowCode.toLowerCase()) ||
            (rowName && m.name.toLowerCase() === rowName.toLowerCase())
          );

          if (matchedMod) {
            // Check status
            const isCompleted = rowStatus.includes('abgeschlossen') || 
                                rowStatus.includes('erledigt') || 
                                rowStatus.includes('bestanden') || 
                                rowStatus === '1' || 
                                rowStatus === 'true' || 
                                rowStatus === 'ja' || 
                                rowStatus === 'x';

            if (isCompleted) {
              state.completedModuleIds.add(matchedMod.id);
            }

            // Check grade
            if (rowGrade !== '' && !isNaN(parseFloat(rowGrade))) {
              const numGrade = parseFloat(rowGrade);
              if (numGrade >= 1.0 && numGrade <= 5.0) {
                state.grades[matchedMod.id] = numGrade;
                if (numGrade <= 4.0) {
                  state.completedModuleIds.add(matchedMod.id);
                }
              }
            }

            importedCount++;
          }
        }

        render();
        alert(`Erfolg: ${importedCount} Module aus der Datei importiert.`);
      } catch (err) {
        console.error('Import error:', err);
        alert('Fehler beim Einlesen der Datei: ' + err.message);
      } finally {
        event.target.value = '';
      }
    };

    reader.readAsText(file, 'UTF-8');
  }

  // Parse a single CSV line respecting quotes
  function parseCsvLine(line, delimiter) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
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

  // Event Listeners
  function setupEventListeners() {
    // Reset inputs in current session
    elements.resetBtn.addEventListener('click', () => {
      if (confirm('Möchtest du alle Eingaben im aktuellen Tab zurücksetzen?')) {
        state.completedModuleIds.clear();
        state.grades = {};
        render();
      }
    });

    // Excel Export
    elements.exportExcelBtn.addEventListener('click', exportToExcel);

    // Excel Import
    elements.importExcelBtn.addEventListener('click', () => {
      elements.fileInput.click();
    });

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
