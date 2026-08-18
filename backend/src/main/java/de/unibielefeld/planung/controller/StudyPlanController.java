package de.unibielefeld.planung.controller;

import de.unibielefeld.planung.model.CalculationResult;
import de.unibielefeld.planung.model.StudyPlanState;
import de.unibielefeld.planung.service.CalculationService;
import de.unibielefeld.planung.service.CsvExportImportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/plan")
@CrossOrigin(origins = "*")
public class StudyPlanController {

    private final CalculationService calculationService;
    private final CsvExportImportService csvService;

    public StudyPlanController(CalculationService calculationService, CsvExportImportService csvService) {
        this.calculationService = calculationService;
        this.csvService = csvService;
    }

    @PostMapping("/calculate")
    public CalculationResult calculate(@RequestBody StudyPlanState state) {
        return calculationService.calculate(state);
    }

    @PostMapping("/export-csv")
    public ResponseEntity<byte[]> exportCsv(@RequestBody StudyPlanState state) {
        byte[] csvBytes = csvService.exportCsv(state);
        String fileName = "Studienplan_KI_Bielefeld_" + LocalDate.now() + ".csv";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .contentType(MediaType.parseMediaType("text/csv; charset=utf-8"))
                .body(csvBytes);
    }

    @PostMapping("/import-csv")
    public ResponseEntity<StudyPlanState> importCsv(@RequestParam("file") MultipartFile file) throws IOException {
        String content = new String(file.getBytes(), StandardCharsets.UTF_8);
        StudyPlanState state = csvService.importCsv(content);
        return ResponseEntity.ok(state);
    }

    @PostMapping("/import-csv-text")
    public ResponseEntity<StudyPlanState> importCsvText(@RequestBody String content) {
        StudyPlanState state = csvService.importCsv(content);
        return ResponseEntity.ok(state);
    }
}
