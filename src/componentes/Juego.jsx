import React, { useEffect } from "react";
import { useTrivia } from "../Context/ContextGlobal";
import { Header } from "./Header";

export const Juego = () => {
  const {
    fetchTrivia,
    preguntaActual,
    tiempoRestante,
    respuestaSeleccionada,
    respuestaCorrecta,
    setRespuestaSeleccionada,
    setRespuestaCorrecta,
    avanzarPregunta,
    puntos,
    sumarPuntos,
    preguntasMostradas,
    finalizarJuego,
    reiniciarJuego,
    aprobado,
    juegoReiniciado,
    comodinUtilizado,
    usarComodin,
  } = useTrivia();

  const totalPreguntas = 5;

  useEffect(() => {
    fetchTrivia();
  }, [fetchTrivia]);

  useEffect(() => {
    if (preguntaActual && tiempoRestante === 0) {
      if (preguntasMostradas >= totalPreguntas) {
        finalizarJuego();
        return;
      }

      avanzarPregunta();
      setRespuestaSeleccionada(null);
      setRespuestaCorrecta(null);
      fetchTrivia();
    }
  }, [
    preguntaActual,
    tiempoRestante,
    setRespuestaSeleccionada,
    setRespuestaCorrecta,
    fetchTrivia,
    preguntasMostradas,
    avanzarPregunta,
    finalizarJuego,
    totalPreguntas,
  ]);

  useEffect(() => {
    if (juegoReiniciado) {
      setRespuestaSeleccionada(null);
      setRespuestaCorrecta(null);
      avanzarPregunta();
      fetchTrivia();
    } else {
      fetchTrivia();
    }
  }, [
    juegoReiniciado,
    setRespuestaSeleccionada,
    setRespuestaCorrecta,
    avanzarPregunta,
    fetchTrivia,
  ]);

  const verificarRespuesta = (opcion) => {
    if (preguntasMostradas === totalPreguntas) {
      return;
    }

    if (preguntaActual.respuesta === opcion) {
      setRespuestaCorrecta(opcion);
      sumarPuntos(10);
    } else {
      setRespuestaCorrecta(preguntaActual.respuesta);
    }
    setRespuestaSeleccionada(opcion);
  };

  const renderOpciones = () => {
    if (preguntasMostradas === totalPreguntas) {
      return null;
    }

    const opciones = ["A", "B", "C", "D"];

    return opciones.map((opcion, id) => {
      if (preguntaActual[opcion] !== null) {
        return (
          <button
            key={id}
            className={`preguntas-btn ${
              respuestaSeleccionada === opcion
                ? respuestaCorrecta === opcion
                  ? "verde"
                  : "rojo"
                : ""
            }`}
            onClick={() => {
              verificarRespuesta(opcion);
            }}
            disabled={respuestaSeleccionada !== null}
          >
            {opcion}: {preguntaActual[opcion]}
          </button>
        );
      }
      return null;
    });
  };

  const mostrarPregunta = () => {
    if (
      preguntasMostradas < totalPreguntas ||
      (preguntasMostradas === totalPreguntas && preguntaActual)
    ) {
      if (preguntaActual) {
        return (
          <div className="pregunta">
            <h3>{preguntaActual.pregunta}</h3>
            {renderOpciones()}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <>
      <Header />
      <section className="contenedor-juego">
        <article className="contenedor-preg">
          <article className="cont-pregunta">{mostrarPregunta()}</article>

          <div className="mensj-pantalla">
            {preguntasMostradas === totalPreguntas && (
              <div>
                <h2>
                  {aprobado ? (
                    <span className="aprobado">Haz Aprobado</span>
                  ) : (
                    <span className="reprobado">Haz Reprobado</span>
                  )}
                </h2>
              </div>
            )}
            {preguntasMostradas === totalPreguntas && (
              <div className="resultado">
                <button onClick={reiniciarJuego}>Reiniciar</button>
              </div>
            )}
          </div>
        </article>

        <section className="seccion-2">
          <section className="preguntas">
            <p>
              Pregunta {preguntasMostradas + 1} de {totalPreguntas}
            </p>
          </section>

          <p className="puntos">Puntos: {puntos}</p>
          <p className="punt-aprobar">Para Aprobar se Necesitan 30 Puntos</p>

          <section className="tiempo">
            <h3>
              Tiempo : <span>{tiempoRestante} Segundos</span>
            </h3>
          </section>

          <section className="comodin">
            <button onClick={usarComodin} disabled={comodinUtilizado}>
              Usar Comodín
            </button>
          </section>
        </section>
      </section>
    </>
  );
};
