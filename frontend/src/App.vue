<template>
  <v-app class="bg-slate-50">
    <v-main>
      <v-container class="py-4 px-3 px-sm-4" style="max-width: 1360px;">
        
        <!-- Page Header Card -->
        <v-card variant="outlined" class="mb-5 rounded-lg elevation-1 bg-white" style="border-color: #cbd5e1;">
          <v-card-item class="pa-4 pa-sm-5">
            <!-- Header Top Bar -->
            <div class="d-flex justify-space-between align-start flex-wrap ga-3 pb-3 border-b">
              <div>
                <div class="text-caption font-weight-bold text-uppercase text-grey-darken-1 tracking-wide">
                  Universität Bielefeld &bull; Technische Fakultät
                </div>
                <h1 class="text-h5 font-weight-bold text-primary mb-1 mt-1">
                  Künstliche Intelligenz und Kognitive Informatik
                </h1>
                <div class="text-body-2 text-grey-darken-1">
                  Bachelor of Science: 1-Fach (fw) &bull;
                  <a
                    href="https://ekvv.uni-bielefeld.de/sinfo/publ/variante/405818172?m#405818181"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-secondary text-decoration-none font-weight-medium"
                  >
                    Offizielle Studieninformation (EkVV)
                    <v-icon size="x-small" icon="mdi-open-in-new" />
                  </a>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="d-flex align-center ga-2 flex-wrap">
                <v-btn
                  color="primary"
                  variant="outlined"
                  size="small"
                  prepend-icon="mdi-file-excel-outline"
                  class="font-weight-medium text-none"
                  @click="handleExport"
                >
                  Excel Export
                </v-btn>

                <v-btn
                  color="primary"
                  variant="outlined"
                  size="small"
                  prepend-icon="mdi-file-upload-outline"
                  class="font-weight-medium text-none"
                  @click="triggerFileInput"
                >
                  Excel Import
                </v-btn>

                <v-btn
                  color="grey-darken-2"
                  variant="text"
                  size="small"
                  prepend-icon="mdi-refresh"
                  class="font-weight-medium text-none"
                  @click="handleReset"
                >
                  Zurücksetzen
                </v-btn>

                <input
                  ref="fileInputRef"
                  type="file"
                  accept=".csv,.txt"
                  style="display: none;"
                  @change="handleFileChange"
                />
              </div>
            </div>

            <!-- Privacy Notice & Disclaimer Banner -->
            <v-alert
              type="info"
              variant="tonal"
              density="compact"
              class="my-3 text-caption rounded"
              icon="mdi-shield-check-outline"
            >
              <div class="mb-1">
                <strong>Datenschutzhinweis:</strong> Deine eingegebenen Daten werden aus Datenschutzgründen nicht auf Servern oder im Browser gespeichert. Du kannst deine Daten jederzeit über <strong>„Excel Export“</strong> als CSV-Datei sichern und bei deinem nächsten Besuch über <strong>„Excel Import“</strong> wieder einladen, um nahtlos weiterzuarbeiten.
              </div>
              <div class="border-t pt-1 mt-1 text-grey-darken-3">
                <strong>Haftungsausschluss / Wichtiger Hinweis:</strong> Bitte überprüfe alle Modulzuordnungen und LP-Berechnungen stets eigenständig anhand deiner offiziellen Prüfungsordnung und Studieninformation (Prüfungsamt / EkVV). Für die Richtigkeit und Vollständigkeit der Angaben und Berechnungen wird keine Gewähr übernommen.
              </div>
            </v-alert>

            <!-- Metrics Summary Cards -->
            <v-row dense class="mt-1">
              <!-- GPA -->
              <v-col cols="6" sm="4" md="2">
                <v-card variant="flat" class="bg-grey-lighten-4 pa-2 pa-sm-3 rounded text-center fill-height">
                  <div class="text-caption font-weight-bold text-grey-darken-1 text-uppercase">Gesamtschnitt</div>
                  <div class="text-h5 font-weight-bold text-info my-1">{{ stats.overallGpa || '-' }}</div>
                  <div class="text-caption text-grey-darken-1">{{ stats.totalGradedLp || 0 }} LP benotet</div>
                </v-card>
              </v-col>

              <!-- Total Progress -->
              <v-col cols="6" sm="4" md="2">
                <v-card variant="flat" class="bg-grey-lighten-4 pa-2 pa-sm-3 rounded text-center fill-height">
                  <div class="text-caption font-weight-bold text-grey-darken-1 text-uppercase">Gesamt</div>
                  <div class="text-h5 font-weight-bold text-primary my-1">
                    {{ stats.totalDegreeLp || 0 }} <span class="text-caption font-weight-normal text-grey">/ 180 LP</span>
                  </div>
                  <div class="text-caption text-grey-darken-1">{{ stats.remainingLp || 180 }} LP ausstehend</div>
                </v-card>
              </v-col>

              <!-- Pflichtbereich -->
              <v-col cols="6" sm="4" md="2">
                <v-card variant="flat" class="bg-grey-lighten-4 pa-2 pa-sm-3 rounded text-center fill-height">
                  <div class="text-caption font-weight-bold text-grey-darken-1 text-uppercase">Pflichtbereich</div>
                  <div class="text-h5 font-weight-bold text-primary my-1">
                    {{ stats.pflichtLp || 0 }} <span class="text-caption font-weight-normal text-grey">/ 120 LP</span>
                  </div>
                  <div class="text-caption text-grey-darken-1">{{ stats.pflichtCompletedCount || 0 }} / {{ stats.totalPflichtCount || 22 }} Module</div>
                </v-card>
              </v-col>

              <!-- Wahlpflicht -->
              <v-col cols="6" sm="4" md="2">
                <v-card variant="flat" class="bg-grey-lighten-4 pa-2 pa-sm-3 rounded text-center fill-height">
                  <div class="text-caption font-weight-bold text-grey-darken-1 text-uppercase">Wahlpflicht</div>
                  <div class="text-h5 font-weight-bold my-1" :class="stats.wpLp >= 20 ? 'text-success' : 'text-primary'">
                    {{ stats.wpLp || 0 }} <span class="text-caption font-weight-normal text-grey">/ 20 LP</span>
                  </div>
                  <div class="text-caption text-grey-darken-1">{{ stats.wpLp || 0 }} / 20 LP belegt</div>
                </v-card>
              </v-col>

              <!-- MiKE -->
              <v-col cols="6" sm="4" md="2">
                <v-card variant="flat" class="bg-grey-lighten-4 pa-2 pa-sm-3 rounded text-center fill-height">
                  <div class="text-caption font-weight-bold text-grey-darken-1 text-uppercase">MiKE / Indiv.</div>
                  <div class="text-h5 font-weight-bold my-1" :class="stats.mikeLp >= 10 ? 'text-success' : 'text-primary'">
                    {{ stats.mikeLp || 0 }} <span class="text-caption font-weight-normal text-grey">/ 10 LP</span>
                  </div>
                  <div class="text-caption text-grey-darken-1">{{ stats.mikeLp || 0 }} / 10 LP belegt</div>
                </v-card>
              </v-col>

              <!-- Strukturierte Ergänzung -->
              <v-col cols="6" sm="4" md="2">
                <v-card variant="flat" class="bg-grey-lighten-4 pa-2 pa-sm-3 rounded text-center fill-height">
                  <div class="text-caption font-weight-bold text-grey-darken-1 text-uppercase">Strukt. Erg.</div>
                  <div class="text-h5 font-weight-bold my-1" :class="stats.seLp >= 30 ? 'text-success' : 'text-primary'">
                    {{ stats.seLp || 0 }} <span class="text-caption font-weight-normal text-grey">/ 30 LP</span>
                  </div>
                  <div class="text-caption text-grey-darken-1">{{ stats.seLp || 0 }} / 30 LP belegt</div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>

        <!-- Navigation Tabs (Compact & Responsive with Grow) -->
        <v-tabs
          v-model="activeTab"
          color="primary"
          grow
          class="mb-5 bg-white rounded-t-lg border-b main-nav-tabs elevation-1"
          density="comfortable"
        >
          <v-tab value="pflicht" class="font-weight-bold text-none px-2 px-md-3">
            Pflichtbereich
            <v-chip size="x-small" class="ms-1 font-weight-bold" variant="tonal" color="primary">
              {{ stats.pflichtLp || 0 }}/120
            </v-chip>
          </v-tab>

          <v-tab value="wahlpflicht" class="font-weight-bold text-none px-2 px-md-3">
            Wahlpflicht
            <v-chip size="x-small" class="ms-1 font-weight-bold" variant="tonal" :color="stats.wpLp >= 20 ? 'success' : 'primary'">
              {{ stats.wpLp || 0 }}/20
            </v-chip>
          </v-tab>

          <v-tab value="mike" class="font-weight-bold text-none px-2 px-md-3">
            MiKE
            <v-chip size="x-small" class="ms-1 font-weight-bold" variant="tonal" :color="stats.mikeLp >= 10 ? 'success' : 'primary'">
              {{ stats.mikeLp || 0 }}/10
            </v-chip>
          </v-tab>

          <v-tab value="ergaenzung" class="font-weight-bold text-none px-2 px-md-3">
            Strukt. Ergänzung
            <v-chip size="x-small" class="ms-1 font-weight-bold" variant="tonal" :color="stats.seLp >= 30 ? 'success' : 'primary'">
              {{ stats.seLp || 0 }}/30
            </v-chip>
          </v-tab>

          <v-tab value="courses" class="font-weight-bold text-none px-2 px-md-3">
            Veranstaltungen
            <v-chip size="x-small" class="ms-1 font-weight-bold" variant="tonal" color="secondary">
              {{ state.loggedCourses.length }}
            </v-chip>
          </v-tab>
        </v-tabs>

        <!-- Tab Content Window -->
        <v-window v-model="activeTab">
          <!-- TAB 1: PFLICHTBEREICH -->
          <v-window-item value="pflicht">
            <PflichtTab
              :semesters="curriculum.pflichtSemesters"
              :completed-ids="state.pflichtCompletedIds"
              :grades="state.pflichtGrades"
              @toggle-module="handleTogglePflichtModule"
              @toggle-semester="handleTogglePflichtSemester"
              @update-grade="handleUpdatePflichtGrade"
            />
          </v-window-item>

          <!-- TAB 2: WAHLPFLICHT -->
          <v-window-item value="wahlpflicht">
            <ElectiveAreaTab
              title="Wahlpflichtbereich"
              :target-lp="20"
              description="Wähle Schwerpunkte (10 LP) und/oder Basismodule (5 LP). Kurse können im Reiter 'Veranstaltungen & Zuordnungen' eingetragen und zugeordnet werden."
              :modules="curriculum.electives.wahlpflicht"
              :allocations="stats.moduleAllocations"
              :filled-lp="stats.wpLp"
            />
          </v-window-item>

          <!-- TAB 3: MiKE -->
          <v-window-item value="mike">
            <ElectiveAreaTab
              title="Individuelle Ergänzung / MiKE"
              :target-lp="10"
              description="Ergänzungsmodul Informatik (39-Inf-EGMI) oder fachübergreifender Kompetenzerwerb (39-Inf-MIKE)."
              :modules="curriculum.electives.mike"
              :allocations="stats.moduleAllocations"
              :filled-lp="stats.mikeLp"
            />
          </v-window-item>

          <!-- TAB 4: STRUKTURIERTE ERGÄNZUNG -->
          <v-window-item value="ergaenzung">
            <ElectiveAreaTab
              title="Strukturierte Ergänzung des fw 1-Fach-Ba"
              :target-lp="30"
              description="Profilierungsangebote und Vertiefungstracks (Schwerpunkte 10 LP und Basismodule 5 LP)."
              :modules="curriculum.electives.strukturierteErgaenzung"
              :allocations="stats.moduleAllocations"
              :filled-lp="stats.seLp"
            />
          </v-window-item>

          <!-- TAB 5: LEHRVERANSTALTUNGEN & ZUORDNUNGEN -->
          <v-window-item value="courses">
            <CourseManagerTab
              :courses="state.loggedCourses"
              :all-elective-modules="allElectiveSearchItems"
              @add-course="handleAddCourse"
              @delete-course="handleDeleteCourse"
              @update-course="handleUpdateCourse"
            />
          </v-window-item>
        </v-window>

        <!-- Legend / Footer -->
        <v-card variant="outlined" class="mt-6 pa-4 bg-white rounded-lg" style="border-color: #cbd5e1;">
          <div class="text-subtitle-2 font-weight-bold text-primary mb-2">Legende & Berechnungshinweise</div>
          <v-row dense class="text-caption text-grey-darken-1">
            <v-col cols="12" sm="6" md="4"><strong>LP:</strong> Leistungspunkte (ECTS)</v-col>
            <v-col cols="12" sm="6" md="4"><strong>Soll LP:</strong> Benötigte LP für das Modul (5 oder 10 LP)</v-col>
            <v-col cols="12" sm="6" md="4"><strong>bPr / uPr:</strong> Benotete / Unbenotete Modulprüfungen</v-col>
            <v-col cols="12" sm="6" md="4"><strong>Gesamtfortschritt:</strong> 180 LP (120 Pflicht + 20 WP + 10 MiKE + 30 SE)</v-col>
            <v-col cols="12" sm="12" md="8"><strong>Notenschnitt:</strong> Gewichtet mit den LP aller benoteten Pflicht- und Wahlpflichtleistungen.</v-col>
          </v-row>
        </v-card>

        <!-- Snackbar notification -->
        <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
          {{ snackbar.text }}
        </v-snackbar>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { apiService } from './services/api.js';
