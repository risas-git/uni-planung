package de.unibielefeld.planung.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class StudyPlanState {
    private Set<String> pflichtCompletedIds = new HashSet<>();
    private Map<String, Double> pflichtGrades = new HashMap<>();
    private List<LoggedCourse> loggedCourses = new ArrayList<>();

    public StudyPlanState() {}

    public Set<String> getPflichtCompletedIds() { return pflichtCompletedIds; }
    public void setPflichtCompletedIds(Set<String> pflichtCompletedIds) { 
        this.pflichtCompletedIds = pflichtCompletedIds != null ? pflichtCompletedIds : new HashSet<>(); 
    }

    public Map<String, Double> getPflichtGrades() { return pflichtGrades; }
    public void setPflichtGrades(Map<String, Double> pflichtGrades) { 
        this.pflichtGrades = pflichtGrades != null ? pflichtGrades : new HashMap<>(); 
    }

    public List<LoggedCourse> getLoggedCourses() { return loggedCourses; }
    public void setLoggedCourses(List<LoggedCourse> loggedCourses) { 
        this.loggedCourses = loggedCourses != null ? loggedCourses : new ArrayList<>(); 
    }
}
