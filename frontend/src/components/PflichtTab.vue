<template>
  <div class="pflicht-tab">
    <v-card
      v-for="sem in semesters"
      :key="sem.semesterNumber"
      variant="outlined"
      class="mb-6 rounded-lg elevation-1 semester-card"
    >
      <!-- Semester Header -->
      <v-card-item class="bg-grey-lighten-4 border-b py-3 px-4">
        <div class="d-flex justify-space-between align-center flex-wrap ga-2">
          <div class="d-flex align-center ga-3">
            <h3 class="text-h6 font-weight-bold text-primary mb-0">
              {{ sem.title }}
            </h3>
          </div>

          <v-chip
            :color="getSemesterCompletion(sem).isDone ? 'success' : 'grey-darken-1'"
            variant="flat"
            size="small"
            class="font-weight-bold"
          >
            {{ getSemesterCompletion(sem).completedLp }} / {{ sem.targetLp }} LP abgeschlossen
          </v-chip>
        </div>
      </v-card-item>

      <!-- Semester Module Table -->
      <v-table density="comfortable" hover>
        <thead>
          <tr class="bg-grey-lighten-5 text-uppercase text-caption font-weight-bold text-grey-darken-2">
            <th style="width: 54px;" class="text-center">
              <v-checkbox-btn
                :model-value="getSemesterCompletion(sem).isDone"
                color="success"
                density="compact"
                hide-details
                :aria-label="`Alle Module in ${sem.title} auswählen`"
                @update:model-value="toggleAllInSemester(sem, $event)"
              />
            </th>
            <th style="width: 140px;">Kürzel</th>
            <th style="min-width: 250px;">Bezeichnung</th>
            <th class="text-center" style="width: 70px;">LP</th>
            <th class="text-center" style="width: 100px;">Empf. Beginn</th>
            <th class="text-center" style="width: 90px;">Bindung</th>
            <th class="text-center" style="width: 60px;">SL</th>
            <th class="text-center" style="width: 60px;">bPr</th>
            <th class="text-center" style="width: 60px;">uPr</th>
            <th class="text-center" style="width: 110px;">Note</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="mod in sem.modules"
            :key="mod.id"
            :class="{ 'bg-green-lighten-5 text-green-darken-4 font-weight-medium': isCompleted(mod.id) }"
          >
            <!-- Checkbox -->
            <td class="text-center">
              <v-checkbox-btn
                :model-value="isCompleted(mod.id)"
                color="success"
                density="compact"
                hide-details
                @update:model-value="toggleModule(mod.id)"
              />
            </td>

            <!-- Kürzel -->
            <td class="font-mono text-caption font-weight-bold">
              {{ mod.code }}
            </td>

            <!-- Bezeichnung with official EkVV Link -->
            <td>
              <a
                :href="mod.link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-decoration-none font-weight-bold"
                :class="isCompleted(mod.id) ? 'text-green-darken-3' : 'text-primary'"
              >
                {{ mod.name }}
                <v-icon size="x-small" icon="mdi-open-in-new" class="ms-1 text-grey" />
              </a>
            </td>

            <!-- LP -->
            <td class="text-center font-weight-bold">
              {{ mod.lp }}
            </td>

            <!-- Empf. Beginn -->
            <td class="text-center text-caption">
              {{ mod.semester }}
            </td>

            <!-- Bindung -->
            <td class="text-center text-caption">
              {{ mod.binding }}
            </td>

            <!-- Exams: SL, bPr, uPr -->
            <td class="text-center text-caption">{{ mod.sl }}</td>
            <td class="text-center text-caption">{{ mod.bPr }}</td>
            <td class="text-center text-caption">{{ mod.uPr }}</td>

            <!-- Note -->
            <td class="text-center">
              <template v-if="mod.bPr !== '-' && parseInt(mod.bPr) > 0">
                <v-text-field
                  :model-value="getGrade(mod.id)"
                  type="number"
                  step="0.1"
                  min="1.0"
                  max="5.0"
                  density="compact"
                  variant="outlined"
                  hide-details
                  class="grade-input mx-auto"
                  style="max-width: 80px;"
                  @update:model-value="updateGrade(mod.id, $event)"
                />
              </template>
              <span v-else class="text-grey text-caption font-italic">-</span>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<script setup>
const props = defineProps({
  semesters: {
    type: Array,
    required: true
  },
  completedIds: {
    type: Set,
    required: true
  },
  grades: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['toggle-module', 'toggle-semester', 'update-grade']);

function isCompleted(moduleId) {
  return props.completedIds.has(moduleId);
}

function getGrade(moduleId) {
  return props.grades[moduleId] !== undefined ? props.grades[moduleId] : '';
}

function toggleModule(moduleId) {
  emit('toggle-module', moduleId);
}

function toggleAllInSemester(sem, shouldCheck) {
  emit('toggle-semester', { semester: sem, check: shouldCheck });
}

function updateGrade(moduleId, val) {
  emit('update-grade', { moduleId, value: val });
}

function getSemesterCompletion(sem) {
  let completedLp = 0;
  let totalLp = 0;

  sem.modules.forEach(m => {
    totalLp += m.lp;
    if (props.completedIds.has(m.id)) {
      completedLp += m.lp;
    }
  });

  return {
    completedLp,
    totalLp,
    isDone: completedLp === totalLp && totalLp > 0
  };
}
</script>

<style scoped>
.font-mono {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}
.semester-card {
  border-color: #cbd5e1;
  overflow: hidden;
}
:deep(.v-table) {
  background: #ffffff !important;
}
:deep(.grade-input input) {
  text-align: center;
  font-weight: 600;
  padding: 4px 6px;
}
</style>
