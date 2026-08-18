<template>
  <div class="course-manager-tab">
    <!-- Course Logger Card -->
    <v-card variant="outlined" class="mb-6 rounded-lg elevation-1 pa-4 bg-white" style="border-color: #cbd5e1;">
      <h3 class="text-h6 font-weight-bold text-primary mb-1">
        Neue Lehrveranstaltung erfassen
      </h3>
      <p class="text-caption text-grey-darken-1 mb-4">
        Erfasse besuchte Kurse/Vorlesungen, wähle über die Suche alle Module aus, für die dieser Kurs angerechnet werden kann, und lege ihn an.
      </p>

      <v-form @submit.prevent="handleAddCourse">
        <v-row dense>
          <!-- Course Name -->
          <v-col cols="12" md="5">
            <v-text-field
              v-model="form.name"
              label="Veranstaltungsname / EkVV-Nummer *"
              placeholder="z.B. 392180 Machine Learning Methods and Applications (V)"
              variant="outlined"
              density="comfortable"
              required
              hide-details="auto"
            />
          </v-col>

          <!-- Semester (1 to 10) -->
          <v-col cols="12" sm="4" md="3">
            <v-select
              v-model="form.semester"
              :items="semesterOptions"
              label="Fachsemester"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
            />
          </v-col>

          <!-- LP -->
          <v-col cols="6" sm="4" md="2">
            <v-text-field
              v-model.number="form.lp"
              type="number"
              min="1"
              max="30"
              label="LP *"
              variant="outlined"
              density="comfortable"
              required
              hide-details="auto"
            />
          </v-col>

          <!-- Grade -->
          <v-col cols="6" sm="4" md="2">
            <v-text-field
              v-model="form.grade"
              type="number"
              step="0.1"
              min="1.0"
              max="5.0"
              label="Note (optional)"
              placeholder="z.B. 1.3"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
            />
          </v-col>
        </v-row>

        <!-- Searchable Module Multi-Picker -->
        <v-row dense class="mt-2">
          <v-col cols="12">
            <v-autocomplete
              v-model="form.possibleModuleIds"
              :items="allElectiveModules"
              item-title="searchTitle"
              item-value="id"
              label="Mögliche Module für diesen Kurs (Tippen zum Suchen, Mehrfachauswahl möglich)"
              placeholder="z.B. KI, 39-Inf-WP-DS, Robotik, MiKE, MTI, Systems..."
              variant="outlined"
              density="comfortable"
              chips
              closable-chips
              multiple
              hide-details="auto"
            >
              <template #chip="{ props, item }">
                <v-chip
                  v-bind="props"
                  color="primary"
                  variant="tonal"
                  size="small"
                  class="font-weight-medium"
                >
                  <strong>{{ item.raw.code }}</strong> - {{ item.raw.name }} ({{ item.raw.lp }} LP)
                </v-chip>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>

        <div class="d-flex justify-end mt-4">
          <v-btn
            type="submit"
            color="primary"
            variant="flat"
            class="px-6 font-weight-bold"
            :disabled="!form.name.trim()"
          >
            <v-icon icon="mdi-plus" class="me-1" />
            Veranstaltung anlegen
          </v-btn>
        </div>
      </v-form>
    </v-card>

    <!-- Logged Courses List & 1-Click Allocation Table -->
    <v-card variant="outlined" class="rounded-lg elevation-1 area-card">
      <v-card-item class="bg-grey-lighten-4 border-b py-3 px-4">
        <div class="d-flex justify-space-between align-center flex-wrap ga-2">
          <div>
            <h3 class="text-h6 font-weight-bold text-primary mb-1">
              Erfasste Veranstaltungen & Modul-Zuordnungen
            </h3>
            <div class="text-caption text-grey-darken-1">
              Klicke direkt auf ein Modul-Badge, um die aktive Zuordnung sofort zu wechseln und LP-Verteilungen live zu testen.
            </div>
          </div>

          <v-chip color="primary" variant="flat" size="small" class="font-weight-bold">
            {{ courses.length }} Veranstaltungen
          </v-chip>
        </div>
      </v-card-item>

      <v-table density="compact" hover class="course-table">
        <thead>
          <tr class="bg-grey-lighten-5 text-uppercase text-caption font-weight-bold text-grey-darken-2">
            <th class="px-2" style="min-width: 160px;">Veranstaltung</th>
            <th class="text-center px-1" style="width: 95px;">Semester</th>
            <th class="text-center px-1" style="width: 45px;">LP</th>
            <th class="text-center px-1" style="width: 75px;">Note</th>
            <th class="px-2" style="min-width: 160px;">Mögliche Module (Klick zum Aktivieren)</th>
            <th class="px-2" style="width: 200px;">Aktive Zuordnung</th>
            <th class="text-center px-1" style="width: 48px;">Aktion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="courses.length === 0">
            <td colspan="7" class="text-center text-grey py-8">
              Noch keine Lehrveranstaltungen erfasst. Nutze das obige Formular, um einen Kurs (z.B. "392180 Machine Learning Methods and Applications") hinzuzufügen.
            </td>
          </tr>
          <tr v-for="c in courses" :key="c.id">
            <!-- Name -->
            <td class="font-weight-bold text-body-2">
              {{ c.name }}
            </td>

            <!-- Semester Dropdown (1 to 10) -->
            <td class="text-center">
              <v-select
                :model-value="c.semester || '4. Sem.'"
                :items="semesterOptions"
                density="compact"
                variant="plain"
                hide-details
                class="text-caption"
                style="width: 100px; margin: 0 auto;"
                @update:model-value="updateCourseSemester(c, $event)"
              />
            </td>

            <!-- LP -->
            <td class="text-center font-weight-bold">
              {{ c.lp }}
            </td>

            <!-- Note Input -->
            <td class="text-center">
              <v-text-field
                :model-value="c.grade !== null && c.grade !== undefined ? c.grade : ''"
                type="number"
                step="0.1"
                min="1.0"
                max="5.0"
                density="compact"
                variant="outlined"
                hide-details
                class="grade-input mx-auto"
                style="max-width: 76px;"
                @update:model-value="updateCourseGrade(c, $event)"
              />
            </td>

            <!-- 1-Click Possible Module Pills -->
            <td>
              <div v-if="c.possibleModuleIds && c.possibleModuleIds.length > 0" class="d-flex flex-wrap ga-1 py-1">
                <v-chip
                  v-for="modId in c.possibleModuleIds"
                  :key="modId"
                  :color="c.assignedModuleId === modId ? 'success' : 'grey-lighten-2'"
                  :variant="c.assignedModuleId === modId ? 'flat' : 'outlined'"
                  size="small"
                  class="font-weight-medium cursor-pointer module-pill"
                  @click="setActiveModule(c, modId)"
                >
                  <v-icon
                    v-if="c.assignedModuleId === modId"
                    icon="mdi-check-bold"
                    size="x-small"
                    class="me-1"
                  />
                  {{ getModuleCode(modId) }} ({{ getModuleLp(modId) }} LP)
                </v-chip>
              </div>
              <span v-else class="text-grey text-caption font-italic">Keine spezifischen Module markiert</span>
            </td>

            <!-- Active Allocation Dropdown -->
            <td>
              <v-select
                :model-value="c.assignedModuleId || ''"
                :items="getAllocationOptions(c)"
                item-title="title"
                item-value="value"
                density="compact"
                variant="outlined"
                hide-details
                class="text-caption"
                style="max-width: 250px;"
                @update:model-value="setActiveModule(c, $event)"
              />
            </td>

            <!-- Delete Button -->
            <td class="text-center">
              <v-btn
                icon="mdi-delete-outline"
                size="small"
                variant="text"
                color="error"
                title="Veranstaltung entfernen"
                @click="deleteCourse(c.id)"
              />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';