import PflichtTab from './components/PflichtTab.vue';
import ElectiveAreaTab from './components/ElectiveAreaTab.vue';
import CourseManagerTab from './components/CourseManagerTab.vue';

const activeTab = ref('pflicht');
const fileInputRef = ref(null);

const snackbar = reactive({
  show: false,
  text: '',
  color: 'success'
});

const curriculum = reactive({
  pflichtSemesters: [],
  electives: {
    wahlpflicht: [],
    mike: [],
    strukturierteErgaenzung: [],
    allElectives: []
  }
});

const state = reactive({
  pflichtCompletedIds: new Set(),
  pflichtGrades: {},
  loggedCourses: []
});

const stats = ref({
  pflichtLp: 0,
  pflichtCompletedCount: 0,
  totalPflichtCount: 22,
  wpLp: 0,
  mikeLp: 0,
  seLp: 0,
  totalDegreeLp: 0,
  remainingLp: 180,
  totalGradedLp: 0,
  overallGpa: '-',
  moduleAllocations: {}
});

const allElectiveSearchItems = computed(() => {
  return (curriculum.electives.allElectives || []).map(m => ({
    ...m,
    searchTitle: `${m.code} - ${m.name} (${m.lp} LP, ${m.area})`
  }));
});

async function loadCurriculum() {
  const [pflichtData, electivesData] = await Promise.all([
    apiService.getPflichtSemesters(),
    apiService.getElectiveCatalogs()
  ]);

  curriculum.pflichtSemesters = pflichtData;
  curriculum.electives = electivesData;
  recalculateStats();
}

