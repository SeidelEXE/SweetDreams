
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header.jsx'
import { NavBar } from './components/NavBar.jsx'
import { Home } from './routes/Home.jsx'
import { Account } from './routes/Account.jsx'
import { Progress } from './routes/Progress.jsx'
import { Plan } from './routes/Plan.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import './App.css'

function App() {

  return (
    <ThemeProvider>
    <div className="app">
      <div className="container">
        <div className="grid" style={{gap:'16px'}}>
          <Header />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/conta" element={<Account/>} />
            <Route path="/progresso" element={<Progress/>} />
            <Route path="/plano" element={<Plan/>} />
          </Routes>
        </div>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default App
