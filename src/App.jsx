import { useState, useEffect } from 'react'


function App() {

  const [clicks, setClicks] = useState(
    Number(localStorage.getItem('clicks')) || 0
  )
  const [syncTimer, setSyncTimer] = useState(30)
  const [synced, setSynced] = useState(true)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    localStorage.setItem('clicks', clicks)
  }, [clicks])
  
  useEffect(() => {

    const interval = setInterval(() => {
  
      setSyncTimer(prev => {
  
        if (prev === 1) {

          syncData()
          
          return 30
        }
  
        return prev - 1
      })
  
    }, 1000)
  
    return () => clearInterval(interval)
  
  }, [])

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

  function syncData() {

    console.log('syncing data...')
  
    setSynced(true)
  }

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

  return (
    <div className="app">
      <header className="header">
        <div className="status"  style={{
    color: isOnline ? '#00ff88' : '#ff3b3b'
  }}>
       
      <div
  className="dot"
  style={{
    backgroundColor: isOnline ? '#00ff88' : '#ff3b3b'
  }}
></div>
          {isOnline ? 'ONLINE' : 'OFFLINE'}
        </div>

        <h1 className="logo">MEGA KREATYWNY MEGA ORYGINALNY KLIKACZ</h1>

        <div className="user">
          UZYTKOWNIK1
        </div>
      </header>

      <main className="dashboard">
        <section className="ranking">
          <h2>RANKING DZIENNY</h2>

          {
  todayRanking.map((player, index) => (
    <div className="player" key={player.name}>
      <span>
        #{index + 1} {player.name}
      </span>

      <span>{player.score}</span>
    </div>
  ))
}
        </section>

        <section className="clicker">
          <button className="click-button" onClick={() => {
  setClicks(clicks + 1)
  setSynced(false)
}}>
          <div
  className={clicks % 50 === 0 && clicks !== 0 ? 'flip' : ''}
>
  🦛
</div>
          </button>

          <h2 className="counter">
          {clicks}
          </h2>
        </section>

        <section className="ranking">
          <h2>Ranking Ugulny</h2>

          {
  globalRanking.map((player, index) => (
    <div className="player" key={player.name}>
      <span>
        #{index + 1} {player.name}
      </span>

      <span>{player.score}</span>
    </div>
  ))
}
        </section>
      </main>

      <footer className="footer">
     
   
    <div> {synced ? "ZSYNCHRONIZOWANO " : "NIE ZSYNCHRONIZOWANO "}</div>
    <div> SYNCHRONIZACJA ZA: {syncTimer}</div>
      </footer>

      

  





    </div>
  )
}

export default App