import { create } from "zustand";
import preguntas from "./preguntas.json";

export const useTrivia = create((set) => ({
  triviaData: preguntas,
  preguntaActual: null,
  tiempoRestante: 10,
  temporizador: null,
  respuestaSeleccionada: null,
  respuestaCorrecta: null,
  puntos: 0,
  preguntasMostradas: 0,
  juegoFinalizado: false,
  juegoReiniciado: false,
  juegoPausado: false,
  mostrarBotones: false,
  aprobado: false,
  comodinUtilizado: false,

  setRespuestaSeleccionada: (respuesta) =>
    set(() => ({ respuestaSeleccionada: respuesta })),
  setRespuestaCorrecta: (correcta) =>
    set(() => ({ respuestaCorrecta: correcta })),

  fetchTrivia: () => {
    seleccionarPregunta(set);
  },

  sumarPuntos: (cantidad) =>
    set((state) => ({ puntos: state.puntos + cantidad })),

  avanzarPregunta: () =>
    set((state) => {
      if (!state.juegoFinalizado) {
        return { preguntasMostradas: state.preguntasMostradas + 1 };
      }
    }),

  finalizarJuego: () =>
    set((state) => ({
      juegoFinalizado: state.preguntasMostradas === 2,
      juegoPausado: true,
      mostrarBotones: true,
      aprobado: state.puntos >= 30,
      preguntaActual: null,
      respuestaSeleccionada: null,
    })),

  reiniciarJuego: () => {
    set({
      triviaData: preguntas,
      juegoFinalizado: false,
      juegoReiniciado: true,
      puntos: 0,
      preguntasMostradas: 0,
      juegoPausado: false,
      mostrarBotones: false,
      aprobado: false,
      comodinUtilizado: false,
    });
    seleccionarPregunta(set);
  },

  pausarJuego: () => set(() => ({ juegoPausado: true, preguntaActual: null })),

  reanudarJuego: () => {
    set(() => ({ juegoPausado: false, tiempoRestante: 10 }));
    seleccionarPregunta(set);
  },

  usarComodin: () => {
    set((state) => {
      if (!state.comodinUtilizado && state.preguntaActual) {
        const opciones = ["A", "B", "C", "D"];

        const opcionesActuales = [...opciones];

        const respuestaCorrecta = state.preguntaActual.respuesta;

        opcionesActuales.splice(opcionesActuales.indexOf(respuestaCorrecta), 1);

        const randomIndex1 = Math.floor(
          Math.random() * opcionesActuales.length
        );
        const opcionIncorrecta1 = opcionesActuales.splice(randomIndex1, 1)[0];
        const randomIndex2 = Math.floor(
          Math.random() * opcionesActuales.length
        );
        const opcionIncorrecta2 = opcionesActuales.splice(randomIndex2, 1)[0];

        const nuevaPregunta = { ...state.preguntaActual };
        nuevaPregunta[opcionIncorrecta1] = null;
        nuevaPregunta[opcionIncorrecta2] = null;

        return {
          comodinUtilizado: true,
          preguntaActual: nuevaPregunta,
        };
      }
      return {};
    });
  },
}));

const seleccionarPregunta = (set) => {
  const { triviaData, juegoPausado, preguntasMostradas, juegoReiniciado } =
    useTrivia.getState();

  if (juegoReiniciado) {
    set({
      preguntasMostradas: 0,
      juegoReiniciado: false,
    });
  }

  if (!juegoPausado && triviaData && preguntasMostradas < 5) {
    const keys = Object.keys(triviaData);
    if (keys.length > 0) {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      const preguntaAleatoria = triviaData[randomKey];
      set({
        preguntaActual: preguntaAleatoria,
        tiempoRestante: 10,
      });

      if (useTrivia.getState().temporizador) {
        clearInterval(useTrivia.getState().temporizador);
      }

      const temporizador = setInterval(() => {
        const { tiempoRestante, juegoPausado, preguntasMostradas } =
          useTrivia.getState();
        if (!juegoPausado && preguntasMostradas < 5) {
          if (tiempoRestante === 0) {
            clearInterval(temporizador);
            set({ tiempoRestante: 10 });
          } else {
            set({ tiempoRestante: tiempoRestante - 1 });
          }
        } else {
          clearInterval(temporizador);
        }
      }, 1000);

      set({ temporizador });
    }
  }
};
