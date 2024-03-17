import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PageGallery from "./PageGallery"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PageGallery />} />
      </Routes>
    </Router>
  )
}

export default App

