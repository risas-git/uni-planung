/**
 * Uni-Planung: KI & Kognitive Informatik (Uni Bielefeld)
 * Simplified Semester-Grouped Pflichtbereich Planner
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'bielefeld_ki_pflicht_v1';

  // Application State
  const state = {
    completedModuleIds: new Set(),
    filter: 'all', // 'all' | 'open' | 'completed'
    searchQuery: ''
  };

  // DOM Elements
  const elements = {
    semestersContainer: document.getElementById('semestersContainer'),
    progressPercentText: document.getElementById('progressPercentText'),
    completedLpText: document.getElementById('completedLpText'),
    totalLpText: document.getElementById('totalLpText'),
    progressFill: document.getElementById('progressFill'),
    statCompletedCount: document.getElementById('statCompletedCount'),
    statCompletedLp: document.getElementById('statCompletedLp'),
    statOpenCount: document.getElementById('statOpenCount'),
    statOpenLp: document.getElementById('statOpenLp'),
    searchInput: document.getElementById('searchInput'),
    filterButtons: document.querySelectorAll('.filter-buttons .btn'),
    resetBtn: document.getElementById('resetBtn')
  };

  // Initialization
  function init() {
    loadSavedProgress();
    setupEventListeners();
    render();
  }

  // Load from LocalStorage
  function loadSavedProgress() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          state.completedModuleIds = new Set(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading progress:', e);
      state.completedModuleIds = new Set();
    }
  }

  // Save to LocalStorage
  function saveProgress() {
    try {
      const arr = Array.from(state.completedModuleIds);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  }

  // Toggle Module Completed Status
  function toggleModule(moduleId) {
    if (state.completedModuleIds.has(moduleId)) {
      state.completedModuleIds.delete(moduleId);
    } else {
      state.completedModuleIds.add(moduleId);
    }
    saveProgress();
    render();
  }

  // Calculations
  function calculateStats() {
    const allModules = getAllPflichtModules();
    let completedLp = 0;
    let completedCount = 0;

    allModules.forEach(mod => {
      if (state.completedModuleIds.has(mod.id)) {
        completedLp += mod.lp;
        completedCount++;
      }
    });

    const totalLp = 120; // 120 LP Pflichtbereich
    const totalCount = allModules.length;
    const openLp = Math.max(0, totalLp - completedLp);
    const openCount = Math.max(0, totalCount - completedCount);
    const percentage = Math.min(100, Math.round((completedLp / totalLp) * 100));

    return {
      completedLp,
      completedCount,
      totalLp,
      totalCount,
      openLp,
      openCount,
      percentage
    };
  }

  // Render everything
  function render() {
    renderSummary();
    renderSemesterTables();
  }

  // Render Summary Progress Bar
  function renderSummary() {
    const stats = calculateStats();

    elements.progressPercentText.textContent = `${stats.percentage}%`;
    elements.completedLpText.textContent = stats.completedLp;
    elements.totalLpText.textContent = stats.totalLp;
    elements.progressFill.style.width = `${stats.percentage}%`;

    elements.statCompletedCount.textContent = stats.completedCount;
    elements.statCompletedLp.textContent = stats.completedLp;
    elements.statOpenCount.textContent = stats.openCount;
    elements.statOpenLp.textContent = stats.openLp;
  }

  // Render Semester Tables
  function renderSemesterTables() {
    elements.semestersContainer.innerHTML = '';
    const query = state.searchQuery.trim().toLowerCase();

    let totalVisibleModules = 0;

    PFLICHT_SEMESTERS.forEach(sem => {
      // Filter modules in this semester
      const visibleModules = sem.modules.filter(mod => {
        const isDone = state.completedModuleIds.has(mod.id);

        // Status Filter
        if (state.filter === 'completed' && !isDone) return false;
        if (state.filter === 'open' && isDone) return false;

        // Search Query
        if (query) {
          const matchName = (mod.name || '').toLowerCase().includes(query);
          const matchCode = (mod.code || '').toLowerCase().includes(query);
          const matchDesc = (mod.description || '').toLowerCase().includes(query);
          if (!matchName && !matchCode && !matchDesc) return false;
        }

        return true;
      });

      if (visibleModules.length === 0 && (query || state.filter !== 'all')) {
        return; // Skip empty semester sections when filtering
      }

      totalVisibleModules += visibleModules.length;

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
              </tr>
            </thead>
            <tbody>
              <!-- Rows -->
            </tbody>
          </table>
        </div>
      `;

      const tbody = section.querySelector('tbody');

      if (visibleModules.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="9" style="text-align: center; color: var(--text-muted); padding: 16px;">Keine Module in diesem Semester für die aktuellen Filterkriterien.</td>`;
        tbody.appendChild(emptyRow);
      } else {
        visibleModules.forEach(mod => {
          const isDone = state.completedModuleIds.has(mod.id);
          const tr = document.createElement('tr');
          if (isDone) tr.className = 'is-completed';

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
              <div class="modul-desc">${escapeHtml(mod.description)}</div>
            </td>
            <td class="col-lp">${mod.lp}</td>
            <td class="col-sem">${escapeHtml(mod.semester)}</td>
            <td class="col-binding">${escapeHtml(mod.binding)}</td>
            <td class="col-exam">${escapeHtml(mod.sl)}</td>
            <td class="col-exam">${escapeHtml(mod.bPr)}</td>
            <td class="col-exam">${escapeHtml(mod.uPr)}</td>
          `;

          // Checkbox click
          const checkbox = tr.querySelector('.checkbox-input');
          checkbox.addEventListener('change', () => {
            toggleModule(mod.id);
          });

          tbody.appendChild(tr);
        });
      }

      elements.semestersContainer.appendChild(section);
    });

    if (totalVisibleModules === 0) {
      elements.semestersContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); color: var(--text-muted);">
          <p>Keine passenden Module für die Such- oder Filterkriterien gefunden.</p>
          <button id="clearFiltersBtn" class="btn btn-sm" style="margin-top: 12px;">Filter zurücksetzen</button>
        </div>
      `;
      document.getElementById('clearFiltersBtn')?.addEventListener('click', resetFilters);
    }
  }

  // Reset Filters
  function resetFilters() {
    state.filter = 'all';
    state.searchQuery = '';
    elements.searchInput.value = '';
    elements.filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === 'all');
    });
    render();
  }

  // Event Listeners
  function setupEventListeners() {
    // Search
    elements.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderSemesterTables();
    });

    // Filter Buttons
    elements.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        elements.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.filter = btn.dataset.filter;
        renderSemesterTables();
      });
    });

    // Reset Progress
    elements.resetBtn.addEventListener('click', () => {
      if (confirm('Möchtest du alle gesetzten Haken wirklich zurücksetzen?')) {
        state.completedModuleIds.clear();
        saveProgress();
        render();
      }
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
