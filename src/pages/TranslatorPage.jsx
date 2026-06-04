import React, { useEffect } from 'react';

import Header from '../Components/transalator/Header.jsx';
import Principal from '../Components/transalator/Principal.jsx';
import Traductor from '../Components/transalator/Traductor.jsx';
import Diccionario from '../Components/transalator/Diccionario.jsx';
import Acerca from '../Components/transalator/Acerca.jsx';


import fondo from '../assets/fondo.png';

const TranslatorPage = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const handleNavigate = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const sectionStyle = {
    scrollMarginTop: '100px',
    width: '100%',
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflowX: 'hidden',
      }}
    >
      <Header onNavigate={handleNavigate} />

      <main
        style={{
          width: '100%',
          margin: 0,
          paddingTop: '80px',
          boxSizing: 'border-box',
        }}
      >
        <section id="principal" style={sectionStyle}>
          <Principal />
        </section>

        <section id="traductor" style={sectionStyle}>
          <Traductor />
        </section>

        <section id="diccionario" style={sectionStyle}>
          <Diccionario />
        </section>

        <section id="acerca" style={sectionStyle}>
          <Acerca />
        </section>

        
      </main>
    </div>
  );
};

export default TranslatorPage;