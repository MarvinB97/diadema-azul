import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WaterScarcityScene from './pages/WaterScarcityScene';
import AgriculturalOveruse from './pages/AgriculturalOveruse';
import Pollution from './pages/Pollution';
import ClimateChange from './pages/ClimateChange';
import PopulationGrowth from './pages/PopulationGrowth';
import PollutionMine from './pages/PollutionMine';


function MainPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waterscarcity" element={<WaterScarcityScene />} />
        <Route path="/agricultural-overuse" element={<AgriculturalOveruse />} />
        <Route path="/pollution" element={<Pollution />} />
        <Route path="/climate-change" element={<ClimateChange />} />
        <Route path="/population-growth" element={<PopulationGrowth />} />
        <Route path="/pollution-mine" element={<PollutionMine />} />
      </Routes>
    </Router>
  );
}

export default MainPage;

