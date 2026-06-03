// Importamos React y los hooks necesarios
import React, { useState, useEffect } from 'react';

// Importamos los componentes
import Acerca from '../Components/transalator/Acerca.jsx';
import Diccionario from '../Components/transalator/Diccionario.jsx';
import Traductor from '../Components/transalator/Traductor.jsx';
import Principal from '../Components/transalator/Principal.jsx';
import Header from '../Components/transalator/Header.jsx';

import fondo from '../assets/fondo.png';

// Componente principal de la página del traductor
const TranslatorPage = () => {

  // Estado para controlar qué vista se está mostrando
  const [vistaActual, setVistaActual] = useState('traductor');

  // Estado para detectar si el usuario está en un dispositivo móvil
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Escuchar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Decide qué vista mostrar
  const renderVista = () => {
    switch (vistaActual) {

      case 'traductor':
        return (
          <>
            <Principal />
            <Traductor />
          </>
        );

      case 'diccionario':
        return <Diccionario />;

      case 'acerca':
        return <Acerca />;

      default:
        return (
          <>
            <Principal />
            <Traductor />
          </>
        );
    }
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
        backgroundColor: '#ffffff',
        overflowX: 'hidden'
      }}
    >

      {/* HEADER */}
      <Header />

      {/* CONTENIDO */}
      <main
        style={{
          width: '100%',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        }}
      >
        {renderVista()}
      </main>

    </div>
  );
};

export default TranslatorPage;