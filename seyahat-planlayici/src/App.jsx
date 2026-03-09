import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Planla from './pages/Planla'

function App() {
  return (
    <Routes>
      {/* Eğer URL sadece '/' ise Home sayfasını göster */}
      <Route path="/" element={<Home />} />
      
      {/* Eğer URL '/planla/1' gibi bir şeyse Planla sayfasını göster */}
      <Route path="/planla/:id" element={<Planla />} />
    </Routes>
  )
}

export default App