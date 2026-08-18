package de.unibielefeld.planung.model;

import java.util.ArrayList;
import java.util.List;

public class LoggedCourse {
    private String id;
    private String name;
    private String semester;
    private int lp;
    private Double grade;
    private List<String> possibleModuleIds = new ArrayList<>();
    private String assignedModuleId;

    public LoggedCourse() {}

    public LoggedCourse(String id, String name, String semester, int lp, Double grade, 
                        List<String> possibleModuleIds, String assignedModuleId) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.lp = lp;
        this.grade = grade;
        this.possibleModuleIds = possibleModuleIds != null ? possibleModuleIds : new ArrayList<>();
        this.assignedModuleId = assignedModuleId;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public int getLp() { return lp; }
    public void setLp(int lp) { this.lp = lp; }

    public Double getGrade() { return grade; }
    public void setGrade(Double grade) { this.grade = grade; }

    public List<String> getPossibleModuleIds() { return possibleModuleIds; }
    public void setPossibleModuleIds(List<String> possibleModuleIds) { this.possibleModuleIds = possibleModuleIds; }

    public String getAssignedModuleId() { return assignedModuleId; }
    public void setAssignedModuleId(String assignedModuleId) { this.assignedModuleId = assignedModuleId; }
}
