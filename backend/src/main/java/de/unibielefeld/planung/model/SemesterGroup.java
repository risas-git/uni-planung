package de.unibielefeld.planung.model;

import java.util.List;

public class SemesterGroup {
    private int semesterNumber;
    private String title;
    private int targetLp;
    private List<CourseModule> modules;

    public SemesterGroup() {}

    public SemesterGroup(int semesterNumber, String title, int targetLp, List<CourseModule> modules) {
        this.semesterNumber = semesterNumber;
        this.title = title;
        this.targetLp = targetLp;
        this.modules = modules;
    }

    public int getSemesterNumber() { return semesterNumber; }
    public void setSemesterNumber(int semesterNumber) { this.semesterNumber = semesterNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public int getTargetLp() { return targetLp; }
    public void setTargetLp(int targetLp) { this.targetLp = targetLp; }

    public List<CourseModule> getModules() { return modules; }
    public void setModules(List<CourseModule> modules) { this.modules = modules; }
}
