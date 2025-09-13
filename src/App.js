// import logo from './logo.svg';
import './App.css';
import Login from './Login';
import FilePage from './FilePage';
import ListPage from './ListPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return(
  <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/filepage" element={<FilePage />} />
        <Route path="/listpage" element={<ListPage />} />
      </Routes>
    </Router>
    );
}

export default App;
