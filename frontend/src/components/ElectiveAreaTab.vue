<template>
  <div class="elective-area-tab">
    <v-card variant="outlined" class="mb-6 rounded-lg elevation-1 area-card">
      <!-- Area Header -->
      <v-card-item class="bg-grey-lighten-4 border-b py-3 px-4">
        <div class="d-flex justify-space-between align-center flex-wrap ga-2">
          <div>
            <h3 class="text-h6 font-weight-bold text-primary mb-1">
              {{ title }} ({{ targetLp }} LP)
            </h3>
            <div class="text-caption text-grey-darken-1">
              {{ description }}
            </div>
          </div>

          <v-chip
            :color="filledLp >= targetLp ? 'success' : filledLp > 0 ? 'warning' : 'grey-darken-1'"
            variant="flat"
            size="small"
            class="font-weight-bold"
          >
            {{ filledLp }} / {{ targetLp }} LP belegt
          </v-chip>
        </div>
      </v-card-item>

      <!-- Elective Modules Table -->
      <v-table density="comfortable" hover>
        <thead>
          <tr class="bg-grey-lighten-5 text-uppercase text-caption font-weight-bold text-grey-darken-2">
            <th style="width: 140px;">Kürzel</th>
            <th style="min-width: 240px;">Modulbezeichnung</th>
            <th class="text-center" style="width: 110px;">Typ</th>
            <th class="text-center" style="width: 80px;">Soll LP</th>
            <th class="text-center" style="width: 80px;">Belegt</th>
            <th style="min-width: 250px;">Zugeordnete Veranstaltungen</th>
            <th class="text-center" style="width: 110px;">Prüfung</th>
            <th class="text-center" style="width: 80px;">Schnitt</th>
            <th class="text-center" style="width: 130px;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="mod in modules"
            :key="mod.id"
            :class="{ 'bg-green-lighten-5 text-green-darken-4 font-weight-medium': isModuleFull(mod.id, mod.lp) }"
          >
            <!-- Kürzel -->
            <td class="font-mono text-caption font-weight-bold">
              {{ mod.code }}
            </td>

            <!-- Name with EkVV Link -->
            <td>
              <a
                :href="mod.link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-decoration-none font-weight-bold"
                :class="isModuleFull(mod.id, mod.lp) ? 'text-green-darken-3' : 'text-primary'"
              >
                {{ mod.name }}
                <v-icon size="x-small" icon="mdi-open-in-new" class="ms-1 text-grey" />
              </a>
            </td>

            <!-- Typ -->
            <td class="text-center text-caption">
              <v-chip size="x-small" variant="tonal" color="primary">
                {{ mod.type || '-' }}
              </v-chip>
            </td>

            <!-- Soll LP -->
            <td class="text-center font-weight-bold">
              {{ mod.lp }}
            </td>

            <!-- Belegt LP -->
            <td
              class="text-center font-weight-bold"
              :class="getFilledLp(mod.id) >= mod.lp ? 'text-success' : getFilledLp(mod.id) > 0 ? 'text-warning' : ''"
            >
              {{ getFilledLp(mod.id) }}
            </td>

            <!-- Assigned Courses -->
            <td>
              <div v-if="getAssignedCourses(mod.id).length > 0" class="d-flex flex-wrap ga-1 py-1">
                <v-chip
                  v-for="c in getAssignedCourses(mod.id)"
                  :key="c.id"
                  size="x-small"
                  variant="outlined"
                  class="font-weight-medium"
                >
                  <strong>{{ c.name }}</strong>
                  <span class="ms-1 text-grey-darken-1">
                    ({{ c.semester ? c.semester + ', ' : '' }}{{ c.lp }} LP{{ c.grade ? ', Note: ' + c.grade : '' }})
                  </span>
                </v-chip>
              </div>
              <span v-else class="text-grey text-caption font-italic">Keine Kurse zugeordnet</span>
            </td>

            <!-- Prüfung -->
            <td class="text-center text-caption">
              <span v-if="mod.bPr !== '-'">{{ mod.bPr }} bPr </span>
              <span v-if="mod.uPr !== '-'">{{ mod.uPr }} uPr</span>
              <span v-if="mod.bPr === '-' && mod.uPr === '-'">-</span>
            </td>

            <!-- Schnitt -->
            <td class="text-center font-weight-bold text-caption">
              {{ getAverageGrade(mod.id) }}
            </td>

            <!-- Status Chip -->
            <td class="text-center">
              <v-chip
                v-if="getFilledLp(mod.id) >= mod.lp"
                color="success"
                size="x-small"
                variant="flat"
                class="font-weight-bold"
              >
                Vollständig
              </v-chip>
              <v-chip
                v-else-if="getFilledLp(mod.id) > 0"
                color="warning"
                size="x-small"
                variant="tonal"
                class="font-weight-bold"
              >
                Teilweise
              </v-chip>
              <v-chip
                v-else
                color="grey"
                size="x-small"
                variant="outlined"
              >
                Offen
              </v-chip>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  targetLp: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  modules: {
    type: Array,
    required: true
  },
  allocations: {
    type: Object,
    default: () => ({})
  },
  filledLp: {
    type: Number,
    default: 0
  }
});

function getFilledLp(modId) {
  return props.allocations[modId]?.filledLp || 0;
}

function isModuleFull(modId, targetLp) {
  return getFilledLp(modId) >= targetLp;
}

function getAssignedCourses(modId) {
  return props.allocations[modId]?.courses || [];
}

function getAverageGrade(modId) {
  return props.allocations[modId]?.averageGrade || '-';
}
</script>

<style scoped>
.font-mono {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}
.area-card {
  border-color: #cbd5e1;
  overflow: hidden;
}
:deep(.v-table) {
  background: #ffffff !important;
}
</style>
