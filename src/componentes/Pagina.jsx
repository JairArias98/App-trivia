import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./Header";
import { Juego } from "./Juego";
import { Main } from "./Main";

export const Pagina = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Header} />
          <Route path="/Juego" Component={Juego} />
          <Route path="/Main" Component={Main} />
        </Routes>
      </BrowserRouter>

    </>
  );
};
