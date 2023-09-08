import React from 'react';
import {  useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { useTrivia } from '../Context/ContextGlobal';

export const Main = () => {
  const navigate = useNavigate(); 
  const { reiniciarJuego } = useTrivia();

  const iniciarNuevoJuego = () => {
    reiniciarJuego();
    navigate('/Juego'); 
  };

  return (
    <>
      <Header />

      <main className="container">
        <h1>Bienvenido a Trivia</h1>
        <button onClick={iniciarNuevoJuego} className="btn-jugar">
          JUGAR
        </button>
      </main>
    </>
  );
};
