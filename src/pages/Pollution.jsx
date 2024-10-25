import React from 'react';
import { Link } from 'react-router-dom';

const Pollution = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Pollution of Water Sources</h1>
      <p>
        Pollution from industries, agriculture, and households contaminates water sources. 
        Chemical spills, waste dumping, and runoff from agricultural fields degrade the quality of freshwater,
        making it unsafe for human consumption and ecosystems. Addressing pollution is key to safeguarding water resources.
      </p>
      <Link to="/waterscarcity">
        <button style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
          Back to Menu
        </button>
      </Link>
    </div>
  );
};

export default Pollution;
