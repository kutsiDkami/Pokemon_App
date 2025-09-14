import React, { useEffect, useState } from 'react'
import PokeCard from "./components/pokecard"
import PokemonCard from './components/PokemonCard'
import "./tailwind.css"
import axios from 'axios';




function App() {
  /*{ Poster: "", Name: "", Reirly: "", CardNo: "", Power: "" }*/
  const [PokemonData, setPokemon] = useState([])

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')
      .then(response => {
        console.log(response.data.results)
        setPokemon(response.data.results)
      })
      .catch(error => {
        // 404, 500 vs. burada yakalanır
        console.error('Error:', error.response?.status);
      });
  }, [])
  return (
    <div className='flex flex-wrap justify-center'>
      {PokemonData.map((data, index) => {
        //console.log(name)
        return <PokemonCard title={data.name} url={data.url} key={index} />
      })}

    </div>
  )
}

export default App