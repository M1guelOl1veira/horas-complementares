import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Registrar from './components/Registrar/Registrar';
import RegistrarAtividade from './components/RegistrarAtividade/RegistrarAtividade';
import PainelProfessor from './components/PainelProfessor/PainelProfessor';
import AnaliseAtividade from './components/AnaliseAtividade/AnaliseAtividade';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registrar" element={<Registrar />} />
      <Route path="/registrarAtividade" element={<RegistrarAtividade />} />
      <Route path="/painelProfessor" element={<PainelProfessor />} />
      <Route path="/analiseAtividade" element={<AnaliseAtividade />} />
      <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;