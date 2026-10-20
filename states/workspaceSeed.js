/*
 * Example data so every screen opens in a realistic state. Names, IDs and
 * answers are illustrations, not real students. Sample scripts carry typed
 * answer text instead of photos so the marking room has something to show.
 */

const stamp = (daysAgo, hour = 9) => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hour, 0, 0, 0)
  return d.toISOString()
}

const student = (id, name, i) => ({
  id,
  name,
  ids: { camis: `0412${String(100 + i)}`, urubuto: `URB-${5500 + i}`, regNo: '' },
})

const roster = (prefix, names) => names.map((name, i) => student(`${prefix}-${String(i + 1).padStart(2, '0')}`, name, i))

export const seedClasses = [
  {
    id: 'cls-s3-blue',
    name: 'S3 Blue',
    level: 'O-Level',
    under16: true,
    consent: { recordedOn: stamp(40), recordedBy: 'Head teacher', basis: 'Written notice to parents, sent home with term reports' },
    students: roster('s3b', [
      'Mugisha Eric', 'Uwase Diane', 'Habimana Jean', 'Keza Aline', 'Niyonzima Patrick', 'Iradukunda Grace',
      'Uwimana Claudine', 'Nshimiyimana Olivier', 'Ishimwe Sandrine', 'Hakizimana David', 'Mukamana Josiane', 'Byiringiro Kevin',
    ]),
  },
  {
    id: 'cls-s4-green',
    name: 'S4 Green',
    level: 'O-Level',
    under16: false,
    consent: null,
    students: roster('s4g', [
      'Ndayisaba Fabrice', 'Umutoni Ange', 'Tuyishime Samuel', 'Ingabire Clarisse', 'Mutabazi Yves',
      'Uwamahoro Esther', 'Nkurunziza Pacifique', 'Mukeshimana Alice', 'Rukundo Emmanuel', 'Igiraneza Belyse',
    ]),
  },
  {
    id: 'cls-s2-red',
    name: 'S2 Red',
    level: 'O-Level',
    under16: true,
    consent: null,
    students: roster('s2r', [
      'Cyusa Thierry', 'Uwera Nadine', 'Shema Elie', 'Mutoni Ariane', 'Kwizera Gad', 'Isimbi Chantal', 'Ganza Prince', 'Teta Divine', 'Manzi Aimable',
    ]),
  },
]

const q = (id, number, title, marks, type, modelAnswer, points) => ({ id, number, title, marks, type, modelAnswer, points })

const bioV1 = [
  q('bio-1', 1, 'Label the parts of an animal cell', 8, 'structured', 'Nucleus, cell membrane, cytoplasm, mitochondrion, ribosome, vacuole, nucleolus, endoplasmic reticulum.', ['One mark per correct label, up to 8']),
  q('bio-2', 2, 'Give two functions of mitochondria', 6, 'short', 'Release energy through aerobic respiration; produce ATP for cell activities.', ['Aerobic respiration (2)', 'Releases energy / makes ATP (2)', 'Energy used for cell activities (2)']),
  q('bio-3', 3, 'Explain the difference between diffusion and osmosis', 6, 'short', 'Diffusion is movement of particles from high to low concentration; osmosis is movement of water through a partially permeable membrane from dilute to concentrated solution.', ['Diffusion: any particles (2)', 'Osmosis: water only (2)', 'Osmosis needs a partially permeable membrane (2)']),
  q('bio-4', 4, 'A red blood cell is placed in distilled water. Explain what happens.', 6, 'short', 'Water enters by osmosis through the partially permeable membrane because the cytoplasm is more concentrated. The cell swells and bursts (haemolysis) because animal cells have no cell wall.', ['Cell swells and bursts', 'Water enters by osmosis', 'Partially permeable membrane', 'No cell wall', 'Water moves from dilute to concentrated', 'Names haemolysis']),
]
const bioV2 = [
  ...bioV1,
  q('bio-5', 5, 'Draw and label a plant cell', 8, 'diagram', 'Cell wall, cell membrane, chloroplast, large vacuole, nucleus, cytoplasm. Clear labelled drawing.', ['Drawing marked by hand']),
  q('bio-6', 6, 'Describe an experiment to show osmosis in potato tissue', 6, 'essay', 'Potato strips in solutions of different concentration; measure length or mass before and after; strips in water gain mass, in strong salt lose mass.', ['Method with different solutions (2)', 'Measure before and after (2)', 'Correct expected results (2)']),
]

