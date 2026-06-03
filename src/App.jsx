import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import TranslatorPage from './pages/TranslatorPage.jsx';
import AdminPage from './pages/admin/AdminPage.jsx';

function App() {

  // Cambia a true si quieres probar el panel admin
  const esAdmin = false;

  return (
    <BrowserRouter>
      {esAdmin ? (
        <AdminPage />
      ) : (
        <TranslatorPage />
      )}
    </BrowserRouter>
  );
}

export default App;