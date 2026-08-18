package de.unibielefeld.planung.service;

import de.unibielefeld.planung.model.CalculationResult;
import de.unibielefeld.planung.model.CalculationResult.ModuleAllocationDto;
import de.unibielefeld.planung.model.CourseModule;
import de.unibielefeld.planung.model.LoggedCourse;
import de.unibielefeld.planung.model.StudyPlanState;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

@Service
public class CalculationService {

    private final CurriculumService curriculumService;

    public CalculationService(CurriculumService curriculumService) {
        this.curriculumService = curriculumService;
    }

    public CalculationResult calculate(StudyPlanState state) {
        CalculationResult result = new CalculationResult();
        List<CourseModule> allPflicht = curriculumService.getAllPflichtModules();
        result.setTotalPflichtCount(allPflicht.size());

        Set<String> completedIds = state.getPflichtCompletedIds();
        Map<String, Double> grades = state.getPflichtGrades();

        int pflichtLp = 0;
        int pflichtCompletedCount = 0;
        double weightedGradeSum = 0.0;
        int totalGradedLp = 0;

        for (CourseModule mod : allPflicht) {
            boolean isDone = completedIds.contains(mod.getId());
            boolean isGraded = !"-".equals(mod.getbPr()) && Integer.parseInt(mod.getbPr()) > 0;
            Double grade = grades.get(mod.getId());

            if (isDone) {
                pflichtLp += mod.getLp();
                pflichtCompletedCount++;
            }

            if (isGraded && grade != null && !grade.isNaN()) {
                if (isDone || grade <= 4.0) {
                    weightedGradeSum += grade * mod.getLp();
                    totalGradedLp += mod.getLp();
                }
            }
        }

        result.setPflichtLp(pflichtLp);
        result.setPflichtCompletedCount(pflichtCompletedCount);

        // Map elective allocations
        Map<String, ModuleAllocationDto> allocations = new HashMap<>();
        for (CourseModule mod : curriculumService.getAllElectiveModules()) {
            allocations.put(mod.getId(), new ModuleAllocationDto(mod));
        }

        for (LoggedCourse course : state.getLoggedCourses()) {
            String assignedId = course.getAssignedModuleId();
            if (assignedId != null && allocations.containsKey(assignedId)) {
                ModuleAllocationDto bucket = allocations.get(assignedId);
                bucket.getCourses().add(course);
                bucket.setFilledLp(bucket.getFilledLp() + course.getLp());

                if (course.getGrade() != null && !course.getGrade().isNaN()) {
                    bucket.setWeightedSum(bucket.getWeightedSum() + (course.getGrade() * course.getLp()));
                    bucket.setGradedLp(bucket.getGradedLp() + course.getLp());

                    weightedGradeSum += course.getGrade() * course.getLp();
                    totalGradedLp += course.getLp();
                }
            }
        }

        // Calculate average grade per module
        for (ModuleAllocationDto bucket : allocations.values()) {
            if (bucket.getGradedLp() > 0) {
                double avg = bucket.getWeightedSum() / bucket.getGradedLp();
                bucket.setAverageGrade(String.format(Locale.GERMANY, "%.2f", avg));
            }
        }
        result.setModuleAllocations(allocations);

        // Sum category LP
        int wpLp = 0;
        for (CourseModule m : curriculumService.getWahlpflichtModules()) {
            wpLp += allocations.get(m.getId()).getFilledLp();
        }
        result.setWpLp(wpLp);

        int mikeLp = 0;
        for (CourseModule m : curriculumService.getMikeModules()) {
            mikeLp += allocations.get(m.getId()).getFilledLp();
        }
        result.setMikeLp(mikeLp);

        int seLp = 0;
        for (CourseModule m : curriculumService.getStrukturierteErgaenzungModules()) {
            seLp += allocations.get(m.getId()).getFilledLp();
        }
        result.setSeLp(seLp);

        int totalDegreeLp = pflichtLp + wpLp + mikeLp + seLp;
        result.setTotalDegreeLp(totalDegreeLp);
        result.setRemainingLp(Math.max(0, 180 - totalDegreeLp));
        result.setTotalGradedLp(totalGradedLp);

        if (totalGradedLp > 0) {
            double overallAvg = weightedGradeSum / totalGradedLp;
            result.setOverallGpa(String.format(Locale.GERMANY, "%.2f", overallAvg));
        } else {
            result.setOverallGpa("-");
        }

        return result;
    }
}
