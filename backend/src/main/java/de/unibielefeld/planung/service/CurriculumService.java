package de.unibielefeld.planung.service;

import de.unibielefeld.planung.model.CourseModule;
import de.unibielefeld.planung.model.SemesterGroup;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CurriculumService {

    private final List<SemesterGroup> pflichtSemesters = new ArrayList<>();
    private final List<CourseModule> wahlpflichtModules = new ArrayList<>();
    private final List<CourseModule> mikeModules = new ArrayList<>();
    private final List<CourseModule> strukturierteErgaenzungModules = new ArrayList<>();

    public CurriculumService() {
        initCurriculum();
    }

    private void initCurriculum() {
        // -------------------------------------------------------------
        // 1. PFLICHTBEREICH (120 LP)
        // -------------------------------------------------------------
        // Semester 1
        List<CourseModule> sem1 = List.of(
            new CourseModule("20-NB", "20-NB", "Neuro- und Verhaltensbiologie", 5, "1.", "Pflicht", "-", "-", "1", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/26796159"),
            new CourseModule("24-M-INF1_a", "24-M-INF1_a", "Mathematik für Informatik 1", 10, "1.", "Pflicht", "-", "1", "-", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420519984"),
            new CourseModule("28-P-NF-B", "28-P-NF-B", "Physik für Nebenfächler", 10, "1.", "Pflicht", "2", "-", "2", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/27461321"),
            new CourseModule("39-Inf-PP", "39-Inf-PP", "Prinzipien der Programmierung", 10, "1.", "Pflicht", "-", "-", "1", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420520482")
        );
        pflichtSemesters.add(new SemesterGroup(1, "1. Fachsemester", 35, sem1));

        // Semester 2
        List<CourseModule> sem2 = List.of(
            new CourseModule("24-M-INF2_a", "24-M-INF2_a", "Mathematik für Informatik 2", 10, "2.", "Pflicht", "-", "1", "-", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420520712"),
            new CourseModule("27-WKP", "27-WKP", "Wahrnehmungs- und Kognitionspsychologie", 5, "2.", "Pflicht", "-", "-", "1", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/26796150"),
            new CourseModule("39-Inf-6", "39-Inf-6", "Grundlagen Theoretischer Informatik", 5, "2.", "Pflicht", "-", "1", "-", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420521085"),
            new CourseModule("39-Inf-AD", "39-Inf-AD", "Grundlagen der Algorithmen und Datenstrukturen", 5, "2.", "Pflicht", "-", "1", "-", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420521742")
        );
        pflichtSemesters.add(new SemesterGroup(2, "2. Fachsemester", 25, sem2));

        // Semester 3
        List<CourseModule> sem3 = List.of(
            new CourseModule("24-M-INF3", "24-M-INF3", "Mathematik für Informatik 3", 5, "3.", "Pflicht", "-", "1", "-", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420523059"),
            new CourseModule("39-Inf-8_a", "39-Inf-8_a", "Rechnerarchitektur", 5, "3.", "Pflicht", "-", "1", "-", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420556013"),
            new CourseModule("39-Inf-10_a", "39-Inf-10_a", "Datenbanken und Informationssysteme", 5, "3.", "Pflicht", "-", "1", "-", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420523238"),
            new CourseModule("39-Inf-13_b", "39-Inf-13_b", "Grundlagen künstlicher Kognition", 5, "3.", "Pflicht", "-", "1", "-", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420742960"),
            new CourseModule("39-Inf-SE_a", "39-Inf-SE_a", "Software Engineering", 5, "3.", "Pflicht", "-", "-", "2", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/70750995"),
            new CourseModule("39-Inf-ML", "39-Inf-ML", "Grundlagen Maschinelles Lernen", 5, "3. o. 5.", "Pflicht", "-", "1", "-", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420564638")
        );
        pflichtSemesters.add(new SemesterGroup(3, "3. Fachsemester", 30, sem3));

        // Semester 4
        List<CourseModule> sem4 = List.of(
            new CourseModule("24-M-INF4", "24-M-INF4", "Mathematik für Informatik 4", 5, "4.", "Pflicht", "-", "1", "-", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420557284"),
            new CourseModule("39-Inf-17_b", "39-Inf-17_b", "Betriebssysteme", 5, "4.", "Pflicht", "-", "1", "-", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420557783"),
            new CourseModule("39-Inf-18", "39-Inf-18", "Software-Gruppen-Projekt", 5, "4.", "Pflicht", "1", "-", "1", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/70750959"),
            new CourseModule("39-Inf-GSI", "39-Inf-GSI", "Grundlagen sprachlicher Interaktion", 5, "4.", "Pflicht", "-", "1", "-", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/70750978"),
            new CourseModule("39-Inf-NN", "39-Inf-NN", "Grundlagen Neuronaler Netze", 5, "4. o. 6.", "Pflicht", "-", "1", "-", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/695569730")
        );
        pflichtSemesters.add(new SemesterGroup(4, "4. Fachsemester", 25, sem4));

        // Semester 5
        List<CourseModule> sem5 = List.of(
            new CourseModule("39-Inf-PDC", "39-Inf-PDC", "Parallel and Distributed Computing", 5, "5.", "Pflicht", "-", "1", "-", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420559953")
        );
        pflichtSemesters.add(new SemesterGroup(5, "5. Fachsemester", 5, sem5));

        // Semester 6
        List<CourseModule> sem6 = List.of(
            new CourseModule("39-Inf-17-Ba_A", "39-Inf-17-Ba_A", "Bachelorarbeit", 10, "6.", "Pflicht", "-", "1", "-", null, "Pflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/26787779")
        );
        pflichtSemesters.add(new SemesterGroup(6, "6. Fachsemester", 10, sem6));

        // -------------------------------------------------------------
        // 2. WAHLPFLICHTBEREICH (20 LP)
        // -------------------------------------------------------------
        // Schwerpunkte (10 LP)
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-KI-x", "39-Inf-WP-KI-x", "Künstliche Intelligenz (Schwerpunkt)", 10, "4. o. 5.", "Wahlpflicht", "-", "2", "-", "Schwerpunkt", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420582928"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-CIT-x", "39-Inf-WP-CIT-x", "Kognitive Interaktionstechnologie (Schwerpunkt)", 10, "4. o. 5.", "Wahlpflicht", "-", "2", "-", "Schwerpunkt", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420580124"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-DS-x", "39-Inf-WP-DS-x", "Data Science (Schwerpunkt)", 10, "4. o. 5.", "Wahlpflicht", "-", "2", "-", "Schwerpunkt", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420581012"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-R-x", "39-Inf-WP-R-x", "Robotik (Schwerpunkt)", 10, "4. o. 5.", "Wahlpflicht", "-", "2", "-", "Schwerpunkt", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420584927"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-MTI-x", "39-Inf-WP-MTI-x", "Mensch-Technik-Interaktion (Schwerpunkt)", 10, "4. o. 5.", "Wahlpflicht", "-", "2", "-", "Schwerpunkt", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420583949"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-SE-x", "39-Inf-WP-SE-x", "Systems Engineering (Schwerpunkt)", 10, "4. o. 5.", "Wahlpflicht", "-", "2", "-", "Schwerpunkt", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420585291"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-SSC-x", "39-Inf-WP-SSC-x", "Scientific and Soft-Computing (Schwerpunkt)", 10, "4. o. 5.", "Wahlpflicht", "-", "2", "-", "Schwerpunkt", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420585432"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-IS-x", "39-Inf-WP-IS-x", "Informationssysteme (Schwerpunkt)", 10, "4. o. 5.", "Wahlpflicht", "-", "2", "-", "Schwerpunkt", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420582778"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-IG-x", "39-Inf-WP-IG-x", "Informatik & Gesellschaft (Schwerpunkt)", 10, "4. o. 5.", "Wahlpflicht", "-", "2", "-", "Schwerpunkt", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420582630"));

        // Basismodule (5 LP)
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-KI", "39-Inf-WP-KI", "Künstliche Intelligenz (Basis)", 5, "4. o. 5. o. 6.", "Wahlpflicht", "-", "1", "-", "Basis", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420725220"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-CIT", "39-Inf-WP-CIT", "Kognitive Interaktionstechnologie (Basis)", 5, "4. o. 5. o. 6.", "Wahlpflicht", "-", "1", "-", "Basis", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420724116"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-DS", "39-Inf-WP-DS", "Data Science (Basis)", 5, "4. o. 5. o. 6.", "Wahlpflicht", "-", "1", "-", "Basis", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420724449"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-R", "39-Inf-WP-R", "Robotik (Basis)", 5, "4. o. 5. o. 6.", "Wahlpflicht", "-", "1", "-", "Basis", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420725756"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-MTI", "39-Inf-WP-MTI", "Mensch-Technik-Interaktion (Basis)", 5, "4. o. 5. o. 6.", "Wahlpflicht", "-", "1", "-", "Basis", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420725516"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-SE", "39-Inf-WP-SE", "Systems Engineering (Basis)", 5, "4. o. 5. o. 6.", "Wahlpflicht", "-", "1", "-", "Basis", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420725907"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-SSC", "39-Inf-WP-SSC", "Scientific and Soft-Computing (Basis)", 5, "4. o. 5. o. 6.", "Wahlpflicht", "-", "1", "-", "Basis", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/411656238"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-IS", "39-Inf-WP-IS", "Informationssysteme (Basis)", 5, "4. o. 5. o. 6.", "Wahlpflicht", "-", "1", "-", "Basis", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420724998"));
        wahlpflichtModules.add(new CourseModule("39-Inf-WP-IG", "39-Inf-WP-IG", "Informatik & Gesellschaft (Basis)", 5, "4. o. 5. o. 6.", "Wahlpflicht", "-", "1", "-", "Basis", "Wahlpflicht", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420724818"));

        // -------------------------------------------------------------
        // 3. INDIVIDUELLE ERGÄNZUNG & MiKE (10 LP)
        // -------------------------------------------------------------
        mikeModules.add(new CourseModule("39-Inf-EGMI", "39-Inf-EGMI", "Ergänzungsmodul Informatik", 10, "1. - 6.", "MiKE", "-", "-", "2-5 uPr", "Ergänzung", "MiKE", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/50236831"));
        mikeModules.add(new CourseModule("39-Inf-MIKE", "39-Inf-MIKE", "Modularisierter individueller Kompetenz-Erwerb (MiKE)", 10, "5. o. 6.", "MiKE", "-", "-", "1", "MiKE", "MiKE", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/36794176"));

        // -------------------------------------------------------------
        // 4. STRUKTURIERTE ERGÄNZUNG (30 LP)
        // -------------------------------------------------------------
        // Schwerpunkte (10 LP)
        strukturierteErgaenzungModules.add(new CourseModule("SE-39-Inf-WP-APDC-x", "39-Inf-WP-APDC-x", "Advanced Parallel and Distributed Computing (Schwerpunkt)", 10, "4. o. 5.", "Strukturierte Ergänzung", "-", "2", "-", "Schwerpunkt", "Strukturierte Ergänzung", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420579500"));
        strukturierteErgaenzungModules.add(new CourseModule("SE-39-Inf-WP-AP-x", "39-Inf-WP-AP-x", "Algorithmen & Programmierung (Schwerpunkt)", 10, "4. o. 5.", "Strukturierte Ergänzung", "-", "2", "-", "Schwerpunkt", "Strukturierte Ergänzung", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420579931"));
        strukturierteErgaenzungModules.add(new CourseModule("SE-39-Inf-WP-CD-x", "39-Inf-WP-CD-x", "Computing Devices (Schwerpunkt)", 10, "4. o. 5.", "Strukturierte Ergänzung", "-", "2", "-", "Schwerpunkt", "Strukturierte Ergänzung", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/466165261"));
        strukturierteErgaenzungModules.add(new CourseModule("SE-39-Inf-WP-CLS-x", "39-Inf-WP-CLS-x", "Computational Life Sciences (Schwerpunkt)", 10, "4. o. 5.", "Strukturierte Ergänzung", "-", "2", "-", "Schwerpunkt", "Strukturierte Ergänzung", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420580459"));
        strukturierteErgaenzungModules.add(new CourseModule("SE-39-Inf-WP-MC-x", "39-Inf-WP-MC-x", "Media Computing (Schwerpunkt)", 10, "4. o. 5.", "Strukturierte Ergänzung", "-", "2", "-", "Schwerpunkt", "Strukturierte Ergänzung", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420583656"));
        strukturierteErgaenzungModules.add(new CourseModule("SE-39-Inf-WP-NWS-x", "39-Inf-WP-NWS-x", "Netzwerke & Sicherheit (Schwerpunkt)", 10, "4. o. 5.", "Strukturierte Ergänzung", "-", "2", "-", "Schwerpunkt", "Strukturierte Ergänzung", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420584783"));
        strukturierteErgaenzungModules.add(new CourseModule("SE-39-Inf-WP-SR-x", "39-Inf-WP-SR-x", "Signalverarbeitung & Regelungstechnik (Schwerpunkt)", 10, "4. o. 5.", "Strukturierte Ergänzung", "-", "2", "-", "Schwerpunkt", "Strukturierte Ergänzung", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420585113"));

        // Basismodule (5 LP)
        strukturierteErgaenzungModules.add(new CourseModule("SE-39-Inf-WP-AP", "39-Inf-WP-AP", "Algorithmen & Programmierung (Basis)", 5, "4. o. 5. o. 6.", "Strukturierte Ergänzung", "-", "1", "-", "Basis", "Strukturierte Ergänzung", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420723299"));
        strukturierteErgaenzungModules.add(new CourseModule("SE-39-Inf-WP-APDC", "39-Inf-WP-APDC", "Advanced Parallel and Distributed Computing (Basis)", 5, "4. o. 5. o. 6.", "Strukturierte Ergänzung", "-", "1", "-", "Basis", "Strukturierte Ergänzung", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420723962"));
        strukturierteErgaenzungModules.add(new CourseModule("SE-39-Inf-WP-CD", "39-Inf-WP-CD", "Computing Devices (Basis)", 5, "4. o. 5. o. 6.", "Strukturierte Ergänzung", "-", "1", "-", "Basis", "Strukturierte Ergänzung", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/466164359"));
        strukturierteErgaenzungModules.add(new CourseModule("SE-39-Inf-WP-CLS", "39-Inf-WP-CLS", "Computational Life Sciences (Basis)", 5, "4. o. 5. o. 6.", "Strukturierte Ergänzung", "-", "1", "-", "Basis", "Strukturierte Ergänzung", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420724298"));
        strukturierteErgaenzungModules.add(new CourseModule("SE-39-Inf-WP-MC", "39-Inf-WP-MC", "Media Computing (Basis)", 5, "4. o. 5. o. 6.", "Strukturierte Ergänzung", "-", "1", "-", "Basis", "Strukturierte Ergänzung", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420725334"));
        strukturierteErgaenzungModules.add(new CourseModule("SE-39-Inf-WP-NWS", "39-Inf-WP-NWS", "Netzwerke & Sicherheit (Basis)", 5, "4. o. 5. o. 6.", "Strukturierte Ergänzung", "-", "1", "-", "Basis", "Strukturierte Ergänzung", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420725600"));
        strukturierteErgaenzungModules.add(new CourseModule("SE-39-Inf-WP-SR", "39-Inf-WP-SR", "Signalverarbeitung & Regelungstechnik (Basis)", 5, "4. o. 5. o. 6.", "Strukturierte Ergänzung", "-", "1", "-", "Basis", "Strukturierte Ergänzung", "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420726043"));
    }

    public List<SemesterGroup> getPflichtSemesters() {
        return pflichtSemesters;
    }

    public List<CourseModule> getAllPflichtModules() {
        List<CourseModule> all = new ArrayList<>();
        for (SemesterGroup group : pflichtSemesters) {
            all.addAll(group.getModules());
        }
        return all;
    }

    public List<CourseModule> getWahlpflichtModules() {
        return wahlpflichtModules;
    }

    public List<CourseModule> getMikeModules() {
        return mikeModules;
    }

    public List<CourseModule> getStrukturierteErgaenzungModules() {
        return strukturierteErgaenzungModules;
    }

    public List<CourseModule> getAllElectiveModules() {
        List<CourseModule> all = new ArrayList<>();
        all.addAll(wahlpflichtModules);
        all.addAll(mikeModules);
        all.addAll(strukturierteErgaenzungModules);
        return all;
    }
}
