// import React, { useEffect, useState, lazy, Suspense } from 'react'
// import PokeCard from "./components/pokecard"
// import PokemonCard from "./components/PokemonCard"
// import "./tailwind.css"
// import NavBar from './components/NavBar';

// const PokemonData = React.lazy(() => import("./services/PokemonData"));


// function App() {

//   return (
//     <div >
//       <NavBar />
//       <PokemonData />
//     </div>
//   )
// }

// export default App


//Todo router yapısı

import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

const PokemonData = React.lazy(() => import("./services/PokemonData"));
import PokemonDetail from "./components/PokemonDetail";
import NavBar from "./components/NavBar";
import "./tailwind.css"


function App() {
  return (
    <>
      <div >
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PokemonData />} />
            <Route path='/detail/:id' element={<PokemonDetail />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App







