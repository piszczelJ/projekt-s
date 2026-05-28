import { useState, useEffect } from 'react'

function App() {

  // =========================
  // STATES
  // =========================

  const [clicks, setClicks] = useState(
    Number(localStorage.getItem('clicks')) || 0
  )

  const [syncTimer, setSyncTimer] = useState(30)

  const [synced, setSynced] = useState(true)

  const [isOnline, setIsOnline] = useState(navigator.onLine)

  const [currentEvent, setCurrentEvent] = useState(null)

  const [zwierze, ustawZwierze] = useState('🦛')

  // =========================
  // LOCAL STORAGE
  // =========================

  useEffect(() => {
    localStorage.setItem('clicks', clicks)
  }, [clicks])

  // =========================
  // SYNC TIMER
  // =========================

  useEffect(() => {

    const interval = setInterval(() => {

      setSyncTimer(prev => {

        if (prev === 1) {

          if (isOnline) {
            syncData()
          }

          return 30
        }

        return prev - 1
      })

    }, 1000)

    return () => clearInterval(interval)

  }, [isOnline])

  // =========================
  // ONLINE / OFFLINE
  // =========================

  useEffect(() => {

    function goOnline() {
      setIsOnline(true)
    }

    function goOffline() {
      setIsOnline(false)
    }

    window.addEventListener('online', goOnline)

    window.addEventListener('offline', goOffline)

    return () => {
      window.removeEventListener('online', goOnline)

      window.removeEventListener('offline', goOffline)
    }

  }, [])

  // =========================
  // EVENTS
  // =========================

  function triggerEvent(eventName, duration) {

    setCurrentEvent(eventName)

    setTimeout(() => {
      setCurrentEvent(null)
    }, duration)

  }

  // =========================
  // CLICK HANDLER
  // =========================

  function handleClick() {

    const newClicks = clicks + 1

  


    setClicks(newClicks)
    if (clicks < 500){
      ustawZwierze("🦛")
    }
    if (clicks >= 500){
      ustawZwierze("🦓")
    }
    if (clicks >= 1000){
      ustawZwierze("🦍")
    }
    if (clicks >= 1500){
      ustawZwierze("🦏")
    }
    if (clicks >= 2000){
      ustawZwierze("🐪")
    }
//ustawZwierze(newClicks)
    setSynced(false)

    // HIPOPOTAM FLIP CO 50
    
   
     if (newClicks % 500 === 0) {
      triggerEvent('transformacja', 1000)
    } else if (newClicks % 100 === 0) {
      triggerEvent('fortnite-dance', 3000)
    }
    else if (newClicks % 50 === 0) {
      triggerEvent('flip', 1000)
    } 
    else if (newClicks % 10 === 0) {
      
      triggerEvent('jump', 1000)
    }

  }

  // =========================
  // FAKE SYNC
  // =========================

  function syncData() {

    console.log('syncing data...')

    setSynced(true)

  }

  // =========================
  // MOCK DATA
  // =========================

  const todayRanking = [
    { name: 'Kuba', score: 22 },
    { name: 'Ola', score: 11 },
    { name: 'Jan', score: 90 }
  ]

  const globalRanking = [
    { name: 'Ola', score: 25423 },
    { name: 'Kuba', score: 20112 },
    { name: 'Jan', score: 18392 }
  ]

  return (

    <div className="app">

      {/* HEADER */}

      <header className="header">

        <div
          className="status"
          style={{
            color: isOnline ? '#00ff88' : '#ff3b3b'
          }}
        >

          <div
            className="dot"
            style={{
              backgroundColor: isOnline
                ? '#00ff88'
                : '#ff3b3b'
            }}
          ></div>

          {isOnline ? 'ONLINE' : 'OFFLINE'}

        </div>

        <h1 className="logo">
          MEGA KREATYWNY MEGA ORYGINALNY KLIKACZ
        </h1>

        <div className="user">
          UZYTKOWNIK1
        </div>

      </header>

      {/* MAIN */}

      <main className="dashboard">

        {/* DAILY RANKING */}

        <section className="ranking">

          <h2>RANKING DZIENNY</h2>

          {
            todayRanking.map((player, index) => (

              <div
                className="player"
                key={player.name}
              >

                <span>
                  #{index + 1} {player.name}
                </span>

                <span>
                  {player.score}
                </span>

              </div>

            ))
          }

        </section>

        {/* CLICKER */}

        <section className="clicker">

          <button
            className="click-button"
            onClick={handleClick}
          >

            <div
             className={currentEvent || ''}
            >
              {zwierze}
            </div>

          </button>

          <h2 className="counter">
            {clicks}
          </h2>

        </section>

        {/* GLOBAL RANKING */}

        <section className="ranking">

          <h2>RANKING GLOBALNY</h2>

          {
            globalRanking.map((player, index) => (

              <div
                className="player"
                key={player.name}
              >

                <span>
                  #{index + 1} {player.name}
                </span>

                <span>
                  {player.score}
                </span>

              </div>

            ))
          }

        </section>

      </main>

      {/* FOOTER */}

      <footer className="footer">

        <div>
          {
            synced
              ? 'ZSYNCHRONIZOWANO'
              : 'NIE ZSYNCHRONIZOWANO'
          }
        </div>

        <div>
          SYNCHRONIZACJA ZA: {syncTimer}
        </div>

      </footer>

    </div>

  )
}

export default App