// Official Bielefeld Curriculum Dataset
// Studiengang: Künstliche Intelligenz und Kognitive Informatik (B.Sc. 1-Fach)
// Quelle: https://ekvv.uni-bielefeld.de/sinfo/publ/variante/405818172?m#405818181

// ==========================================================================
// 1. PFLICHTBEREICH (120 LP)
// ==========================================================================
const PFLICHT_SEMESTERS = [
  {
    semesterNumber: 1,
    title: "1. Fachsemester",
    targetLp: 35,
    modules: [
      {
        id: "20-NB",
        code: "20-NB",
        name: "Neuro- und Verhaltensbiologie",
        lp: 5,
        semester: "1.",
        binding: "Pflicht",
        sl: "-",
        bPr: "-",
        uPr: "1",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/26796159"
      },
      {
        id: "24-M-INF1_a",
        code: "24-M-INF1_a",
        name: "Mathematik für Informatik 1",
        lp: 10,
        semester: "1.",
        binding: "Pflicht",
        sl: "-",
        bPr: "1",
        uPr: "-",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420519984"
      },
      {
        id: "28-P-NF-B",
        code: "28-P-NF-B",
        name: "Physik für Nebenfächler",
        lp: 10,
        semester: "1.",
        binding: "Pflicht",
        sl: "2",
        bPr: "-",
        uPr: "2",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/27461321"
      },
      {
        id: "39-Inf-PP",
        code: "39-Inf-PP",
        name: "Prinzipien der Programmierung",
        lp: 10,
        semester: "1.",
        binding: "Pflicht",
        sl: "-",
        bPr: "-",
        uPr: "1",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420520482"
      }
    ]
  },
  {
    semesterNumber: 2,
    title: "2. Fachsemester",
    targetLp: 25,
    modules: [
      {
        id: "24-M-INF2_a",
        code: "24-M-INF2_a",
        name: "Mathematik für Informatik 2",
        lp: 10,
        semester: "2.",
        binding: "Pflicht",
        sl: "-",
        bPr: "1",
        uPr: "-",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420520712"
      },
      {
        id: "27-WKP",
        code: "27-WKP",
        name: "Wahrnehmungs- und Kognitionspsychologie",
        lp: 5,
        semester: "2.",
        binding: "Pflicht",
        sl: "-",
        bPr: "-",
        uPr: "1",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/26796150"
      },
      {
        id: "39-Inf-6",
        code: "39-Inf-6",
        name: "Grundlagen Theoretischer Informatik",
        lp: 5,
        semester: "2.",
        binding: "Pflicht",
        sl: "-",
        bPr: "1",
        uPr: "-",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420521085"
      },
      {
        id: "39-Inf-AD",
        code: "39-Inf-AD",
        name: "Grundlagen der Algorithmen und Datenstrukturen",
        lp: 5,
        semester: "2.",
        binding: "Pflicht",
        sl: "-",
        bPr: "1",
        uPr: "-",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420521742"
      }
    ]
  },
  {
    semesterNumber: 3,
    title: "3. Fachsemester",
    targetLp: 30,
    modules: [
      {
        id: "24-M-INF3",
        code: "24-M-INF3",
        name: "Mathematik für Informatik 3",
        lp: 5,
        semester: "3.",
        binding: "Pflicht",
        sl: "-",
        bPr: "1",
        uPr: "-",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420523059"
      },
      {
        id: "39-Inf-8_a",
        code: "39-Inf-8_a",
        name: "Rechnerarchitektur",
        lp: 5,
        semester: "3.",
        binding: "Pflicht",
        sl: "-",
        bPr: "1",
        uPr: "-",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420556013"
      },
      {
        id: "39-Inf-10_a",
        code: "39-Inf-10_a",
        name: "Datenbanken und Informationssysteme",
        lp: 5,
        semester: "3.",
        binding: "Pflicht",
        sl: "-",
        bPr: "1",
        uPr: "-",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420523238"
      },
      {
        id: "39-Inf-13_b",
        code: "39-Inf-13_b",
        name: "Grundlagen künstlicher Kognition",
        lp: 5,
        semester: "3.",
        binding: "Pflicht",
        sl: "-",
        bPr: "1",
        uPr: "-",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420742960"
      },
      {
        id: "39-Inf-SE_a",
        code: "39-Inf-SE_a",
        name: "Software Engineering",
        lp: 5,
        semester: "3.",
        binding: "Pflicht",
        sl: "-",
        bPr: "-",
        uPr: "2",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/70750995"
      },
      {
        id: "39-Inf-ML",
        code: "39-Inf-ML",
        name: "Grundlagen Maschinelles Lernen",
        lp: 5,
        semester: "3. o. 5.",
        binding: "Pflicht",
        sl: "-",
        bPr: "1",
        uPr: "-",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420564638"
      }
    ]
  },
  {
    semesterNumber: 4,
    title: "4. Fachsemester",
    targetLp: 25,
    modules: [
      {
        id: "24-M-INF4",
        code: "24-M-INF4",
        name: "Mathematik für Informatik 4",
        lp: 5,
        semester: "4.",
        binding: "Pflicht",
        sl: "-",
        bPr: "1",
        uPr: "-",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420557284"
      },
      {
        id: "39-Inf-17_b",
        code: "39-Inf-17_b",
        name: "Betriebssysteme",
        lp: 5,
        semester: "4.",
        binding: "Pflicht",
        sl: "-",
        bPr: "1",
        uPr: "-",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420557783"
      },
      {
        id: "39-Inf-18",
        code: "39-Inf-18",
        name: "Software-Gruppen-Projekt",
        lp: 5,
        semester: "4.",
        binding: "Pflicht",
        sl: "1",
        bPr: "-",
        uPr: "1",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/70750959"
      },
      {
        id: "39-Inf-GSI",
        code: "39-Inf-GSI",
        name: "Grundlagen sprachlicher Interaktion",
        lp: 5,
        semester: "4.",
        binding: "Pflicht",
        sl: "-",
        bPr: "1",
        uPr: "-",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/70750978"
      },
      {
        id: "39-Inf-NN",
        code: "39-Inf-NN",
        name: "Grundlagen Neuronaler Netze",
        lp: 5,
        semester: "4. o. 6.",
        binding: "Pflicht",
        sl: "-",
        bPr: "1",
        uPr: "-",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/695569730"
      }
    ]
  },
  {
    semesterNumber: 5,
    title: "5. Fachsemester",
    targetLp: 5,
    modules: [
      {
        id: "39-Inf-PDC",
        code: "39-Inf-PDC",
        name: "Parallel and Distributed Computing",
        lp: 5,
        semester: "5.",
        binding: "Pflicht",
        sl: "-",
        bPr: "1",
        uPr: "-",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420559953"
      }
    ]
  },
  {
    semesterNumber: 6,
    title: "6. Fachsemester",
    targetLp: 10,
    modules: [
      {
        id: "39-Inf-17-Ba_A",
        code: "39-Inf-17-Ba_A",
        name: "Bachelorarbeit",
        lp: 10,
        semester: "6.",
        binding: "Pflicht",
        sl: "-",
        bPr: "1",
        uPr: "-",
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/26787779"
      }
    ]
  }
];

