import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Fallback embedded data in case backend server is starting up or offline
import { PFLICHT_SEMESTERS_DATA, ELECTIVES_DATA } from './fallback-data.js';

export const apiService = {
  // Fetch Pflicht semesters
  async getPflichtSemesters() {
    try {
      const response = await apiClient.get('/curriculum/pflicht');
      return response.data;
    } catch (err) {
      console.warn('Backend offline, using fallback curriculum data:', err.message);
      return PFLICHT_SEMESTERS_DATA;
    }
  },

  // Fetch Elective catalogs (WP, MiKE, Strukturierte Ergänzung)
  async getElectiveCatalogs() {
    try {
      const response = await apiClient.get('/curriculum/electives');
      return response.data;
    } catch (err) {
      console.warn('Backend offline, using fallback electives catalog:', err.message);
      return ELECTIVES_DATA;
    }
  },

  // Calculate study plan stats (GPA, filled LP, progress)
  async calculatePlan(state) {
    try {
      const response = await apiClient.post('/plan/calculate', {
        pflichtCompletedIds: Array.from(state.pflichtCompletedIds),
        pflichtGrades: state.pflichtGrades,
        loggedCourses: state.loggedCourses
      });
      return response.data;
    } catch (err) {
      // Local calculation fallback
      return this.calculatePlanLocally(state);
    }
  },

  // Export to Excel CSV
  async exportCsv(state) {
    try {
      const response = await apiClient.post('/plan/export-csv', {
        pflichtCompletedIds: Array.from(state.pflichtCompletedIds),
        pflichtGrades: state.pflichtGrades,
        loggedCourses: state.loggedCourses
      }, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv;charset=utf-8;' }));
      const link = document.createElement('a');
      link.href = url;
      const dateStr = new Date().toISOString().slice(0, 10);
      link.setAttribute('download', `Studienplan_KI_Bielefeld_${dateStr}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.warn('Backend export failed, exporting locally:', err);
      this.exportCsvLocally(state);
    }
  },

  // Import from Excel CSV file
  async importCsv(file) {
    const text = await file.text();
    return this.parseCsvLocally(text);
  },

  // Local fallback calculation
  calculatePlanLocally(state) {
    const allPflicht = [];
    PFLICHT_SEMESTERS_DATA.forEach(s => s.modules.forEach(m => allPflicht.push(m)));

    let pflichtLp = 0;
    let pflichtCompletedCount = 0;
    let totalWeightedSum = 0;
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
          totalWeightedSum += grade * mod.lp;
          totalGradedLp += mod.lp;
        }
      }
    });

    // Map module allocations
    const allocations = {};
    ELECTIVES_DATA.allElectives.forEach(mod => {
      allocations[mod.id] = {
        module: mod,
        courses: [],
        filledLp: 0,
        weightedSum: 0,
        gradedLp: 0,
        averageGrade: '-'
      };
    });

    state.loggedCourses.forEach(course => {
      const assignedId = course.assignedModuleId;
      if (assignedId && allocations[assignedId]) {
        const bucket = allocations[assignedId];
        bucket.courses.push(course);
        bucket.filledLp += course.lp;

        if (course.grade !== null && course.grade !== undefined && !isNaN(course.grade)) {
          bucket.weightedSum += course.grade * course.lp;
          bucket.gradedLp += course.lp;

          totalWeightedSum += course.grade * course.lp;
          totalGradedLp += course.lp;
        }
      }
    });

    // Calculate module average grades
    Object.values(allocations).forEach(bucket => {
      if (bucket.gradedLp > 0) {
        bucket.averageGrade = (bucket.weightedSum / bucket.gradedLp).toFixed(2).replace('.', ',');
      }
    });

    let wpLp = 0;
    ELECTIVES_DATA.wahlpflicht.forEach(m => { wpLp += allocations[m.id].filledLp; });

    let mikeLp = 0;
    ELECTIVES_DATA.mike.forEach(m => { mikeLp += allocations[m.id].filledLp; });

    let seLp = 0;
    ELECTIVES_DATA.strukturierteErgaenzung.forEach(m => { seLp += allocations[m.id].filledLp; });

    const totalDegreeLp = pflichtLp + wpLp + mikeLp + seLp;
    const remainingLp = Math.max(0, 180 - totalDegreeLp);

    let overallGpa = '-';
    if (totalGradedLp > 0) {
      overallGpa = (totalWeightedSum / totalGradedLp).toFixed(2).replace('.', ',');
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
      moduleAllocations: allocations
    };
  },

  exportCsvLocally(state) {
    const stats = this.calculatePlanLocally(state);
    const rows = [];
    rows.push(['Bereich', 'Fachsemester', 'Kuerzel', 'Bezeichnung', 'LP', 'Empf_Beginn', 'Bindung', 'SL', 'bPr', 'uPr', 'Status', 'Note'].join(';'));

    PFLICHT_SEMESTERS_DATA.forEach(sem => {
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

    rows.push('');
    rows.push(['# Erfasste Lehrveranstaltungen & Modul-Zuordnungen'].join(';'));
    rows.push(['Veranstaltungsname', 'Fachsemester', 'LP', 'Note', 'Moegliche_Module_IDs', 'Zugeordnetes_Modul_ID'].join(';'));

    state.loggedCourses.forEach(c => {
      const gradeStr = c.grade !== null ? String(c.grade).replace('.', ',') : '';
      const possibleStr = (c.possibleModuleIds || []).join('|');
      rows.push([
        `"${c.name.replace(/"/g, '""')}"`,
        `"${c.semester || '4. Sem.'}"`,
        c.lp,
        `"${gradeStr}"`,
        `"${possibleStr}"`,
        `"${c.assignedModuleId || ''}"`
      ].join(';'));
    });

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
    const dateStr = new Date().toISOString().slice(0, 10);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Studienplan_KI_Bielefeld_${dateStr}.csv`;
    link.click();
  },

  parseCsvLocally(text) {
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
    const lines = text.split(/\r\n|\n|\r/).filter(l => l.trim().length > 0);

    const newState = {
      pflichtCompletedIds: new Set(),
      pflichtGrades: {},
      loggedCourses: []
    };

    if (lines.length <= 1) return newState;

    let delimiter = ';';
    if (!lines[0].includes(';') && lines[0].includes(',')) delimiter = ',';

    const allPflicht = [];
    PFLICHT_SEMESTERS_DATA.forEach(s => s.modules.forEach(m => allPflicht.push(m)));

    let inLogged = false;
    let headerRead = false;
    let codeIdx = -1, statusIdx = -1, gradeIdx = -1, nameIdx = -1;

    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i].trim();
      if (raw.startsWith('#') || raw.includes('Erfasste Lehrveranstaltungen')) {
        inLogged = true;
        headerRead = false;
        continue;
      }

      const cols = this.parseCsvLine(raw, delimiter);
      if (cols.length === 0) continue;

      if (!inLogged) {
        if (codeIdx === -1) {
          const h = cols.map(c => c.toLowerCase().trim());
          codeIdx = h.findIndex(c => c.includes('kuerzel') || c.includes('kürzel') || c.includes('code'));
          statusIdx = h.findIndex(c => c.includes('status'));
          gradeIdx = h.findIndex(c => c.includes('note') || c.includes('grade'));
          nameIdx = h.findIndex(c => c.includes('bezeichnung') || c.includes('name'));
          continue;
        }

        const code = codeIdx >= 0 && cols[codeIdx] ? cols[codeIdx].trim() : '';
        const name = nameIdx >= 0 && cols[nameIdx] ? cols[nameIdx].trim() : '';
        const status = statusIdx >= 0 && cols[statusIdx] ? cols[statusIdx].trim().toLowerCase() : '';
        const grade = gradeIdx >= 0 && cols[gradeIdx] ? cols[gradeIdx].trim().replace(',', '.') : '';

        if (!code && !name) continue;

        const matched = allPflicht.find(m => 
          (code && m.code.toLowerCase() === code.toLowerCase()) ||
          (code && m.id.toLowerCase() === code.toLowerCase()) ||
          (name && m.name.toLowerCase() === name.toLowerCase())
        );

        if (matched) {
          if (status.includes('abgeschlossen') || status.includes('erledigt') || status === '1' || status === 'true' || status === 'ja' || status === 'x') {
            newState.pflichtCompletedIds.add(matched.id);
          }
          if (grade && !isNaN(parseFloat(grade))) {
            const num = parseFloat(grade);
            if (num >= 1.0 && num <= 5.0) {
              newState.pflichtGrades[matched.id] = num;
              if (num <= 4.0) newState.pflichtCompletedIds.add(matched.id);
            }
          }
        }
      } else {
        if (!headerRead) {
          headerRead = true;
          continue;
        }

        if (cols.length >= 2) {
          const cName = cols[0] ? cols[0].trim() : '';
          if (!cName || cName.includes('Gesamtschnitt') || cName.includes('Gesamtfortschritt')) continue;

          const cSem = cols[1] ? cols[1].trim() : '4. Sem.';
          const cLp = cols[2] ? parseInt(cols[2], 10) || 5 : 5;
          const cGradeVal = cols[3] ? cols[3].trim().replace(',', '.') : '';
          const cGrade = cGradeVal && !isNaN(parseFloat(cGradeVal)) ? parseFloat(cGradeVal) : null;
          const cPossible = cols[4] ? cols[4].split('|').filter(x => x.trim()) : [];
          const cAssigned = cols[5] ? cols[5].trim() : '';

          newState.loggedCourses.push({
            id: `course-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            name: cName,
            semester: cSem,
            lp: cLp,
            grade: cGrade,
            possibleModuleIds: cPossible,
            assignedModuleId: cAssigned
          });
        }
      }
    }

    return newState;
  },

  parseCsvLine(line, delimiter) {
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
};