export const seedRubrics = [
  {
    id: 'rub-s3-bio',
    name: 'S3 Biology · Term 1',
    level: 'O-Level',
    versions: [
      { version: 1, savedAt: stamp(120), questions: bioV1 },
      { version: 2, savedAt: stamp(20), questions: bioV2 },
    ],
  },
  {
    id: 'rub-s4-chem',
    name: 'S4 Chemistry · Test 2',
    level: 'O-Level',
    versions: [
      {
        version: 1,
        savedAt: stamp(15),
        questions: [
          q('chem-1', 1, 'Balance the equation for burning methane', 4, 'calculation', 'CH4 + 2O2 → CO2 + 2H2O', ['Correct formulae (2)', 'Balanced (2)']),
          q('chem-2', 2, 'Calculate the moles in 22 g of CO2', 4, 'calculation', '22 ÷ 44 = 0.5 mol', ['Molar mass 44 (2)', 'Answer 0.5 mol (2)']),
          q('chem-3', 3, 'Why is copper used for electrical wiring?', 4, 'short', 'Good conductor of electricity; ductile; does not corrode easily.', ['Good conductor (2)', 'Ductile or unreactive (2)']),
          q('chem-4', 4, 'Describe a test for hydrogen gas', 4, 'short', 'Burning splint gives a squeaky pop.', ['Burning or lit splint (2)', 'Squeaky pop (2)']),
        ],
      },
    ],
  },
  {
    id: 'rub-s2-eng',
    name: 'S2 English · Essay',
    level: 'O-Level',
    versions: [
      {
        version: 1,
        savedAt: stamp(30),
        questions: [
          q('eng-1', 1, 'Content and organisation', 15, 'essay', 'Clear introduction, developed paragraphs with examples, conclusion.', ['Introduction (3)', 'Developed points with examples (9)', 'Conclusion (3)']),
          q('eng-2', 2, 'Language and accuracy', 10, 'essay', 'Correct grammar, varied vocabulary, accurate spelling and punctuation.', ['Grammar (4)', 'Vocabulary (3)', 'Spelling and punctuation (3)']),
        ],
      },
    ],
  },
]

// Typed answers for the sample scripts, a few variants per question.
const answers = {
  'bio-1': ['Nucleus, cell membrane, cytoplasm, mitochondria, ribosome, vacuole.', 'Nucleus, membrane, cytoplasm, mitochondrion, ribosomes, nucleolus, ER, vacuole.', 'Nucleus, cell wall, cytoplasm, chloroplast.'],
  'bio-2': ['Mitochondria do respiration and give energy to the cell.', 'They release energy by aerobic respiration and make ATP.', 'Mitochondria store food for the cell.'],
  'bio-3': ['Diffusion is movement from high to low concentration. Osmosis is the same but for water.', 'Osmosis is water moving through a partially permeable membrane from dilute to concentrated. Diffusion is any particles from high to low.', 'Diffusion is fast, osmosis is slow.'],
  'bio-4': ['The cell will swell up and burst because water moves into it by osmosis through the partially permeable membrane. Animal cells have no cell wall to stop them bursting.', 'Water goes in and the cell bursts. This is called haemolysis.', 'The cell shrinks because water leaves it.'],
  'bio-5': ['[Labelled drawing: cell wall, membrane, chloroplasts, vacuole, nucleus]', '[Drawing of a plant cell, labels: nucleus, wall, cytoplasm]', '[Drawing with no labels]'],
  'bio-6': ['Cut potato strips the same size. Put them in water and in salt solutions. Weigh before and after 30 minutes. In water they get heavier, in strong salt lighter.', 'Put potato in salt water and it becomes soft.', 'Use potato and water and measure.'],
  'chem-1': ['CH4 + 2O2 → CO2 + 2H2O', 'CH4 + O2 → CO2 + H2O', 'CH4 + 2O2 → CO2 + 2H2O'],
  'chem-2': ['Mr of CO2 = 44, so 22/44 = 0.5 mol', '22 × 44 = 968 mol', 'n = m/M = 22/44 = 0.5'],
  'chem-3': ['Copper conducts electricity well and can be drawn into wires.', 'Because it is cheap.', 'It is a good conductor.'],
  'chem-4': ['Put a lit splint, it makes a squeaky pop.', 'It relights a glowing splint.', 'Squeaky pop with a burning splint.'],
  'eng-1': ['My essay explains why reading matters, with three paragraphs and examples from school life, then a conclusion.', 'Reading is good. I like reading. The end.', 'An introduction, two body paragraphs about technology in Rwanda, and a short conclusion.'],
  'eng-2': ['Mostly accurate grammar with a few spelling mistakes.', 'Many grammar errors and repeated words.', 'Good vocabulary and correct punctuation.'],
}

