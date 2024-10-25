import React from 'react';
import { Link } from 'react-router-dom';

const PopulationGrowth = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Population Growth</h1>
      <p>
        Population growth puts increasing pressure on water resources. 
        As urbanization and industrial activities expand, the demand for water rises exponentially. 
        Effective water management strategies are critical to meet the growing needs of communities worldwide.
      </p>
      <Link to="/waterscarcity">
        <button style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
          Back to Menu
        </button>
      </Link>
    </div>
  );
};

export default PopulationGrowth;
