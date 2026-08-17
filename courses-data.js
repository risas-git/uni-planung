// Official Bielefeld Curriculum Dataset (Pflichtbereich)
// Studiengang: Künstliche Intelligenz und Kognitive Informatik (B.Sc. 1-Fach)
// Quelle: https://ekvv.uni-bielefeld.de/sinfo/publ/variante/405818172?m#405818181

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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/26796159",
        description: "Neurobiologische Grundlagen, Sinnesphysiologie und verhaltensbiologische Mechanismen kognitiver Systeme."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420519984",
        description: "Diskrete Mathematik und Lineare Algebra für Informatiker: Mengen, Relationen, Vektorräume, Matrizen."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/27461321",
        description: "Grundlagen der Experimentalphysik (Mechanik, Wärmelehre, Elektrodynamik, Optik) inklusive Praktikum."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420520482",
        description: "Imperative und objektorientierte Programmierung, Kontrollstrukturen, Rekursion und Algorithmenentwurf."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420520712",
        description: "Analysis für Informatiker: Folgen, Reihen, Differential- und Integralrechnung in mehreren Dimensionen."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/26796150",
        description: "Kognitionspsychologische Modelle zu visueller Wahrnehmung, Aufmerksamkeit, Gedächtnis und Denkprozessen."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420521085",
        description: "Formale Sprachen, Grammatiken, endliche Automaten, Berechenbarkeit und Komplexitätstheorie."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420521742",
        description: "Bäume, Heaps, Hashing, Graphenalgorithmen, Sortierverfahren und Komplexitätsanalyse."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420523059",
        description: "Wahrscheinlichkeitsrechnung, Stochastik und mathematische Statistik für Datenanalyse & KI."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420556013",
        description: "Von-Neumann-Architektur, Prozessorentwurf, Befehlssätze, Pipelining, Caches und Speicherhierarchien."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420523238",
        description: "Relationales Datenmodell, SQL, Normalformen, Transaktionsverwaltung und moderne Datenbanktechnologien."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420742960",
        description: "Kognitive Architekturen, symbolische Wissensrepräsentation, Handlungsplanung und Modellierung kognitiver Agenten."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/70750995",
        description: "Vorgehensmodelle, Entwurfsmuster (Design Patterns), Softwarearchitektur, Testen und Versionskontrolle."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420564638",
        description: "Überwachtes und unüberwachtes Lernen, Lineare Modelle, Decision Trees, Support Vector Machines und Validierung."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420557284",
        description: "Numerische Mathematik, Optimierungsverfahren, Matrixzerlegungen und Näherungsverfahren."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420557783",
        description: "Prozessverwaltung, Threads, Interprozesskommunikation, Speicherverwaltung, Dateisysteme und Virtualisierung."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/70750959",
        description: "Praxisprojekt in Teams: Konzeption, Implementierung und Präsentation eines Softwaresystems mit agilen Methoden."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/70750978",
        description: "Computerlinguistik, Natural Language Processing (NLP), Dialogmodelle und sprachbasierte Mensch-Technik-Interaktion."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/695569730",
        description: "Deep Learning Grundlagen: Perzeptronen, Multilayer-Netze, Backpropagation, CNNs und Rekurrente Netze."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/420559953",
        description: "Parallele Programmierung (OpenMP, MPI), verteilte Systeme, Synchronisation und Cloud Computing."
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
        link: "https://ekvv.uni-bielefeld.de/sinfo/publ/modul/26787779",
        description: "Wissenschaftliche Bachelorarbeit mit schriftlicher Ausarbeitung und Präsentation."
      }
    ]
  }
];

// Helper to get flat list of all Pflicht modules
function getAllPflichtModules() {
  const list = [];
  PFLICHT_SEMESTERS.forEach(sem => {
    sem.modules.forEach(m => {
      list.push({ ...m, semesterNumber: sem.semesterNumber });
    });
  });
  return list;
}
