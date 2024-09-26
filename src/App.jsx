import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Recipe from '@/pages/Recipe';
import './App.css'

function App() {
  return (
    <Router>
      <div className={"App"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
