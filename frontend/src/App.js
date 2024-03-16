import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PageGallery from "./PageGallery"
import PageDisplayImage from "./PageDisplayImage"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PageGallery />} />
        <Route path="/image/:hex" element={<PageDisplayImage />} />
      </Routes>
    </Router>
  )
}

export default App

