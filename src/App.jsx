import { useState, useEffect } from 'react'

function App() {
  const [clicks, setClicks] = useState(
    Number(localStorage.getItem('clicks')) || 0
  )
  useEffect(() => {
    localStorage.setItem('clicks', clicks)
  }, [clicks])
  return (
    <div className="app">
      <header className="header">
        <div className="status">
          <div className="dot"></div>
          ONLINE
        </div>

        <h1 className="logo">MEGA KREATYWNY MEGA ORYGINALNY KLIKACZ</h1>

        <div className="user">
          UZYTKOWNIK1
        </div>
      </header>

      <main className="dashboard">
        <section className="ranking">
          <h2>RANKING DZIENNY</h2>

          <div className="player">
            <span>#1 Kuba</span>
            <span>522</span>
          </div>

          <div className="player">
            <span>#2 Ola</span>
            <span>481</span>
          </div>
        </section>

        <section className="clicker">
          <button className="click-button" onClick={() => setClicks(clicks + 1)}>
          🦛
          </button>

          <h2 className="counter">
          {clicks}
          </h2>
        </section>

        <section className="ranking">
          <h2>Global Ranking</h2>

          <div className="player">
            <span>#1 Ola</span>
            <span>25 423</span>
          </div>

          <div className="player">
            <span>#2 Kuba</span>
            <span>20 112</span>
          </div>
        </section>
      </main>

      <footer className="footer">
        Last sync: 12:33
      </footer>
    </div>
  )
}

export default App