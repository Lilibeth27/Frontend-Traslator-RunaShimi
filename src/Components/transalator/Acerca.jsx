// importamos react y los hooks 
import React, { useState, useEffect } from 'react';

// Componente Acerca del Runa Shimi
const Acerca = () => {
  // Estado para detectar si es móvil o no (Ajustado a 768px para mantener consistencia)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detecta cambios en el tamaño de la pantalla para actualizar el estado de isMobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    //Agregamos el event listener para detectar cambios en el tamaño de la pantalla
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //Estilos 
  const styles = {
    // Contenedor general para permitir fondos de ancho completo
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    //Contenedor principal (contenido centrado)
    container: {
      width: '100%',
      // CLAVE: Limitamos el ancho en celular para forzar el centrado y proteger el layout del sidebar
      maxWidth: isMobile ? '22rem' : '53.125rem', 
      margin: '4rem auto 0', // Le quitamos el margen inferior para pegar el footer
      padding: isMobile ? '0 0.5rem 3rem' : '0 0 4rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 1, 
      clear: 'both',
    },
    // Titulo y Icono 
    headerContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.625rem',
      marginBottom: '2.5rem',
      textAlign: 'center',
      width: '100%',
      justifyContent: 'center',
    },
    // Estilo del titulo 
    headerText: {
      fontSize: isMobile ? '1.6rem' : '2rem', 
      color: '#3b6d2a',
      margin: 0,
    },
    // Circulo del icono del titulo
    iconCircle: {
      backgroundColor: '#f4e6d4',
      borderRadius: '50%',
      padding: '0.4rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.25rem',
    },
    //grid de tarjetas 
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.5rem' : '1rem', 
      width: '100%',
      boxSizing: 'border-box',
    },
    // Estilo de cada tarjeta
    card: {
      backgroundColor: 'white',
      borderRadius: '1.875rem', 
      boxShadow: '0 0.125rem 0.375rem rgba(0,0,0,0.05)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      paddingBottom: '1.5625rem',
      border: '0.0625rem solid #f4e6d4',
      width: '100%',
      boxSizing: 'border-box',
    },
    // Contenedor del blob SVG y el icono
    blobContainer: {
      width: '100%',
      height: '6.25rem',
      position: 'relative',
      overflow: 'visible',
    },
    //Estilo del SVG
    blobSvg: {
      width: '100%',
      height: '100%',
      display: 'block',
    },
    // Estilo del icono que flota
    iconBadge: {
      position: 'absolute',
      bottom: '-1.25rem',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'white',
      borderRadius: '50%',
      padding: '0.5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 0.125rem 0.375rem rgba(0,0,0,0.1)',
      fontSize: '1.25rem',
      zIndex: 10,
    },
    //titulo de cada tarjeta
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginTop: '2.1875rem',
      marginBottom: '0.625rem',
    },
    //texto de cada tarjeta
    cardText: {
      textAlign: 'center',
      padding: '0 1.25rem',
      fontSize: '0.8125rem',
      color: '#5f6b5c',
      lineHeight: '1.6',
      fontWeight: '500',
    },
   
    greenFooter: {
      backgroundColor: '#2a521a', 
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',      
      padding: isMobile ? '3rem 1rem' : '4rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    //texto de advertencia final (ahora arriba de la línea)
    disclaimer: {
      marginBottom: '2rem',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      color: 'rgba(255, 255, 255, 0.95)', // Blanco ligeramente suave
      textAlign: 'center',
      fontWeight: '400',
      maxWidth: '53.125rem',
      lineHeight: '1.6'
    },
    //linea de pie de pagina 
    footerLine: {
      borderTop: '1px solid rgba(255, 255, 255, 0.2)', // Línea sutil blanca
      width: '100%',
      maxWidth: '53.125rem', // Mantiene el contenido alineado con arriba
      paddingTop: '1.5rem',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: isMobile ? '0.5rem' : '2rem',
    },
    //texto del pie de pagina
    footerText: {
      color: 'white', // Texto blanco para contrastar
      fontSize: isMobile ? '0.75rem' : '0.85rem',
      fontWeight: '500',
      textAlign: 'center',
    }
  };

  // Información de las tarjetas (contenido dinámico)
  const cardsInfo = [
    {
      title: 'Origen',
      color: '#FFC300',
      text: 'El Runa Shimi es hablado por millones de personas en Ecuador, Perú, Bolivia y Colombia. Es la lengua del pueblo Inca y sus descendientes. 🦙',
      icon: '⛰️',
      // SVG decorativo
      svg: (
        <svg viewBox="0 0 100 45" preserveAspectRatio="none" style={styles.blobSvg}>
          <path d="M0,0 L100,0 L100,20 C85,35 75,5 50,25 C25,45 15,10 0,20 Z" fill="#FFC300"/>
          <circle cx="85" cy="25" r="2.5" fill="#FFC300" />
          <circle cx="18" cy="30" r="1.5" fill="#FFC300" />
        </svg>
      )
    },
    {
      title: 'Cosmovisión',
      color: '#3D8C56',
      text: 'Representa el Sumak Kawsay (Buen Vivir) ✨, una filosofía de vida en armonía con la Pachamama (Madre Tierra) 🌍 y la comunidad.',
      icon: '🌿',
      svg: (
        <svg viewBox="0 0 100 45" preserveAspectRatio="none" style={styles.blobSvg}>
          <path d="M0,0 L100,0 L100,15 C80,30 70,-5 40,20 C20,35 10,15 0,25 Z" fill="#3D8C56"/>
          <circle cx="90" cy="22" r="2" fill="#3D8C56" />
          <circle cx="10" cy="32" r="2" fill="#3D8C56" />
        </svg>
      )
    },
    {
      title: 'Preservación',
      color: '#E03244', 
      text: 'Ayuda a preservar esta lengua ancestral. Cada palabra que aprendas contribuye a mantener viva la cultura de los pueblos andinos. ☀️',
      icon: '🤲',
      svg: (
        <svg viewBox="0 0 100 45" preserveAspectRatio="none" style={styles.blobSvg}>
          <path d="M0,0 L100,0 L100,25 C75,45 65,10 40,25 C20,35 10,15 0,20 Z" fill="#E03244"/>
          <circle cx="88" cy="28" r="2.5" fill="#E03244" />
          <circle cx="25" cy="32" r="1.5" fill="#E03244" />
        </svg>
      )
    }
  ];

  //Renderizamos
  return (
    <div style={styles.wrapper}>
      
      {/* Contenido Superior Restringido en Ancho */}
      <div style={styles.container}>
        {/* Título Principal */}
        <div style={styles.headerContainer}>
          <h2 style={styles.headerText}>Acerca del Runa Shimi</h2>
          <div style={styles.iconCircle}>🌱</div>
        </div>

        {/* Tarjetas */}
        <div style={styles.grid}>
          {cardsInfo.map((card, index) => (
            <div key={index} style={styles.card}>
              
               {/* Parte superior decorativa */}
              <div style={styles.blobContainer}>
                {card.svg}
                {/* Icono flotante */}
                <div style={styles.iconBadge}>
                  {card.icon}
                </div>
              </div>
              
              {/* Título de la tarjeta */}
              <h3 style={{ ...styles.cardTitle, color: card.color }}>
                {card.title}
              </h3>
              
               {/* Texto de la tarjeta */}
              <p style={styles.cardText}>
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* Sección: Sobre los Creadores */}
        <div style={{ textAlign: 'center', margin: '40px 0 0 0' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#24521c', marginBottom: '8px' }}>
            👩🏽‍💻 Sobre los Creadores 👨🏽‍💻
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#5f6b5c', maxWidth: '750px', margin: '0 auto', lineHeight: '1.5' }}>
            Somos Juan Miguel cedeño y Lilibeth Andrea Anacona , estudiantes de la <strong>Fundación Universitaria de Popayán (FUP)</strong>. 
            Desarrollamos esta aplicación como un proyecto académico dedicado a la preservación y revitalización del idioma Runa Shimi.
          </p>
        </div>
      </div>

      {/* NUEVO: Banda Verde Completa Inferior */}
      <div style={styles.greenFooter}>
        
        {/* nota final colocada arriba de la línea, como en la imagen */}
        <p style={styles.disclaimer}>
          ✨ Este traductor es una herramienta educativa. Las traducciones pueden variar según la región y dialecto. ✨
        </p>

        {/* Footer con línea separadora */}
        <div style={styles.footerLine}>
          <span style={styles.footerText}>Preservando las lenguas ancestrales ⛰️</span>
          <span style={styles.footerText}>Hecho con amor para la comunidad 🌍</span>
        </div>

      </div>

    </div>
  );
};

export default Acerca;