async function recalculateStats() {
  stats.value = await apiService.calculatePlan(state);
}

// -------------------------------------------------------------
// EVENT HANDLERS
// -------------------------------------------------------------
function handleTogglePflichtModule(moduleId) {
  if (state.pflichtCompletedIds.has(moduleId)) {
    state.pflichtCompletedIds.delete(moduleId);
  } else {
    state.pflichtCompletedIds.add(moduleId);
  }
  recalculateStats();
}

function handleTogglePflichtSemester({ semester, check }) {
  semester.modules.forEach(m => {
    if (check) {
      state.pflichtCompletedIds.add(m.id);
    } else {
      state.pflichtCompletedIds.delete(m.id);
    }
  });
  recalculateStats();
}

function handleUpdatePflichtGrade({ moduleId, value }) {
  const val = String(value).trim().replace(',', '.');
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
  recalculateStats();
}

function handleAddCourse(course) {
  state.loggedCourses.push(course);
  recalculateStats();
  showNotification('Veranstaltung erfolgreich hinzugefügt.', 'success');
}

function handleDeleteCourse(courseId) {
  state.loggedCourses = state.loggedCourses.filter(c => c.id !== courseId);
  recalculateStats();
  showNotification('Veranstaltung entfernt.', 'info');
}

function handleUpdateCourse(updatedCourse) {
  const index = state.loggedCourses.findIndex(c => c.id === updatedCourse.id);
  if (index !== -1) {
    state.loggedCourses[index] = updatedCourse;
  }
  recalculateStats();
}

