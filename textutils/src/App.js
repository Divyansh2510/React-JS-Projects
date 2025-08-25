import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import Textforms from './components/Textforms';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar title="TextUtils2" />
      <div className="container my-3">
        <Routes>
          <Route path="/" element={<Textforms heading="Enter the TEXT" />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
