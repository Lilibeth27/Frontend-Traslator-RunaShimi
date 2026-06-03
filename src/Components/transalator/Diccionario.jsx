// Importamos React y hooks
import React, { useState, useEffect } from "react";

// Importamos iconos
import { Search, Copy, Check } from 'lucide-react'; 

const API_URL = "http://localhost:4000/api/dictionary";

// Tonos tierra más vivos para la interfaz
const colors = ["#FFC300", "#6A994E", "#E03244", "#1D82E6", "#6c2477", "#FFC300"];

const defaultPalabras = [
  { _id: 1, source: "Gracias", target: "Yupaychani", type: "Sustantivo", color: colors[0] },
  { _id: 2, source: "Hola", target: "Imanalla", type: "Saludo", color: colors[1] },
  { _id: 3, source: "Tierra", target: "Allpa", type: "Sustantivo", color: colors[2] },
  { _id: 4, source: "Agua", target: "Yaku", type: "Sustantivo", color: colors[3] },
  { _id: 5, source: "Sol", target: "Inti", type: "Sustantivo", color: colors[4] },
  { _id: 6, source: "Luna", target: "Killa", type: "Sustantivo", color: colors[5] },
  { _id: 7, source: "Cielo", target: "Q'illqa", type: "Sustantivo", color: colors[0] },
  { _id: 8, source: "Estrella", target: "Chaska", type: "Sustantivo", color: colors[1] },
];

