import React from 'react';
import { Link } from 'react-router-dom';

const ClimateChange = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Climate Change</h1>
      <p>
        Climate change exacerbates water scarcity through more frequent droughts, changing rainfall patterns, and
        increasing evaporation rates. As global temperatures rise, water availability becomes more unpredictable, 
        affecting both ecosystems and human populations.
      </p>
      <Link to="/waterscarcity">
        <button style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
          Back to Menu
        </button>
      </Link>
    </div>
  );
};

export default ClimateChange;
