// Importamos React y los hooks necesarios
import React, { useState, useEffect } from 'react';

// Importamos iconos
import { ArrowLeftRight, RefreshCw, Copy } from 'lucide-react';



const API_URL = "http://localhost:4000/api";
const translateAPI = API_URL + "/translate";

// Componente principal del Traductor
const Traductor = ({ onGoToLogin }) => {

  // Texto que escribe el usuario
  const [text, setText] = useState('');

  // Texto traducido (resultado)
  const [translatedText, setTranslatedText] = useState('');

  // Detecta si es móvil
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Controla el idioma 
  const [isEspanolToRuna, setIsEspanolToRuna] = useState(true);

  // Estado de carga
  const [loading, setLoading] = useState(false);

  // Error
  const [error, setError] = useState('');

  // Escucha el cambio de tamaño de pantalla para actualizar isMobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función para traducir
  const handleTranslate = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const direction = isEspanolToRuna ? 'espanolToRuna' : 'runaToEspanol';
      
      const response = await fetch(translateAPI, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': token } : {})
        },
        body: JSON.stringify({ text, direction })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTranslatedText(data.data.translated_text || data.data);
      } else {
        setError(data.error || 'Error en traducción');
      }
    } catch (err) {
      setError('No se pudo conectar al servidor');
    } finally {
      setLoading(false);
    }
  };

  // Función para intercambiar idiomas
  const handleSwapLanguages = () => {
    // Cambia el estado del idioma
    setIsEspanolToRuna(!isEspanolToRuna); 
    
    // Intercambia el texto escrito con la traducción
    const tempText = text;
    setText(translatedText);
    setTranslatedText(tempText);
  };

  // Estilos en CSS en JS
  const styles = {
    container: {
      flex: 1,
      width: '100%',
      minHeight: '100vh',
      overflowY: 'auto',
      paddingTop: '2.5rem',
      paddingRight: isMobile ? '0.9375rem' : '1.25rem',
      paddingBottom: '1.25rem',
      paddingLeft: isMobile ? '1rem' : '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
      
      
      
    },
    headerText: {
      textAlign: 'center',
      color: '#3b6d2a',
      width: '100%',
      maxWidth: '37.5rem',
      marginBottom: '1.5625rem',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
    },
    card: {
      backgroundColor: '#f9faf7', 
      width: '100%',
      maxWidth: '53.125rem', 
      borderRadius: '1.875rem',
      padding: isMobile ? '1.25rem' : '2.1875rem',
      boxShadow: '0 0.25rem 0.9375rem rgba(0,0,0,0.06)',
      border: '0.0625rem solid #66830e',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      
    },
    langLabel: {
      backgroundColor: '#3b6d2a', 
      color: 'white',
      padding: '0.5rem 1.5625rem',
      borderRadius: '0.75rem',
      fontWeight: 'bold',
      fontSize: '1rem',
      display: 'inline-block',
      marginBottom: '0.625rem' 
    },
    textareaWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      border: '0.0625rem solid #4444',
      borderRadius: '0.9375rem',
      padding: '0.9375rem',
      minHeight: isMobile ? '7.5rem' : '11.25rem',
      outline: 'none',
      resize: 'none',
      fontSize: '1rem',
      color: '#444',
      boxSizing: 'border-box', 
      fontFamily: 'inherit',
      backgroundColor: '#f0f6ed'
      
    },
    footerRow: {
      display: 'flex',
      justifyContent: 'space-between', 
      alignItems: 'center',
      marginTop: '0.5rem',
      padding: '0 0.3125rem',
      color: '#888',
      fontSize: '0.8rem'
    },
    swapCircle: {
      backgroundColor: 'white',
      border: '0.0625rem solid #f4e6d4',
      borderRadius: '50%',
      width: '2.8125rem',
      height: '2.8125rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#3b6d2a',
      margin: isMobile ? '0.9375rem auto' : '0 auto', 
      cursor: 'pointer',
    },
    btnTranslate: {
      backgroundColor: '#3d8c56', 
      color: 'white',
      border: 'none',
      padding: '0.75rem 2.1875rem',
      borderRadius: '1.875rem',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '0.625rem',
      cursor: 'pointer',
      margin: '1.5625rem auto 0'
    },
    pcHeaderGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      justifyItems: 'center',
      gap: '1.25rem',
      marginBottom: '0.9375rem'
    },
    pcInputsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.875rem',
      width: '100%'
    },
    mainWhiteBox: {
      backgroundColor: '#f6f7f3', 
      width: '100%',
      maxWidth: '65rem',
      borderRadius: '1.5rem',
      padding: isMobile ? '2rem 1rem' : '3rem 4rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: '0 10px 40px rgba(0,0,0,0.08)', 
      margin: '0 auto', 
    },
  };

  // Render del componente
 // Render del componente
  return (
    <div style={styles.container}>
      
      {/* EL CUADRO BLANCO GRANDE QUE ENVUELVE TODO */}
      <div style={styles.mainWhiteBox}>
        
        {/* TÍTULO Y DESCRIPCIÓN (Ahora están DENTRO del cuadro blanco) */}
        <div id="traductor" style={styles.headerText}>
          <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Traductor De Runa Shimi</h1>
          <p style={{ color: '#666', fontSize: '1rem', marginTop: '0' }}>
            Conecta con las raíces ancestrales a través de la lengua Runa Shimi.
          </p>
        </div>

        {/* TARJETA DE LOS INPUTS (Transparente y sin bordes) */}
        <div style={styles.card}>
          
          {/* VISTA MÓVIL  */}
          {isMobile ? (
            <>
              {/* TEXTO DE ORIGEN */}
              <div style={styles.textareaWrapper}>
                <div style={{alignSelf: 'flex-start'}}>
                  <div style={styles.langLabel}>
                    {isEspanolToRuna ? 'ESPAÑOL' : 'RUNA SHIMI'}
                  </div>
                </div>
                <textarea 
                  style={styles.textarea}
                  placeholder={isEspanolToRuna ? "Escribe aquí en español..." : "Escribe aquí en runa shimi..."}
                  value={text} 
                  onChange={(e) => setText(e.target.value)}  
                  maxLength={300}
                />
                <div style={styles.footerRow}>
                  <span>{text.length}/300</span>
                </div>
              </div>

              {/* Botón intercambiar idioma  */}
              <div style={styles.swapCircle} onClick={handleSwapLanguages}> 
                <ArrowLeftRight size={20} />
              </div>

              {/* TEXTO TRADUCIDO */}
              <div style={styles.textareaWrapper}>
                <div style={{alignSelf: 'flex-start'}}>
                  <div style={styles.langLabel}>
                    {isEspanolToRuna ? 'RUNA SHIMI' : 'ESPAÑOL'}
                  </div>
                </div>
                <textarea 
                  style={styles.textarea}
                  placeholder="La traducción aparecerá aquí..."
                  value={translatedText}
                  readOnly
                />
                <div style={styles.footerRow}>
                  <span></span> 
                  <Copy size={18} style={{cursor: 'pointer'}} />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* VISTA PC */}
              <div style={styles.pcHeaderGrid}>
                <div style={styles.langLabel}>
                  {isEspanolToRuna ? 'ESPAÑOL' : 'RUNA SHIMI'}
                </div>

                {/* BOTÓN INTERCAMBIO */}
                <div style={styles.swapCircle} onClick={handleSwapLanguages}>
                  <ArrowLeftRight size={20} />
                </div>

                <div style={styles.langLabel}>
                  {isEspanolToRuna ? 'RUNA SHIMI' : 'ESPAÑOL'}
                </div>
              </div>

              {/* INPUTS */}
              <div style={styles.pcInputsGrid}>
                {/* ORIGEN */}
                <div style={styles.textareaWrapper}>
                  <textarea 
                    style={styles.textarea}
                    placeholder={isEspanolToRuna ? "Escribe aquí en español..." : "Escribe aquí en runa shimi..."}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={300}
                  />
                  <div style={styles.footerRow}>
                    <span>{text.length}/300</span>
                  </div>
                </div>

                {/* DESTINO */}
                <div style={styles.textareaWrapper}>
                  <textarea 
                    style={styles.textarea}
                    placeholder="La traducción aparecerá aquí..."
                    value={translatedText}
                    readOnly
                  />
                  <div style={styles.footerRow}>
                    <span></span>
                    <Copy size={20} style={{cursor: 'pointer'}} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* BOTÓN TRADUCIR */}
          <button 
            style={{...styles.btnTranslate, opacity: loading ? 0.7 : 1}} 
            onClick={handleTranslate}
            disabled={loading}
          >
            {loading ? 'Traduciendo...' : 'Traducir'} 
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>

          {/* Error */}
          {error && <p style={{color: 'red', marginTop: '0.5rem', textAlign: 'center'}}>{error}</p>}

        </div>
      </div> 
      {/* FIN DEL CUADRO BLANCO GRANDE */}


    </div> 
  );
};

export default Traductor;