// Componente Diccionario
const Diccionario = () => {

  // --- ESTADOS ---
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchTerm, setSearchTerm] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [copiedId, setCopiedId] = useState(null);
  const [palabras, setPalabras] = useState(defaultPalabras);
  const [letraSeleccionada, setLetraSeleccionada] = useState(null);

  useEffect(() => {
    loadDictionary();
  }, [searchTerm]);

  const loadDictionary = async () => {
    try {
      const url = searchTerm 
        ? `${API_URL}?search=${encodeURIComponent(searchTerm)}`
        : API_URL;
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        setPalabras(data.map((p, i) => ({
          ...p,
          color: colors[i % colors.length] 
        })));
      }
    } catch (err) {
      console.error('Error loading dictionary:', err);
    }
  };

  const alfabet = ["A", "ch", "h","i", "k", "l", "ll", "m", "n", "ñ", "p", "r", "s", "sh", "t", "ts","u","w", "y"];

  const reglasLetras = {
    "k": "Reemplaza\nC y Q",
    "h": "Reemplaza\nG y J",
    "p": "Reemplaza\nB, V y F",
    "t": "Reemplaza\nD"
  };

  const handleCopy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Error al copiar", err);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPorPagina = 6;

  const busqueda = (searchTerm || '').toLowerCase();
  const palabrasFiltradas = palabras.filter(p => 
    (p.source || '').toLowerCase().includes(busqueda) || 
    (p.target || '').toLowerCase().includes(busqueda)
  );
  
  const totalPaginas = Math.ceil(palabrasFiltradas.length / itemsPorPagina);
  const ultimoIndice = paginaActual * itemsPorPagina;
  const primerIndice = ultimoIndice - itemsPorPagina;
  const itemsActuales = palabrasFiltradas.slice(primerIndice, ultimoIndice);

  const irSiguiente = () => { 
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1); 
  };

  const irAnterior = () => { 
    if (paginaActual > 1) setPaginaActual(paginaActual - 1); 
  };

  // --- ESTILOS ---
  const styles = {
    container: { 
      width: '100%', 
      maxWidth: '65rem', 
      margin: '0 auto', 
      padding: isMobile ? '1rem 0.5rem' : '2rem', 
      minHeight: '100vh', 
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 1
    },
    headerTitle: { 
      fontSize: isMobile ? '2rem' : '3rem', 
      color: '#24521c', 
      textAlign: 'center', 
      marginBottom: '2rem', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '10px',
      fontWeight: '600'
    },
    searchContainer: {
      display: 'flex',
      gap: '15px',
      width: '100%',
      maxWidth: '55rem',
      margin: '0 auto 3rem auto',
    },
    searchBoxWrapper: {
      position: 'relative',
      flex: 1,
    },
    input: { 
      width: '100%', 
      padding: '1.2rem 1rem 1.2rem 3.5rem', 
      borderRadius: '12px', 
      border: 'none', 
      fontSize: '1.1rem', 
      outline: 'none', 
      boxSizing: 'border-box',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)', 
      backgroundColor: 'white'
    },
    btnBuscar: { 
      backgroundColor: 'rgba(168, 190, 161, 0.4)', 
      border: '1px solid #7c9b73', 
      borderRadius: '12px', 
      padding: '0 2.5rem', 
      fontWeight: 'bold', 
      color: '#24521c',
      display: isMobile ? 'none' : 'block', 
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.2s ease'
    },
    alphabet: { 
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      gap: isMobile ? '10px' : '15px', 
      marginBottom: '3rem' 
    },
    letterContainer: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    letter: { 
      fontSize: '1rem', 
      fontWeight: '600', 
      color: '#1e3815', 
      cursor: 'pointer',
      width: isMobile ? '35px' : '45px', 
      height: isMobile ? '35px' : '45px',
      backgroundColor: 'white', 
      borderRadius: '50%', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)', 
      transition: 'all 0.2s ease',
    },
    letterActive: {
      border: '2px solid #5D4037',
      boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)'
    },
    tooltip: {
      position: 'absolute',
      top: '100%',
      marginTop: '8px',
      backgroundColor: 'white',
      border: '1.5px solid #5D4037',
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '0.85rem',
      color: '#5D4037',
      fontWeight: 'bold',
      textAlign: 'center',
      zIndex: 10,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      minWidth: 'max-content'
    },
    grid: { 
      display: 'grid', 
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', 
      gap: '1.2rem', 
      marginBottom: '2rem' 
    },
    // RESTAURADO: Estilo original de las tarjetas con la ola
    card: { 
      backgroundColor: 'white', 
      borderRadius: '20px', 
      border: '1.5px solid #5D4037', 
      padding: '1.2rem', 
      position: 'relative', 
      overflow: 'hidden', 
      display: 'flex', 
      flexDirection: 'column', 
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)' 
    },
    cardDecoration: (color) => ({ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '15px', 
      backgroundColor: color || '#FFC300' // Color por defecto si falla
    }),
    waveSvg: { width: '100%', height: '100%', display: 'block' },
    contentRow: { 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginTop: '10px' 
    },
    runa: { fontSize: '1.6rem', fontWeight: '900', color: '#333', margin: 0 },
    esp: { fontSize: '1rem', color: '#555', marginLeft: '8px' },
    tipo: { fontSize: '0.85rem', color: '#777', fontWeight: 'bold', margin: '5px 0 0 0' },
    copyBtn: {
      color: '#8e8e8e', 
      cursor: 'pointer', 
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5px',
      borderRadius: '8px'
    },
    paginationContainer: { 
       display: 'flex',
       alignItems: 'center', 
       justifyContent: 'center',
       gap: '0.9375rem', 
       marginTop: '1.25rem',
       paddingBottom: '1.875rem' 
    },
    pageButton: { width: '2.1875rem', height: '2.1875rem', borderRadius: '50%', border: 'none', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0.125rem 0.3125rem rgba(0,0,0,0.1)', color: '#5b4d49', fontWeight: 'bold', fontSize: '1.2rem', transition: '0.3s' },
    pageInfo: { fontSize: '1.125rem', fontWeight: 'bold', color: '#5b4d49', letterSpacing: '0.125rem' }
  };

  return (
    <div style={styles.container}>
      
      {/* Título */}
      <h1 style={styles.headerTitle}>Diccionario Runa Shimi 📖</h1>

      {/* Buscador */}
      <div style={styles.searchContainer}>
        <div style={styles.searchBoxWrapper}>
          <Search size={20} color="#888" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            style={styles.input} 
            placeholder="Buscar palabra..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value); 
              setPaginaActual(1); 
            }}
          />
        </div>
        <button style={styles.btnBuscar}>Buscar</button>
      </div>

      {/* Alfabeto */}
      <div style={styles.alphabet}>
        {alfabet.map(l => (
          <div key={l} style={styles.letterContainer}>
            <span 
              style={{
                ...styles.letter,
                ...(letraSeleccionada === l ? styles.letterActive : {})
              }}
              onClick={() => setLetraSeleccionada(letraSeleccionada === l ? null : l)}
            >
              {l}
            </span>

            {letraSeleccionada === l && reglasLetras[l] && (
              <div style={styles.tooltip}>
                {reglasLetras[l].split('\n').map((linea, index) => (
                  <div key={index}>{linea}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tarjetas con OLA DE COLORES restauradas */}
      <div style={styles.grid}>
        {itemsActuales.map((p, index) => (
          <div key={p._id || index} style={styles.card}>

            {/* Decoración superior - Aquí se aplica el color */}
            <div style={styles.cardDecoration(p.color)}>
              <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={styles.waveSvg}>
                <path d="M0,10 C15,0 35,20 50,10 C65,0 85,20 100,10 V0 H0 Z" fill="white" />
              </svg>
            </div>

            <div style={styles.contentRow}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <h2 style={styles.runa}>{p.target}</h2>
                  <span style={styles.esp}>{p.source}</span>
                </div>
                <p style={styles.tipo}>({p.type})</p>
              </div>
              
              {/* Botón copiar */}
              <div 
                style={styles.copyBtn} 
                onClick={() => handleCopy(p._id || index, p.target)}
                title="Copiar palabra"
              >
                {copiedId === (p._id || index) 
                  ? <Check size={18} color="#6A994E" /> 
                  : <Copy size={18} />
                }
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div style={styles.paginationContainer}>
        <button 
          onClick={irAnterior} 
          style={{...styles.pageButton, opacity: paginaActual === 1 ? 0.5 : 1}}
          disabled={paginaActual === 1}
        >
          ‹
        </button>

        <span style={styles.pageInfo}>
          {paginaActual} {paginaActual + 1 <= totalPaginas ? paginaActual + 1 : ''} ...
        </span>

        <button 
          onClick={irSiguiente} 
          style={{...styles.pageButton, opacity: paginaActual === totalPaginas ? 0.5 : 1}}
          disabled={paginaActual === totalPaginas}
        >
          ›
        </button>
      </div>

    </div>
  );
};

export default Diccionario;