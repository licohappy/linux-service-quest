import { useState } from 'react'
import { SCENARIOS } from './scenarios'

type Props = { onBack: () => void }

export default function ScenarioMode({ onBack }: Props) {
  const [scenarioIdx, setScenarioIdx] = useState<number | null>(null)
  const [stepIdx, setStepIdx] = useState(0)
  const [selected, setSelected] = useState('')
  const [feedback, setFeedback] = useState('')
  const [done, setDone] = useState(false)

  const scenario = scenarioIdx !== null ? SCENARIOS[scenarioIdx] : null
  const step = scenario?.steps[stepIdx]

  const submit = () => {
    if (!step || !selected) return
    if (selected === step.answer) {
      setFeedback(`✅ ${step.explanation}`)
      setTimeout(() => {
        setFeedback('')
        setSelected('')
        if (stepIdx + 1 < scenario!.steps.length) {
          setStepIdx(stepIdx + 1)
        } else {
          setDone(true)
        }
      }, 1400)
    } else {
      setFeedback('❌ Not quite — re-read the instruction and try again.')
    }
  }

  const restart = () => {
    setStepIdx(0)
    setSelected('')
    setFeedback('')
    setDone(false)
  }

  // Scenario picker
  if (scenarioIdx === null) {
    return (
      <section className="card">
        <h2>🎭 Scenario Mode</h2>
        <p>Multi-step real-world troubleshooting. Each scenario chains commands together like a real incident.</p>
        <div className="scenario-list">
          {SCENARIOS.map((s, i) => (
            <div key={s.id} className="scenario-item" onClick={() => setScenarioIdx(i)}>
              <strong>{s.title}</strong>
              <span className="scenario-distro">{s.distro} · {s.steps.length} steps</span>
              <span>{s.story}</span>
            </div>
          ))}
        </div>
        <button onClick={onBack} className="reset">← Back</button>
      </section>
    )
  }

  // Done screen
  if (done) {
    return (
      <section className="card done">
        <h2>🏆 Scenario Complete!</h2>
        <p><strong>{scenario!.title}</strong> — all {scenario!.steps.length} steps done.</p>
        <p>You just walked through a real-world incident from diagnosis to resolution.</p>
        <button onClick={restart}>Try Again</button>
        <button onClick={() => { setScenarioIdx(null); restart() }} className="reset">All Scenarios</button>
        <button onClick={onBack} className="reset">← Back</button>
      </section>
    )
  }

  return (
    <section className="card">
      <h2>🎭 {scenario!.title}</h2>
      <p className="scenario-distro">{scenario!.distro} · Step {stepIdx + 1}/{scenario!.steps.length}</p>
      <p>{scenario!.story}</p>

      <div className="hint">
        <h3>Situation</h3>
        <p>{step!.instruction}</p>
        <code>{step!.command}</code>
      </div>

      <div className="quiz">
        <h3>What do you do?</h3>
        <p>{step!.question}</p>
        {step!.options.map((opt) => (
          <label key={opt} className="option">
            <input type="radio" name="scenario" checked={selected === opt} onChange={() => setSelected(opt)} />
            <span>{opt}</span>
          </label>
        ))}
        <button onClick={submit} disabled={!selected}>Submit</button>
        {feedback && <p className="feedback">{feedback}</p>}
      </div>

      <button onClick={() => { setScenarioIdx(null); restart() }} className="reset">← Scenarios</button>
      <button onClick={onBack} className="reset">← Back</button>
    </section>
  )
}
