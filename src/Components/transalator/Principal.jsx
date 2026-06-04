import React, { useState, useEffect } from 'react';
/* CORREGIDO: Apunta a indigena.png que es el archivo real en tu carpeta */
import indigena from '../../assets/indigena.png'; 

const Principal = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    section: {
      width: '100%',
      minHeight: '85vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      padding: isMobile ? '2rem 1rem' : '4rem 2rem 4rem 2rem',
      backgroundColor: '#f6f7f3',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    },
   container: {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr',
  gap: '3rem',
  alignItems: 'center'
},
    left: {
      display: 'flex',
      flexDirection: 'column'
    },
    badge: {
      backgroundColor: '#dcebcf',
      color: '#3b6d2a',
      padding: '0.8rem 1.5rem',
      borderRadius: '999px',
      width: 'fit-content',
      fontWeight: '500',
      marginBottom: '2rem'
    },
    title: {
      fontSize: isMobile ? '2.5rem' : '4.5rem',
      fontWeight: '700',
      color: '#24521c',
      lineHeight: '1.1',
      marginBottom: '2rem'
    },
    description: {
      fontSize: isMobile ? '1.1rem' : '1.5rem',
      color: '#5f6b5c',
      lineHeight: '1.8',
      maxWidth: '600px'
    },
    features: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2rem',
      marginTop: '2rem',
      color: '#4f6c48',
      fontSize: '1rem'
    },
    imageContainer: {
      position: 'relative',
      width: '100%'
    },
    indigena: {
      width: '100%',
      height: isMobile ? '350px' : '550px',
      objectFit: 'cover',
      borderRadius: '2rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
    },
    floatingCard: {
      position: 'absolute',
      left: '20px',
      bottom: '20px',
      backgroundColor: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '1.5rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
      maxWidth: '250px'
    },
    cardLabel: {
      color: '#777',
      marginBottom: '0.5rem'
    },
    cardText: {
      color: '#4c8c35',
      fontSize: '1.4rem',
      fontWeight: '600'
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        
        {/* LADO IZQUIERDO */}
        <div style={styles.left}>
          <div style={styles.badge}>
            Conectando culturas 🌿
          </div>

          <h1 style={styles.title}>
            Traductor de
            <br />
            Runa Shimi
          </h1>

          <p style={styles.description}>
            Descubre y aprende la lengua ancestral de los
            Yanakunas. Una herramienta moderna para preservar
            y compartir nuestra rica herencia cultural.
          </p>

          <div style={styles.features}>
            <span>● Fácil de usar</span>
            <span>● Culturalmente enfocado</span>
          </div>
        </div>

        {/* LADO DERECHO */}
        <div style={styles.imageContainer}>
          <img
            src={indigena}
            alt="Runa Shimi"
            style={styles.indigena}
          />

          <div style={styles.floatingCard}>
            <div style={styles.cardLabel}>
              Traducción
            </div>
            <div style={styles.cardText}>
              Yupaychani 🌿
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Principal;