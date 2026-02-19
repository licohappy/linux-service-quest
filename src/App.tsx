import { useMemo, useState } from 'react'
import './App.css'

type Distro = 'Ubuntu/Debian' | 'Fedora/RHEL' | 'Arch' | 'openSUSE'

type Mission = {
  id: string
  title: string
  description: string
  distro: Distro
  term: { word: string; meaning: string }
  command: string
  question: string
  options: string[]
  answer: string
}

const MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: 'Wake the Web Service',
    description: 'Your nginx service is stopped. Start it now.',
    distro: 'Ubuntu/Debian',
    term: { word: 'daemon', meaning: 'A background service process that keeps running.' },
    command: 'sudo systemctl start nginx',
    question: 'Which command checks if nginx is currently running?',
    options: ['sudo systemctl status nginx', 'sudo apt install nginx', 'sudo reboot nginx'],
    answer: 'sudo systemctl status nginx',
  },
  {
    id: 'm2',
    title: 'Enable Auto-Start',
    description: 'Make docker start automatically after reboot.',
    distro: 'Fedora/RHEL',
    term: { word: 'enable', meaning: 'Configure a service to start automatically on boot.' },
    command: 'sudo systemctl enable docker',
    question: 'What command starts docker immediately (without reboot)?',
    options: ['sudo systemctl start docker', 'sudo dnf install docker', 'sudo systemctl disable docker'],
    answer: 'sudo systemctl start docker',
  },
  {
    id: 'm3',
    title: 'Investigate Failure',
    description: 'A service failed. Check its logs using journalctl.',
    distro: 'Arch',
    term: { word: 'journal', meaning: 'Systemd log database readable via journalctl.' },
    command: 'sudo journalctl -u sshd -n 50 --no-pager',
    question: 'Which command restarts sshd after fixing config?',
    options: ['sudo systemctl restart sshd', 'sudo pacman -S sshd', 'sudo systemctl mask sshd'],
    answer: 'sudo systemctl restart sshd',
  },
  {
    id: 'm4',
    title: 'Calm a Flapping Service',
    description: 'A service keeps restarting. Stop it and disable boot start.',
    distro: 'openSUSE',
    term: { word: 'flapping', meaning: 'A service repeatedly starts and crashes in a loop.' },
    command: 'sudo systemctl disable --now myservice',
    question: 'What does --now do in systemctl disable --now?',
    options: [
      'It applies the disable action immediately by stopping current run state too',
      'It delays disable until next boot',
      'It edits journal logs',
    ],
    answer: 'It applies the disable action immediately by stopping current run state too',
  },
]

const STORAGE_KEY = 'linux-service-quest-progress-v1'

function App() {
  const [current, setCurrent] = useState(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY) ?? '0')
    return Number.isNaN(saved) ? 0 : Math.min(saved, MISSIONS.length)
  })
  const [selected, setSelected] = useState<string>('')
  const [feedback, setFeedback] = useState<string>('')

  const mission = MISSIONS[current]
  const progress = useMemo(() => Math.round((current / MISSIONS.length) * 100), [current])

  const saveProgress = (next: number) => localStorage.setItem(STORAGE_KEY, String(next))

  const submitAnswer = () => {
    if (!mission || !selected) return
    if (selected === mission.answer) {
      setFeedback('✅ Correct! Mission cleared.')
      const next = current + 1
      setTimeout(() => {
        setSelected('')
        setFeedback('')
        setCurrent(next)
        saveProgress(next)
      }, 900)
    } else {
      setFeedback('❌ Not quite. Read the hint and try again.')
    }
  }

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY)
    setCurrent(0)
    setSelected('')
    setFeedback('Progress reset. You are back to Mission 1.')
  }

  return (
    <main className="app">
      <header>
        <h1>Linux Service Quest</h1>
        <p className="subtitle">Learn service management + IT English in game-style missions.</p>
      </header>

      <section className="hud">
        <div>Level: {Math.min(current + 1, MISSIONS.length)}/{MISSIONS.length}</div>
        <div>Progress: {progress}%</div>
        <button onClick={reset} className="reset">Reset</button>
      </section>

      {!mission ? (
        <section className="card done">
          <h2>🏁 You finished all missions!</h2>
          <p>You now know practical service-management workflows across major Linux distros.</p>
          <button onClick={reset}>Play Again</button>
        </section>
      ) : (
        <section className="card">
          <h2>{mission.title}</h2>
          <p><strong>Distro focus:</strong> {mission.distro}</p>
          <p>{mission.description}</p>

          <div className="term">
            <h3>English + IT Term</h3>
            <p><strong>{mission.term.word}:</strong> {mission.term.meaning}</p>
          </div>

          <div className="hint">
            <h3>Command Hint</h3>
            <code>{mission.command}</code>
          </div>

          <div className="quiz">
            <h3>Mission Checkpoint</h3>
            <p>{mission.question}</p>
            {mission.options.map((option) => (
              <label key={option} className="option">
                <input
                  type="radio"
                  name="answer"
                  checked={selected === option}
                  onChange={() => setSelected(option)}
                />
                <span>{option}</span>
              </label>
            ))}
            <button onClick={submitAnswer} disabled={!selected}>Submit</button>
            {feedback && <p className="feedback">{feedback}</p>}
          </div>
        </section>
      )}
    </main>
  )
}

export default App
