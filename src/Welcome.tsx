type Props = { onStart: () => void }

export default function Welcome({ onStart }: Props) {
  return (
    <section className="card welcome">
      <div className="welcome-header">
        <h1 style={{ fontSize: '1.6rem' }}>Linux Service Quest</h1>
        <p className="subtitle">Learn service management + IT English. Game style. For real.</p>
      </div>

      <div className="welcome-grid">
        <div className="welcome-feature">
          <span>🎯</span>
          <div>
            <strong>16 Missions</strong>
            <p>Cover all core systemctl commands — start, stop, enable, mask, journalctl, timers, and more.</p>
          </div>
        </div>
        <div className="welcome-feature">
          <span>📦</span>
          <div>
            <strong>4 Distros</strong>
            <p>Every mission shows the equivalent commands for Ubuntu/Debian, Fedora/RHEL, Arch, and openSUSE.</p>
          </div>
        </div>
        <div className="welcome-feature">
          <span>📖</span>
          <div>
            <strong>IT/English Glossary</strong>
            <p>Every mission teaches you one Linux or English term. Unlock them as you progress.</p>
          </div>
        </div>
        <div className="welcome-feature">
          <span>🎭</span>
          <div>
            <strong>Scenario Mode</strong>
            <p>Real-world multi-step incidents. Diagnose a broken server like it's production.</p>
          </div>
        </div>
        <div className="welcome-feature">
          <span>🔄</span>
          <div>
            <strong>Review Mode</strong>
            <p>Got something wrong? It goes into your review list. Retry until you nail it.</p>
          </div>
        </div>
        <div className="welcome-feature">
          <span>⚡</span>
          <div>
            <strong>XP &amp; Levels</strong>
            <p>Earn XP for correct answers. First-try answers score more. Level up as you learn.</p>
          </div>
        </div>
      </div>

      <div className="welcome-how">
        <h3>How to play</h3>
        <ol>
          <li>Read the mission scenario and IT/English term</li>
          <li>Study the command hint and distro comparison</li>
          <li>Answer the checkpoint question</li>
          <li>Progress saves automatically — come back anytime</li>
        </ol>
      </div>

      <button onClick={onStart} className="start-btn">▶ Start Playing</button>
    </section>
  )
}
