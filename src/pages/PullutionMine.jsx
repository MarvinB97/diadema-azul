import React from 'react';
import './../styles/pages.css';
import { Link } from 'react-router-dom';
import './../styles/Home.css';





const PollutionMine = () => {
  return (


    <div className='textoContent-page'>
      <h1>Minería Ilegal y la Contaminación del Agua</h1>
      <p>
      La minería ilegal es una actividad que se ha expandido en diversas regiones del mundo, especialmente en áreas ricas en recursos naturales. Aunque puede parecer una fuente rápida de ingresos, sus consecuencias son devastadoras, particularmente en lo que respecta a la contaminación del agua.
      </p>

      <h3>Impactos de la Minería Ilegal en el Agua</h3>

      <ol>
        <li>Contaminación Química: La extracción de minerales, como el oro, a menudo implica el uso de sustancias químicas tóxicas, como el mercurio y el cianuro. Estos productos químicos se utilizan para separar los minerales de la roca, pero frecuentemente terminan en ríos y cuerpos de agua, contaminando el suministro hídrico de las comunidades cercanas.
        </li>
        <li>Sedimentación: La minería a cielo abierto y la remoción de vegetación para facilitar la extracción generan una alta erosión del suelo. Esto provoca que grandes cantidades de sedimentos lleguen a los ríos y lagos, afectando la calidad del agua y alterando los ecosistemas acuáticos.
        </li>
        <li>Destrucción de Ecosistemas: Las operaciones mineras ilegales a menudo se realizan en áreas ecológicamente sensibles. La destrucción de hábitats naturales no solo afecta a las especies locales, sino que también compromete la calidad del agua al eliminar la vegetación que filtra y regula el ciclo hídrico.
        </li>
        <li>Afectación a Comunidades Locales: La contaminación del agua no solo tiene un impacto ambiental; también afecta la salud de las comunidades que dependen de estos recursos hídricos para beber, cocinar y cultivar. Las enfermedades relacionadas con la contaminación del agua pueden aumentar, generando un costo social y económico significativo.
        </li>
      </ol>




      <Link to="/">
        <button style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
          Back to Menu
        </button>
      </Link>
    </div>
    
  );
};

export default PollutionMine;