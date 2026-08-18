package de.unibielefeld.planung.service;

import de.unibielefeld.planung.model.CalculationResult;
import de.unibielefeld.planung.model.CourseModule;
import de.unibielefeld.planung.model.LoggedCourse;
import de.unibielefeld.planung.model.SemesterGroup;
import de.unibielefeld.planung.model.StudyPlanState;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CsvExportImportService {

    private final CurriculumService curriculumService;
    private final CalculationService calculationService;

    public CsvExportImportService(CurriculumService curriculumService, CalculationService calculationService) {
        this.curriculumService = curriculumService;
        this.calculationService = calculationService;
    }

    public byte[] exportCsv(StudyPlanState state) {
        CalculationResult stats = calculationService.calculate(state);
        StringBuilder sb = new StringBuilder();

        // UTF-8 BOM for Excel
        sb.append('\uFEFF');

        // Section 1: Pflichtbereich
        sb.append("Bereich;Fachsemester;Kuerzel;Bezeichnung;LP;Empf_Beginn;Bindung;SL;bPr;uPr;Status;Note\r\n");

        for (SemesterGroup sem : curriculumService.getPflichtSemesters()) {
            for (CourseModule mod : sem.getModules()) {
                boolean isDone = state.getPflichtCompletedIds().contains(mod.getId());
                String status = isDone ? "Abgeschlossen" : "Offen";
                Double grade = state.getPflichtGrades().get(mod.getId());
                String gradeStr = grade != null ? String.valueOf(grade).replace('.', ',') : "";

                sb.append("\"Pflichtbereich\";")
                  .append("\"").append(sem.getTitle()).append("\";")
                  .append("\"").append(mod.getCode()).append("\";")
                  .append("\"").append(mod.getName().replace("\"", "\"\"")).append("\";")
                  .append(mod.getLp()).append(";")
                  .append("\"").append(mod.getSemester()).append("\";")
                  .append("\"").append(mod.getBinding()).append("\";")
                  .append("\"").append(mod.getSl()).append("\";")
                  .append("\"").append(mod.getbPr()).append("\";")
                  .append("\"").append(mod.getuPr()).append("\";")
                  .append("\"").append(status).append("\";")
                  .append("\"").append(gradeStr).append("\"\r\n");
            }
        }

        // Section 2: Logged Courses
        sb.append("\r\n");
        sb.append("# Erfasste Lehrveranstaltungen & Modul-Zuordnungen\r\n");
        sb.append("Veranstaltungsname;Fachsemester;LP;Note;Moegliche_Module_IDs;Zugeordnetes_Modul_ID\r\n");

        for (LoggedCourse c : state.getLoggedCourses()) {
            String gradeStr = c.getGrade() != null ? String.valueOf(c.getGrade()).replace('.', ',') : "";
            String possibleStr = String.join("|", c.getPossibleModuleIds() != null ? c.getPossibleModuleIds() : List.of());
            String semStr = c.getSemester() != null ? c.getSemester() : "4. Sem.";
            String assignedStr = c.getAssignedModuleId() != null ? c.getAssignedModuleId() : "";

            sb.append("\"").append(c.getName().replace("\"", "\"\"")).append("\";")
              .append("\"").append(semStr).append("\";")
              .append(c.getLp()).append(";")
              .append("\"").append(gradeStr).append("\";")
              .append("\"").append(possibleStr).append("\";")
              .append("\"").append(assignedStr).append("\"\r\n");
        }

        // Section 3: Summary Metadata
        sb.append("\r\n");
        sb.append("\"Gesamtschnitt (gewichtet)\";\"").append(stats.getOverallGpa()).append("\"\r\n");
        sb.append("\"Gesamtfortschritt\";\"").append(stats.getTotalDegreeLp()).append(" / 180 LP\"\r\n");
        sb.append("\"Pflichtbereich LP\";\"").append(stats.getPflichtLp()).append(" / 120 LP\"\r\n");
        sb.append("\"Wahlpflicht LP\";\"").append(stats.getWpLp()).append(" / 20 LP\"\r\n");
        sb.append("\"MiKE LP\";\"").append(stats.getMikeLp()).append(" / 10 LP\"\r\n");
        sb.append("\"Strukturierte Ergaenzung LP\";\"").append(stats.getSeLp()).append(" / 30 LP\"\r\n");

        return sb.toString().getBytes(StandardCharsets.UTF_8);
    }

    public StudyPlanState importCsv(String csvContent) {
        StudyPlanState state = new StudyPlanState();
        if (csvContent == null || csvContent.isBlank()) return state;

        if (csvContent.startsWith("\uFEFF")) {
            csvContent = csvContent.substring(1);
        }

        String[] lines = csvContent.split("\\r?\\n");
        if (lines.length <= 1) return state;

        char delimiter = ';';
        if (!lines[0].contains(";") && lines[0].contains(",")) delimiter = ',';
        else if (lines[0].contains("\t")) delimiter = '\t';

        List<CourseModule> allPflicht = curriculumService.getAllPflichtModules();
        boolean inLoggedCoursesSection = false;
        boolean loggedCoursesHeaderRead = false;

        int codeIdx = -1, statusIdx = -1, gradeIdx = -1, nameIdx = -1;
        int cNameIdx = 0, cSemIdx = 1, cLpIdx = 2, cGradeIdx = 3, cPossibleIdx = 4, cAssignedIdx = 5;

        for (String rawLine : lines) {
            String trimmed = rawLine.trim();
            if (trimmed.isEmpty()) continue;

            if (trimmed.startsWith("#") || trimmed.contains("Erfasste Lehrveranstaltungen")) {
                inLoggedCoursesSection = true;
                loggedCoursesHeaderRead = false;
                continue;
            }

            List<String> cols = parseCsvLine(trimmed, delimiter);
            if (cols.isEmpty()) continue;

            if (!inLoggedCoursesSection) {
                if (codeIdx == -1) {
                    List<String> headerCols = cols.stream().map(c -> c.toLowerCase().trim()).toList();
                    codeIdx = findIndex(headerCols, "kuerzel", "kürzel", "code");
                    statusIdx = findIndex(headerCols, "status");
                    gradeIdx = findIndex(headerCols, "note", "grade");
                    nameIdx = findIndex(headerCols, "bezeichnung", "name");
                    continue;
                }

                String rowCode = safeGet(cols, codeIdx);
                String rowName = safeGet(cols, nameIdx);
                String rowStatus = safeGet(cols, statusIdx).toLowerCase();
                String rowGrade = safeGet(cols, gradeIdx).replace(',', '.');

                if (rowCode.isEmpty() && rowName.isEmpty()) continue;

                for (CourseModule mod : allPflicht) {
                    if ((!rowCode.isEmpty() && (mod.getCode().equalsIgnoreCase(rowCode) || mod.getId().equalsIgnoreCase(rowCode))) ||
                        (!rowName.isEmpty() && mod.getName().equalsIgnoreCase(rowName))) {

                        if (rowStatus.contains("abgeschlossen") || rowStatus.contains("erledigt") || 
                            "1".equals(rowStatus) || "true".equals(rowStatus) || "ja".equals(rowStatus) || "x".equals(rowStatus)) {
                            state.getPflichtCompletedIds().add(mod.getId());
                        }

                        if (!rowGrade.isEmpty()) {
                            try {
                                double num = Double.parseDouble(rowGrade);
                                if (num >= 1.0 && num <= 5.0) {
                                    state.getPflichtGrades().put(mod.getId(), num);
                                    if (num <= 4.0) state.getPflichtCompletedIds().add(mod.getId());
                                }
                            } catch (NumberFormatException ignored) {}
                        }
                        break;
                    }
                }
            } else {
                if (!loggedCoursesHeaderRead) {
                    loggedCoursesHeaderRead = true;
                    List<String> h = cols.stream().map(c -> c.toLowerCase().trim()).toList();
                    cNameIdx = findIndex(h, "name", "veranstaltung");
                    if (cNameIdx == -1) cNameIdx = 0;
                    cSemIdx = findIndex(h, "sem");
                    cLpIdx = findIndex(h, "lp");
                    if (cLpIdx == -1) cLpIdx = 2;
                    cGradeIdx = findIndex(h, "note", "grade");
                    if (cGradeIdx == -1) cGradeIdx = 3;
                    cPossibleIdx = findIndex(h, "moeglich", "mögliche");
                    if (cPossibleIdx == -1) cPossibleIdx = 4;
                    cAssignedIdx = findIndex(h, "zugeordnet");
                    if (cAssignedIdx == -1) cAssignedIdx = 5;
                    continue;
                }

                if (cols.size() >= 2) {
                    String cName = safeGet(cols, cNameIdx);
                    String lowerName = cName.toLowerCase();
                    if (cName.isEmpty() || 
                        lowerName.contains("gesamtschnitt") || 
                        lowerName.contains("gesamtfortschritt") ||
                        lowerName.contains("pflichtbereich lp") ||
                        lowerName.contains("wahlpflicht lp") ||
                        lowerName.contains("mike lp") ||
                        lowerName.contains("strukturierte ergaenzung") ||
                        lowerName.contains("strukturierte ergänzung") ||
                        lowerName.contains("abgeschlossene lp")) {
                        continue;
                    }

                    String cSem = safeGet(cols, cSemIdx);
                    if (cSem.isEmpty()) cSem = "4. Sem.";

                    int cLp = 5;
                    try {
                        cLp = Integer.parseInt(safeGet(cols, cLpIdx));
                    } catch (NumberFormatException ignored) {}

                    Double cGrade = null;
                    String cGradeVal = safeGet(cols, cGradeIdx).replace(',', '.');
                    if (!cGradeVal.isEmpty()) {
                        try {
                            cGrade = Double.parseDouble(cGradeVal);
                        } catch (NumberFormatException ignored) {}
                    }

                    List<String> cPossible = new ArrayList<>();
                    String possibleRaw = safeGet(cols, cPossibleIdx);
                    if (!possibleRaw.isEmpty()) {
                        for (String p : possibleRaw.split("\\|")) {
                            if (!p.trim().isEmpty()) cPossible.add(p.trim());
                        }
                    }

                    String cAssigned = safeGet(cols, cAssignedIdx);

                    state.getLoggedCourses().add(new LoggedCourse(
                        "course-" + UUID.randomUUID().toString().substring(0, 8),
                        cName,
                        cSem,
                        cLp,
                        cGrade,
                        cPossible,
                        cAssigned
                    ));
                }
            }
        }

        return state;
    }

    private int findIndex(List<String> list, String... candidates) {
        for (int i = 0; i < list.size(); i++) {
            for (String candidate : candidates) {
                if (list.get(i).contains(candidate)) return i;
            }
        }
        return -1;
    }

    private String safeGet(List<String> list, int index) {
        if (index >= 0 && index < list.size() && list.get(index) != null) {
            return list.get(index).trim();
        }
        return "";
    }

    private List<String> parseCsvLine(String line, char delimiter) {
        List<String> result = new ArrayList<>();
        if (line == null) return result;

        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;

        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            if (c == '"') {
                if (inQuotes && i + 1 < line.length() && line.charAt(i + 1) == '"') {
                    current.append('"');
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (c == delimiter && !inQuotes) {
                result.add(current.toString());
                current.setLength(0);
            } else {
                current.append(c);
            }
        }
        result.add(current.toString());
        return result;
    }
}