const props = defineProps({
  courses: {
    type: Array,
    required: true
  },
  allElectiveModules: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['add-course', 'delete-course', 'update-course']);

const semesterOptions = [
  '1. Sem.',
  '2. Sem.',
  '3. Sem.',
  '4. Sem.',
  '5. Sem.',
  '6. Sem.',
  '7. Sem.',
  '8. Sem.',
  '9. Sem.',
  '10. Sem.'
];

const form = reactive({
  name: '',
  semester: '4. Sem.',
  lp: 5,
  grade: '',
  possibleModuleIds: []
});

function handleAddCourse() {
  if (!form.name.trim()) return;

  const gradeVal = String(form.grade).trim().replace(',', '.');
  const grade = gradeVal && !isNaN(parseFloat(gradeVal)) ? parseFloat(gradeVal) : null;
  const possible = [...form.possibleModuleIds];
  const assigned = possible.length > 0 ? possible[0] : '';

  emit('add-course', {
    id: `course-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    name: form.name.trim(),
    semester: form.semester,
    lp: form.lp || 5,
    grade: grade,
    possibleModuleIds: possible,
    assignedModuleId: assigned
  });

  // Reset form
  form.name = '';
  form.semester = '4. Sem.';
  form.lp = 5;
  form.grade = '';
  form.possibleModuleIds = [];
}

function setActiveModule(course, modId) {
  course.assignedModuleId = modId;
  emit('update-course', course);
}

function updateCourseSemester(course, sem) {
  course.semester = sem;
  emit('update-course', course);
}

function updateCourseGrade(course, rawVal) {
  const val = String(rawVal).trim().replace(',', '.');
  if (val === '') {
    course.grade = null;
  } else {
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 1.0 && num <= 5.0) {
      course.grade = num;
    }
  }
  emit('update-course', course);
}

function deleteCourse(courseId) {
  emit('delete-course', courseId);
}

function getModuleCode(modId) {
  const m = props.allElectiveModules.find(x => x.id === modId);
  return m ? m.code : modId;
}

function getModuleLp(modId) {
  const m = props.allElectiveModules.find(x => x.id === modId);
  return m ? m.lp : 5;
}

function getAllocationOptions(course) {
  const options = [{ title: '-- Nicht zugeordnet --', value: '' }];
  props.allElectiveModules.forEach(m => {
    options.push({
      title: `${m.code} - ${m.name} (${m.lp} LP, ${m.area})`,
      value: m.id
    });
  });
  return options;
}
</script>

<style scoped>
.area-card {
  border-color: #cbd5e1;
  overflow: hidden;
}
.module-pill {
  transition: all 0.15s ease;
}
.module-pill:hover {
  filter: brightness(0.95);
}
:deep(.course-table table) {
  table-layout: auto;
  width: 100%;
}
:deep(.course-table th),
:deep(.course-table td) {
  padding-left: 6px !important;
  padding-right: 6px !important;
  font-size: 0.8125rem !important;
}
:deep(.grade-input input) {
  text-align: center;
  font-weight: 600;
  padding: 4px 6px;
}
</style>
