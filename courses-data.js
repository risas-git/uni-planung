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

function getAllPflichtModules() {
  const list = [];
  PFLICHT_SEMESTERS.forEach(sem => {
    sem.modules.forEach(m => {
      list.push({ ...m, semesterNumber: sem.semesterNumber });
    });
  });
  return list;
}
