import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Animation from './pages/Animation'
import ProtectedRoute from './components/ProtectedRoute';

function MainPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/animation" element={<Animation/>}/>
        <Route path="/protected" element={<ProtectedRoute />} />
      </Routes>
    </Router>
  );
}

export default MainPage;