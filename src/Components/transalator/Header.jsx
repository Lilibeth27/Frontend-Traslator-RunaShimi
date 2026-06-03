import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

import logo from '../../assets/logo.png';
const Header = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);

  }, []);

  const styles = {

    header: {
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E5E7EB',
      position: 'fixed',
      top: 0,
      zIndex: 1000,
      width: '100%',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    },

  container: {
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 1.5rem',
  boxSizing: 'border-box'
},

    row: {
      height: '80px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },

    logo: {
      width: '55px',
      height: '55px',
      objectFit: 'contain'
    },

    textContainer: {
      display: 'flex',
      flexDirection: 'column'
    },

    title: {
      margin: 0,
      color: '#24521C',
      fontSize: '2rem',
      fontWeight: '700',
      lineHeight: '1'
    },

    subtitle: {
      margin: '4px 0 0 0',
      color: '#6B7280',
      fontSize: '0.9rem'
    },

    desktopMenu: {
      display: 'flex',
      alignItems: 'center',
      gap: '2.5rem'
    },

    link: {
      color: '#24521C',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: '500'
    },

    mobileButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#24521C'
    },

    mobileMenu: {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '1rem',
      gap: '1rem'
    },

    mobileLink: {
      color: '#24521C',
      textDecoration: 'none',
      fontSize: '1rem',
      padding: '0.5rem 0'
    }

  };

  return (
    <header style={styles.header}>

      <div style={styles.container}>

        <div style={styles.row}>

          {/* Logo */}
          <div style={styles.logoContainer}>

            <img
              src={logo}
              alt="Runa Shimi"
              style={styles.logo}
            />

            <div style={styles.textContainer}>
              <h1 style={styles.title}>
                Runa Shimi
              </h1>

              {!isMobile && (
                <p style={styles.subtitle}>
                  Traductor Kichwa
                </p>
              )}
            </div>

          </div>

          {/* Menú escritorio */}
          {!isMobile && (
            <nav style={styles.desktopMenu}>

              <a href="#acerca" style={styles.link}>
                Acerca de
              </a>

              <a href="#diccionario" style={styles.link}>
                Diccionario
              </a>

              <a href="#cultura" style={styles.link}>
                Cultura
              </a>

            </nav>
          )}

          {/* Menú móvil */}
          {isMobile && (
            <button
              style={styles.mobileButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>
          )}

        </div>

        {/* Menú desplegable móvil */}
        {isMobile && mobileMenuOpen && (

          <nav style={styles.mobileMenu}>

            <a
              href="#acerca"
              style={styles.mobileLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Acerca de
            </a>

            <a
              href="#diccionario"
              style={styles.mobileLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Diccionario
            </a>

            <a
              href="#cultura"
              style={styles.mobileLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Cultura
            </a>

          </nav>

        )}

      </div>

    </header>
  );
};

export default Header;