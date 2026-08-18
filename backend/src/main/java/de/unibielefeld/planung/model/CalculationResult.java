package de.unibielefeld.planung.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CalculationResult {
    private int pflichtLp;
    private int pflichtCompletedCount;
    private int totalPflichtCount;
    private int wpLp;
    private int mikeLp;
    private int seLp;
    private int totalDegreeLp;
    private int remainingLp;
    private int totalGradedLp;
    private String overallGpa;
    private Map<String, ModuleAllocationDto> moduleAllocations = new HashMap<>();

    public CalculationResult() {}

    public int getPflichtLp() { return pflichtLp; }
    public void setPflichtLp(int pflichtLp) { this.pflichtLp = pflichtLp; }

    public int getPflichtCompletedCount() { return pflichtCompletedCount; }
    public void setPflichtCompletedCount(int pflichtCompletedCount) { this.pflichtCompletedCount = pflichtCompletedCount; }

    public int getTotalPflichtCount() { return totalPflichtCount; }
    public void setTotalPflichtCount(int totalPflichtCount) { this.totalPflichtCount = totalPflichtCount; }

    public int getWpLp() { return wpLp; }
    public void setWpLp(int wpLp) { this.wpLp = wpLp; }

    public int getMikeLp() { return mikeLp; }
    public void setMikeLp(int mikeLp) { this.mikeLp = mikeLp; }

    public int getSeLp() { return seLp; }
    public void setSeLp(int seLp) { this.seLp = seLp; }

    public int getTotalDegreeLp() { return totalDegreeLp; }
    public void setTotalDegreeLp(int totalDegreeLp) { this.totalDegreeLp = totalDegreeLp; }

    public int getRemainingLp() { return remainingLp; }
    public void setRemainingLp(int remainingLp) { this.remainingLp = remainingLp; }

    public int getTotalGradedLp() { return totalGradedLp; }
    public void setTotalGradedLp(int totalGradedLp) { this.totalGradedLp = totalGradedLp; }

    public String getOverallGpa() { return overallGpa; }
    public void setOverallGpa(String overallGpa) { this.overallGpa = overallGpa; }

    public Map<String, ModuleAllocationDto> getModuleAllocations() { return moduleAllocations; }
    public void setModuleAllocations(Map<String, ModuleAllocationDto> moduleAllocations) { 
        this.moduleAllocations = moduleAllocations; 
    }

    public static class ModuleAllocationDto {
        private CourseModule module;
        private List<LoggedCourse> courses = new ArrayList<>();
        private int filledLp;
        private double weightedSum;
        private int gradedLp;
        private String averageGrade = "-";

        public ModuleAllocationDto() {}

        public ModuleAllocationDto(CourseModule module) {
            this.module = module;
        }

        public CourseModule getModule() { return module; }
        public void setModule(CourseModule module) { this.module = module; }

        public List<LoggedCourse> getCourses() { return courses; }
        public void setCourses(List<LoggedCourse> courses) { this.courses = courses; }

        public int getFilledLp() { return filledLp; }
        public void setFilledLp(int filledLp) { this.filledLp = filledLp; }

        public double getWeightedSum() { return weightedSum; }
        public void setWeightedSum(double weightedSum) { this.weightedSum = weightedSum; }

        public int getGradedLp() { return gradedLp; }
        public void setGradedLp(int gradedLp) { this.gradedLp = gradedLp; }

        public String getAverageGrade() { return averageGrade; }
        public void setAverageGrade(String averageGrade) { this.averageGrade = averageGrade; }
    }
}
