import { useState } from 'react'
import { MISSIONS } from './missions'

type Props = { completed: number; onBack: () => void }

export default function Glossary({ completed, onBack }: Props) {
  const [filter, setFilter] = useState('')
  const terms = MISSIONS.slice(0, completed).map((m) => ({
    word: m.term.word,
    meaning: m.term.meaning,
    mission: m.title,
  }))
  const filtered = terms.filter(
    (t) =>
      t.word.toLowerCase().includes(filter.toLowerCase()) ||
      t.meaning.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <section className="card">
      <h2>📖 IT/English Glossary</h2>
      <p className="glossary-subtitle">
        {terms.length} term{terms.length !== 1 ? 's' : ''} learned so far.
        {terms.length === 0 && ' Complete missions to unlock terms!'}
      </p>
      {terms.length > 0 && (
        <input
          className="glossary-search"
          placeholder="Search terms..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      )}
      <div className="glossary-list">
        {filtered.map((t) => (
          <div key={t.word} className="glossary-item">
            <strong>{t.word}</strong>
            <span>{t.meaning}</span>
            <span className="glossary-source">from: {t.mission}</span>
          </div>
        ))}
        {terms.length > 0 && filtered.length === 0 && (
          <p>No matching terms.</p>
        )}
      </div>
      <button onClick={onBack}>← Back to Missions</button>
    </section>
  )
}
