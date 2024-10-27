import React from 'react';
import { Link } from 'react-router-dom';

const AgriculturalOveruse = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Agricultural Overuse</h1>
      <p>
        Agricultural overuse of water depletes resources rapidly and threatens food security. 
        Sustainable practices are essential to prevent further damage.
      </p>
      <Link to="/">
        <button style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
          Back to Menu
        </button>
      </Link>
    </div>
  );
};

export default AgriculturalOveruse;