function sampleScripts(cls, questions, pages, takeCount) {
  const scripts = {}
  const sample = {}
  cls.students.slice(0, takeCount).forEach((s, i) => {
    scripts[s.id] = { status: 'collected', pages: Array.from({ length: pages }, (_, p) => ({ page: p + 1, kind: 'sample' })) }
    sample[s.id] = Object.fromEntries(questions.map((question) => [question.id, answers[question.id][i % answers[question.id].length]]))
  })
  return { scripts, sample }
}

function marksFor(cls, questions, questionCount, partial = 0) {
  const marks = {}
  cls.students.forEach((s, i) => {
    marks[s.id] = {}
    questions.slice(0, questionCount).forEach((question, qi) => {
      marks[s.id][question.id] = Math.max(0, question.marks - ((i + qi) % 4))
    })
    if (partial && i < partial) {
      const next = questions[questionCount]
      if (next) marks[s.id][next.id] = Math.max(0, next.marks - (i % 3))
    }
  })
  return marks
}

const [s3, s4, s2] = seedClasses
const bioCollected = sampleScripts(s3, bioV2, 4, s3.students.length)
const chemQuestions = seedRubrics[1].versions[0].questions
const chemCollected = sampleScripts(s4, chemQuestions, 3, 7)
const engQuestions = seedRubrics[2].versions[0].questions
const engCollected = sampleScripts(s2, engQuestions, 3, s2.students.length)

export const seedExams = [
  {
    id: 'exm-s4-chem-t2',
    title: 'S4 Chemistry · Test 2',
    classId: s4.id,
    rubricId: 'rub-s4-chem',
    rubricVersion: 1,
    pagesPerScript: 3,
    createdAt: stamp(6),
    sheetsPrintedAt: stamp(5),
    scripts: chemCollected.scripts,
    sample: chemCollected.sample,
    unassigned: [],
    marks: {},
    releasedAt: null,
  },
  {
    id: 'exm-s3-bio-t1',
    title: 'S3 Biology · End of term',
    classId: s3.id,
    rubricId: 'rub-s3-bio',
    rubricVersion: 2,
    pagesPerScript: 4,
    createdAt: stamp(9),
    sheetsPrintedAt: stamp(8),
    scripts: bioCollected.scripts,
    sample: bioCollected.sample,
    unassigned: [],
    marks: marksFor(s3, bioV2, 2, 5),
    releasedAt: null,
  },
  {
    id: 'exm-s2-eng-essay',
    title: 'S2 English · Essay',
    classId: s2.id,
    rubricId: 'rub-s2-eng',
    rubricVersion: 1,
    pagesPerScript: 3,
    createdAt: stamp(14),
    sheetsPrintedAt: stamp(13),
    scripts: engCollected.scripts,
    sample: engCollected.sample,
    unassigned: [],
    marks: marksFor(s2, engQuestions, 2),
    releasedAt: null,
  },
]

export const seedLog = [
  { id: 'log-1', at: stamp(8), examId: 'exm-s3-bio-t1', action: 'Header sheets printed', detail: '12 students · 4 pages each' },
  { id: 'log-2', at: stamp(5), examId: 'exm-s4-chem-t2', action: 'Header sheets printed', detail: '10 students · 3 pages each' },
]
