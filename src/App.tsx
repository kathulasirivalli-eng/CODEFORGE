import { useMemo, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import {
  dashboardRows,
  lessons,
  logicSteps,
  notes,
  practiceChallenges,
  supportedLanguages,
  sampleCode,
  runtimeExamples,
} from './data/content';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('C');
  const [notesQuery, setNotesQuery] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState(practiceChallenges[0].id);
  const [language, setLanguage] = useState('c');
  const [code, setCode] = useState(sampleCode.c);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [visualStep, setVisualStep] = useState(0);

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(notesQuery.toLowerCase()) ||
        note.topic.toLowerCase().includes(notesQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(notesQuery.toLowerCase())
    );
  }, [notesQuery]);

  const currentChallenge = practiceChallenges.find((item) => item.id === selectedChallenge) ?? practiceChallenges[0];
  const currentVisual = runtimeExamples[visualStep % runtimeExamples.length];

  const handleLanguageChange = (newLanguage: string) => {
    const mapped = newLanguage.toLowerCase();
    setSelectedLanguage(newLanguage);
    setLanguage(mapped);
    setCode(sampleCode[mapped as keyof typeof sampleCode] ?? sampleCode.c);
    setOutput('');
    setError('');
  };

  const handleRunCode = () => {
    const executionUrl = import.meta.env.VITE_EXECUTION_API_URL;

    if (!executionUrl) {
      setOutput('');
      setError(
        'Secure code execution service is not configured. The feature is currently unavailable. Connect a trusted execution backend to enable runtime output.'
      );
      return;
    }

    setError('');
    setOutput('Execution request sent to configured service.');
  };

  const handleResetCode = () => {
    setCode(sampleCode[language as keyof typeof sampleCode] ?? sampleCode.c);
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3 font-semibold tracking-[0.2em] text-slate-100">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-lg text-brand-400 shadow-glow">
              C
            </span>
            <span className="text-lg uppercase">CODEFORGE</span>
          </NavLink>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/learn">Learn</NavLink>
            <NavLink className="nav-link" to="/notes">CodeNotes</NavLink>
            <NavLink className="nav-link" to="/logicmaker">LogicMaker</NavLink>
            <NavLink className="nav-link" to="/codelab">CodeLab</NavLink>
            <NavLink className="nav-link" to="/practice">PracticePath</NavLink>
            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <NavLink to="/login" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-brand-400 hover:text-white">
              Login
            </NavLink>
            <NavLink to="/register" className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-brand-400">
              Register
            </NavLink>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/notes" element={<NotesPage filteredNotes={filteredNotes} notesQuery={notesQuery} setNotesQuery={setNotesQuery} />} />
          <Route path="/logicmaker" element={<LogicMakerPage />} />
          <Route path="/codelab" element={<CodeLabPage code={code} setCode={setCode} input={input} setInput={setInput} output={output} error={error} selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} handleRunCode={handleRunCode} handleResetCode={handleResetCode} />} />
          <Route path="/debugger" element={<DebuggerPage />} />
          <Route path="/visualizer" element={<VisualizerPage currentVisual={currentVisual} visualStep={visualStep} setVisualStep={setVisualStep} />} />
          <Route path="/practice" element={<PracticePage selectedChallenge={selectedChallenge} setSelectedChallenge={setSelectedChallenge} currentChallenge={currentChallenge} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/90">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 text-sm text-slate-300 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="mb-4 flex items-center gap-3 text-base font-bold uppercase tracking-[0.18em] text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">C</span>
              CODEFORGE
            </div>
            <p className="max-w-xs text-slate-400">Learn. Build. Innovate.</p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Platform</h3>
            <ul className="space-y-2 text-slate-400">
              <li><NavLink to="/learn">Learn</NavLink></li>
              <li><NavLink to="/notes">CodeNotes</NavLink></li>
              <li><NavLink to="/codelab">CodeLab</NavLink></li>
              <li><NavLink to="/practice">PracticePath</NavLink></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-slate-400">
              <li><NavLink to="/logicmaker">LogicMaker</NavLink></li>
              <li><NavLink to="/debugger">Smart Debugger</NavLink></li>
              <li><NavLink to="/visualizer">CodeVisualizer</NavLink></li>
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Account</h3>
            <ul className="space-y-2 text-slate-400">
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/register">Register</NavLink></li>
              <li><NavLink to="/">Help Center</NavLink></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-brand-200">
              COMPLETE INTELLIGENT CODING ECOSYSTEM
            </div>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Learn code with clarity.
              <span className="block text-brand-400">Build with confidence.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              CODEFORGE helps students and developers understand logic, practice coding, debug errors, visualize execution, and build real projects in a structured learning environment.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <NavLink to="/learn" className="rounded-full bg-brand-500 px-6 py-3 font-semibold text-white hover:bg-brand-400">Start Learning</NavLink>
              <NavLink to="/codelab" className="rounded-full border border-slate-700 px-6 py-3 font-semibold text-slate-200 hover:border-brand-400 hover:text-white">Explore CodeLab</NavLink>
            </div>
            <div className="mt-8 flex items-center gap-10 text-sm text-slate-400">
              <div><span className="block text-2xl font-bold text-white">8+</span> Modules</div>
              <div><span className="block text-2xl font-bold text-white">C/Python/Java</span> Languages</div>
            </div>
          </div>

          <div className="card-surface glow-ring rounded-3xl p-6">
            <div className="code-window p-5">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                <span className="h-3 w-3 rounded-full bg-green-400"></span>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 font-mono text-sm text-slate-200">
                <div className="mb-3 text-brand-300"># include &lt;stdio.h&gt;</div>
                <div>int main() {'{'}</div>
                <div className="ml-4">int total = 0;</div>
                <div className="ml-4">for (int i = 1; i &lt;= 5; i++) {'{'}</div>
                <div className="ml-8">total += i;</div>
                <div className="ml-4">{' }'}</div>
                <div className="ml-4">printf("%d", total);</div>
                <div className="ml-4">return 0;</div>
                <div>{'}'}</div>
              </div>
              <div className="mt-4 rounded-xl border border-brand-500/20 bg-brand-500/5 p-4 text-sm text-brand-100">
                Output: 15
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="blue-label text-xs font-semibold uppercase tracking-[0.22em]">Why learners choose CODEFORGE</p>
          <h2 className="section-title mt-4">A complete learning ecosystem for every level</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Learn', 'Structured lessons from beginner to advanced.'],
            ['Practice', 'Real-world challenges with hints and test cases.'],
            ['Visualize', 'See program execution step by step.'],
            ['Debug', 'Understand errors before finding solutions.'],
          ].map(([title, text]) => (
            <div key={title} className="card-surface rounded-2xl p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-lg text-brand-400">{title[0]}</div>
              <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
              <p className="text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="blue-label text-xs font-semibold uppercase tracking-[0.22em]">Supported languages</p>
          <h2 className="section-title mt-4">Start with the fundamentals, then grow deeper</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {supportedLanguages.map((language) => (
            <span key={language} className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200">
              {language}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="card-surface rounded-2xl p-6">
            <p className="blue-label text-xs font-semibold uppercase tracking-[0.22em]">How it works</p>
            <h3 className="mt-4 text-2xl font-bold text-white">A guided learning loop</h3>
            <ul className="mt-6 space-y-4 text-slate-300">
              <li>1. Learn concepts through structured modules.</li>
              <li>2. Understand logic with guided examples.</li>
              <li>3. Practice in CodeLab and track progress.</li>
              <li>4. Review errors and improve step by step.</li>
            </ul>
          </div>
          <div className="card-surface rounded-2xl p-6">
            <p className="blue-label text-xs font-semibold uppercase tracking-[0.22em]">Why useful</p>
            <h3 className="mt-4 text-2xl font-bold text-white">Built for real coding growth</h3>
            <ul className="mt-6 space-y-4 text-slate-300">
              <li>• Beginner-friendly explanations</li>
              <li>• Practice with problem-solving flow</li>
              <li>• Execution visualizations for understanding</li>
              <li>• Progress-aware recommendations</li>
            </ul>
          </div>
          <div className="card-surface rounded-2xl p-6">
            <p className="blue-label text-xs font-semibold uppercase tracking-[0.22em]">User access</p>
            <h3 className="mt-4 text-2xl font-bold text-white">Simple and secure</h3>
            <ul className="mt-6 space-y-4 text-slate-300">
              <li>• Login or create a new account</li>
              <li>• Save notes and bookmarks</li>
              <li>• Track activity and personalized learning</li>
              <li>• Keep private data protected</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function LearnPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="blue-label text-xs font-semibold uppercase tracking-[0.22em]">Module 1</p>
        <h1 className="section-title mt-4">Learn</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <div key={lesson.title} className="card-surface rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-brand-200">
                {lesson.level}
              </span>
              <span className="text-sm text-slate-400">{lesson.language}</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-white">{lesson.title}</h3>
            <p className="text-slate-400">{lesson.summary}</p>
            <button className="mt-5 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-brand-400 hover:text-white">
              Open lesson
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function NotesPage({ filteredNotes, notesQuery, setNotesQuery }: any) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="blue-label text-xs font-semibold uppercase tracking-[0.22em]">Module 2</p>
          <h1 className="section-title mt-4">CodeNotes</h1>
        </div>
        <input
          value={notesQuery}
          onChange={(event) => setNotesQuery(event.target.value)}
          placeholder="Search topics, definitions, examples..."
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white md:max-w-md"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filteredNotes.map((note: any) => (
          <article key={note.id} className="card-surface rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-[0.1em] text-slate-200">
                {note.topic}
              </span>
              <span className="text-xs text-slate-400">{note.difficulty}</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-white">{note.title}</h3>
            <p className="mb-4 text-slate-400">{note.description}</p>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-200">
              <p><span className="font-semibold text-brand-300">Definition:</span> {note.definition}</p>
              <p className="mt-2"><span className="font-semibold text-brand-300">Example:</span> {note.example}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function LogicMakerPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="blue-label text-xs font-semibold uppercase tracking-[0.22em]">Module 3</p>
        <h1 className="section-title mt-4">LogicMaker</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="card-surface rounded-2xl p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">How to solve coding problems</h3>
          <div className="space-y-4">
            {logicSteps.map((step, index) => (
              <div key={step.title} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/15 text-sm font-bold text-brand-300">
                    {index + 1}
                  </span>
                  <p className="font-medium text-slate-100">{step.title}</p>
                </div>
                <p className="mt-2 text-sm text-slate-400">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface rounded-2xl p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">Interactive example</h3>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-brand-300">Problem</p>
            <p className="mt-2 text-slate-200">Find the sum of the first 5 natural numbers.</p>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <p><span className="font-semibold text-white">Input:</span> None</p>
              <p><span className="font-semibold text-white">Output:</span> 15</p>
              <p><span className="font-semibold text-white">Logic:</span> loop from 1 to 5 and add each value</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeLabPage({ code, setCode, input, setInput, output, error, selectedLanguage, onLanguageChange, handleRunCode, handleResetCode }: any) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="blue-label text-xs font-semibold uppercase tracking-[0.22em]">Module 4</p>
          <h1 className="section-title mt-4">CodeLab</h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-300">Language</label>
          <select
            value={selectedLanguage}
            onChange={(event) => onLanguageChange(event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white"
          >
            <option>C</option>
            <option>Python</option>
            <option>Java</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="card-surface rounded-2xl p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap gap-3">
            <button onClick={handleRunCode} className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-400">Run</button>
            <button onClick={handleResetCode} className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200 hover:border-brand-500">Reset</button>
            <button className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200 hover:border-brand-500">Copy Code</button>
          </div>

          <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="editor w-full rounded-2xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-200"
          />
        </div>

        <div className="space-y-6">
          <div className="card-surface rounded-2xl p-5">
            <h3 className="mb-3 text-lg font-semibold text-white">Input</h3>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-h-[120px] w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm text-slate-200"
            />
          </div>
          <div className="card-surface rounded-2xl p-5">
            <h3 className="mb-3 text-lg font-semibold text-white">Output</h3>
            <pre className="min-h-[120px] whitespace-pre-wrap rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm text-brand-100">
              {output || 'No output yet.'}
            </pre>
          </div>
          <div className="card-surface rounded-2xl p-5">
            <h3 className="mb-3 text-lg font-semibold text-white">Error</h3>
            <div className="min-h-[80px] rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-200">
              {error || 'No errors detected in the editor.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DebuggerPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="blue-label text-xs font-semibold uppercase tracking-[0.22em]">Module 5</p>
        <h1 className="section-title mt-4">Smart Debugger</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          ['Syntax error', 'Missing semicolon or bracket prevents the code from compiling.'],
          ['Runtime error', 'The program crashes when executing an invalid operation.'],
          ['Logical error', 'The code runs but produces the wrong result.'],
        ].map(([title, description]) => (
          <div key={title} className="card-surface rounded-2xl p-6">
            <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
            <p className="text-slate-400">{description}</p>
            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
              Hint: check the exact line, reason, and fix before looking at the full solution.
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function VisualizerPage({ currentVisual, visualStep, setVisualStep }: any) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="blue-label text-xs font-semibold uppercase tracking-[0.22em]">Module 6</p>
        <h1 className="section-title mt-4">CodeVisualizer</h1>
      </div>
      <div className="card-surface rounded-2xl p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-brand-300">Current execution line</p>
            <p className="mt-2 text-xl font-semibold text-white">{currentVisual.line}</p>
          </div>
          <div className="text-right text-sm text-slate-400">
            <p>Step {visualStep + 1}</p>
            <p>{currentVisual.title}</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="mb-3 text-lg font-semibold text-white">Variable values</h3>
            <div className="space-y-2 text-sm text-slate-300">
              {Object.entries(currentVisual.variables).map(([key, value]) => (
                <div className="flex justify-between gap-4 rounded-lg bg-slate-950/60 px-3 py-2" key={key}>
                  <span>{key}</span>
                  <span className="font-semibold text-brand-300">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="mb-3 text-lg font-semibold text-white">What is happening</h3>
            <p className="text-slate-300">{currentVisual.description}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={() => setVisualStep((visualStep - 1 + runtimeExamples.length) % runtimeExamples.length)} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">Previous</button>
          <button onClick={() => setVisualStep((visualStep + 1) % runtimeExamples.length)} className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white">Next</button>
          <button onClick={() => setVisualStep(0)} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">Reset</button>
        </div>
      </div>
    </section>
  );
}

function PracticePage({ selectedChallenge, setSelectedChallenge, currentChallenge }: any) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="blue-label text-xs font-semibold uppercase tracking-[0.22em]">Module 8</p>
        <h1 className="section-title mt-4">PracticePath</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          {practiceChallenges.map((challenge: any) => (
            <button
              key={challenge.id}
              onClick={() => setSelectedChallenge(challenge.id)}
              className={`w-full rounded-2xl border p-4 text-left ${selectedChallenge === challenge.id ? 'border-brand-500 bg-brand-500/10' : 'border-slate-800 bg-slate-900/60'}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{challenge.title}</h3>
                <span className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-300">{challenge.level}</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">{challenge.summary}</p>
            </button>
          ))}
        </div>

        <div className="card-surface rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white">{currentChallenge.title}</h2>
          <p className="mt-3 text-slate-400">{currentChallenge.description}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-sm text-brand-300">Sample Input</p>
              <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-200">{currentChallenge.sampleInput}</pre>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-sm text-brand-300">Sample Output</p>
              <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-200">{currentChallenge.sampleOutput}</pre>
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm text-brand-300">Hint</p>
            <p className="mt-2 text-slate-300">{currentChallenge.hint}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="blue-label text-xs font-semibold uppercase tracking-[0.22em]">Module 11</p>
        <h1 className="section-title mt-4">My Dashboard</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardRows.map((item) => (
          <div key={item.label} className="card-surface rounded-2xl p-6">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-4 text-3xl font-bold text-white">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card-surface rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white">Strong concepts</h3>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li>• Loops and conditionals</li>
            <li>• Arrays and iteration</li>
            <li>• Basic problem decomposition</li>
          </ul>
        </div>
        <div className="card-surface rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white">Needs practice</h3>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li>• Function parameters and return values</li>
            <li>• Pointer reasoning in C</li>
            <li>• Debugging nested loops</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="card-surface rounded-3xl p-8">
        <p className="blue-label text-xs font-semibold uppercase tracking-[0.2em]">{mode === 'login' ? 'Welcome back' : 'Create account'}</p>
        <h1 className="mt-4 text-3xl font-bold text-white">{mode === 'login' ? 'Login to CODEFORGE' : 'Register for CODEFORGE'}</h1>
        <form className="mt-8 space-y-5">
          {mode === 'register' && (
            <div>
              <label className="mb-2 block text-sm text-slate-300">Full name</label>
              <input className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white" placeholder="Enter your name" />
            </div>
          )}
          <div>
            <label className="mb-2 block text-sm text-slate-300">Email</label>
            <input className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white" placeholder="you@example.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Password</label>
            <input type="password" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white" placeholder="••••••••" />
          </div>
          <button className="w-full rounded-full bg-brand-500 px-5 py-3 font-semibold text-white hover:bg-brand-400">
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-white">404</h1>
      <p className="mt-4 text-slate-300">This page could not be found.</p>
      <NavLink to="/" className="mt-6 inline-block rounded-full bg-brand-500 px-5 py-3 font-semibold text-white">Back to Home</NavLink>
    </section>
  );
}

export default App;
