import React, { useEffect, useState, lazy, Suspense } from 'react'
//import PokeCard from "./components/pokecard"
//import PokemonCard from "./components/PokemonCard"
import "./tailwind.css"
import NavBar from './components/NavBar';

const PokemonData = React.lazy(() => import("./services/PokemonData"));


function App() {

  return (
    <div >
      <NavBar />
      <PokemonData />
    </div>
  )
}

export default App