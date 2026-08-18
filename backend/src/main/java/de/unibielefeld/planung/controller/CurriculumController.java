package de.unibielefeld.planung.controller;

import de.unibielefeld.planung.model.CourseModule;
import de.unibielefeld.planung.model.SemesterGroup;
import de.unibielefeld.planung.service.CurriculumService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/curriculum")
@CrossOrigin(origins = "*")
public class CurriculumController {

    private final CurriculumService curriculumService;

    public CurriculumController(CurriculumService curriculumService) {
        this.curriculumService = curriculumService;
    }

    @GetMapping("/pflicht")
    public List<SemesterGroup> getPflichtSemesters() {
        return curriculumService.getPflichtSemesters();
    }

    @GetMapping("/electives")
    public Map<String, List<CourseModule>> getElectiveCatalogs() {
        Map<String, List<CourseModule>> map = new HashMap<>();
        map.put("wahlpflicht", curriculumService.getWahlpflichtModules());
        map.put("mike", curriculumService.getMikeModules());
        map.put("strukturierteErgaenzung", curriculumService.getStrukturierteErgaenzungModules());
        map.put("allElectives", curriculumService.getAllElectiveModules());
        return map;
    }
}