// Helper to get flat list of all Pflicht modules
function getAllPflichtModules() {
  const list = [];
  PFLICHT_SEMESTERS.forEach(sem => {
    sem.modules.forEach(m => {
      list.push({ ...m, semesterNumber: sem.semesterNumber, area: "Pflicht" });
    });
  });
  return list;
}

// ==========================================================================
// 2. WAHLPFLICHTBEREICH (20 LP)
// ==========================================================================
const WAHLPFLICHT_MODULES = [
  // Schwerpunkte (10 LP, 2 benotete Prüfungen)
  { id: "39-Inf-WP-KI-x", code: "39-Inf-WP-KI-x", name: "Künstliche Intelligenz (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420582928" },
  { id: "39-Inf-WP-CIT-x", code: "39-Inf-WP-CIT-x", name: "Kognitive Interaktionstechnologie (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420580124" },
  { id: "39-Inf-WP-DS-x", code: "39-Inf-WP-DS-x", name: "Data Science (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420581012" },
  { id: "39-Inf-WP-R-x", code: "39-Inf-WP-R-x", name: "Robotik (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420584927" },
  { id: "39-Inf-WP-MTI-x", code: "39-Inf-WP-MTI-x", name: "Mensch-Technik-Interaktion (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420583949" },
  { id: "39-Inf-WP-SE-x", code: "39-Inf-WP-SE-x", name: "Systems Engineering (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420585291" },
  { id: "39-Inf-WP-SSC-x", code: "39-Inf-WP-SSC-x", name: "Scientific and Soft-Computing (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420585432" },
  { id: "39-Inf-WP-IS-x", code: "39-Inf-WP-IS-x", name: "Informationssysteme (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420582778" },
  { id: "39-Inf-WP-IG-x", code: "39-Inf-WP-IG-x", name: "Informatik & Gesellschaft (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420582630" },

  // Basismodule (5 LP, 1 benotete Prüfung)
  { id: "39-Inf-WP-KI", code: "39-Inf-WP-KI", name: "Künstliche Intelligenz (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420725220" },
  { id: "39-Inf-WP-CIT", code: "39-Inf-WP-CIT", name: "Kognitive Interaktionstechnologie (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420724116" },
  { id: "39-Inf-WP-DS", code: "39-Inf-WP-DS", name: "Data Science (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420724449" },
  { id: "39-Inf-WP-R", code: "39-Inf-WP-R", name: "Robotik (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420725756" },
  { id: "39-Inf-WP-MTI", code: "39-Inf-WP-MTI", name: "Mensch-Technik-Interaktion (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420725516" },
  { id: "39-Inf-WP-SE", code: "39-Inf-WP-SE", name: "Systems Engineering (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420725907" },
  { id: "39-Inf-WP-SSC", code: "39-Inf-WP-SSC", name: "Scientific and Soft-Computing (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/411656238" },
  { id: "39-Inf-WP-IS", code: "39-Inf-WP-IS", name: "Informationssysteme (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420724998" },
  { id: "39-Inf-WP-IG", code: "39-Inf-WP-IG", name: "Informatik & Gesellschaft (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Wahlpflicht", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420724818" }
];

// ==========================================================================
// 3. INDIVIDUELLE ERGÄNZUNG & MiKE (10 LP)
// ==========================================================================
const MIKE_MODULES = [
  { id: "39-Inf-EGMI", code: "39-Inf-EGMI", name: "Ergänzungsmodul Informatik", lp: 10, type: "Ergänzung", semester: "1. - 6.", bPr: "-", uPr: "2-5 uPr", sl: "-", area: "MiKE", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/50236831" },
  { id: "39-Inf-MIKE", code: "39-Inf-MIKE", name: "Modularisierter individueller Kompetenz-Erwerb (MiKE)", lp: 10, type: "MiKE", semester: "5. o. 6.", bPr: "-", uPr: "1", sl: "-", area: "MiKE", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/36794176" }
];

// ==========================================================================
// 4. STRUKTURIERTE ERGÄNZUNG (30 LP)
// ==========================================================================
const STRUKTURIERTE_ERGAENZUNG_MODULES = [
  // Schwerpunkte (10 LP)
  { id: "SE-39-Inf-WP-APDC-x", code: "39-Inf-WP-APDC-x", name: "Advanced Parallel and Distributed Computing (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Strukturierte Ergänzung", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420579500" },
  { id: "SE-39-Inf-WP-AP-x", code: "39-Inf-WP-AP-x", name: "Algorithmen & Programmierung (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Strukturierte Ergänzung", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420579931" },
  { id: "SE-39-Inf-WP-CD-x", code: "39-Inf-WP-CD-x", name: "Computing Devices (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Strukturierte Ergänzung", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/466165261" },
  { id: "SE-39-Inf-WP-CLS-x", code: "39-Inf-WP-CLS-x", name: "Computational Life Sciences (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Strukturierte Ergänzung", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420580459" },
  { id: "SE-39-Inf-WP-MC-x", code: "39-Inf-WP-MC-x", name: "Media Computing (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Strukturierte Ergänzung", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420583656" },
  { id: "SE-39-Inf-WP-NWS-x", code: "39-Inf-WP-NWS-x", name: "Netzwerke & Sicherheit (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Strukturierte Ergänzung", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420584783" },
  { id: "SE-39-Inf-WP-SR-x", code: "39-Inf-WP-SR-x", name: "Signalverarbeitung & Regelungstechnik (Schwerpunkt)", lp: 10, type: "Schwerpunkt", semester: "4. o. 5.", bPr: "2", uPr: "-", sl: "-", area: "Strukturierte Ergänzung", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420585113" },

  // Basismodule (5 LP)
  { id: "SE-39-Inf-WP-AP", code: "39-Inf-WP-AP", name: "Algorithmen & Programmierung (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Strukturierte Ergänzung", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420723299" },
  { id: "SE-39-Inf-WP-APDC", code: "39-Inf-WP-APDC", name: "Advanced Parallel and Distributed Computing (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Strukturierte Ergänzung", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420723962" },
  { id: "SE-39-Inf-WP-CD", code: "39-Inf-WP-CD", name: "Computing Devices (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Strukturierte Ergänzung", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/466164359" },
  { id: "SE-39-Inf-WP-CLS", code: "39-Inf-WP-CLS", name: "Computational Life Sciences (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Strukturierte Ergänzung", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420724298" },
  { id: "SE-39-Inf-WP-MC", code: "39-Inf-WP-MC", name: "Media Computing (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Strukturierte Ergänzung", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420725334" },
  { id: "SE-39-Inf-WP-NWS", code: "39-Inf-WP-NWS", name: "Netzwerke & Sicherheit (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Strukturierte Ergänzung", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420725600" },
  { id: "SE-39-Inf-WP-SR", code: "39-Inf-WP-SR", name: "Signalverarbeitung & Regelungstechnik (Basis)", lp: 5, type: "Basis", semester: "4. o. 5. o. 6.", bPr: "1", uPr: "-", sl: "-", area: "Strukturierte Ergänzung", link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420726043" }
];

// Helper to get ALL elective modules list for assignment dropdowns
function getAllElectiveModules() {
  return [
    ...WAHLPFLICHT_MODULES,
    ...MIKE_MODULES,
    ...STRUKTURIERTE_ERGAENZUNG_MODULES
  ];
}