function handleReset() {
  if (confirm('Möchtest du alle Eingaben im aktuellen Tab zurücksetzen?')) {
    state.pflichtCompletedIds.clear();
    state.pflichtGrades = {};
    state.loggedCourses = [];
    recalculateStats();
    showNotification('Alle Eingaben wurden zurückgesetzt.', 'info');
  }
}

async function handleExport() {
  await apiService.exportCsv(state);
  showNotification('Excel-CSV Export gestartet.', 'success');
}

function triggerFileInput() {
  fileInputRef.value.click();
}

async function handleFileChange(event) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const imported = await apiService.importCsv(file);
    state.pflichtCompletedIds = new Set(imported.pflichtCompletedIds);
    state.pflichtGrades = imported.pflichtGrades || {};
    state.loggedCourses = imported.loggedCourses || [];
    recalculateStats();
    showNotification(`Erfolg: ${state.loggedCourses.length} Veranstaltungen importiert.`, 'success');
  } catch (err) {
    showNotification('Fehler beim Einlesen der Datei: ' + err.message, 'error');
  } finally {
    event.target.value = '';
  }
}

function showNotification(text, color = 'success') {
  snackbar.text = text;
  snackbar.color = color;
  snackbar.show = true;
}

onMounted(() => {
  loadCurriculum();
});
</script>

<style>
body {
  font-family: 'Inter', Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  background-color: #f8fafc;
}
.tracking-wide {
  letter-spacing: 0.05em;
}
</style>
