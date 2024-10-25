import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import WaterScarcityScene from './pages/WaterScarcityScene';
import AgriculturalOveruse from './pages/AgriculturalOveruse';
import Pollution from './pages/Pollution';
import ClimateChange from './pages/ClimateChange';
import PopulationGrowth from './pages/PopulationGrowth';

function MainPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/waterscarcity" element={<WaterScarcityScene />} />
        <Route path="/agricultural-overuse" element={<AgriculturalOveruse />} />
        <Route path="/pollution" element={<Pollution />} />
        <Route path="/climate-change" element={<ClimateChange />} />
        <Route path="/population-growth" element={<PopulationGrowth />} />
      </Routes>
    </Router>
  );
}

export default MainPage;

