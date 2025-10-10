import React, { useEffect } from 'react'
import axios from 'axios';

function PaidionData(proms: any) {

  const { name, url, id } = proms;
  const [newPosters, setNewPosters] = React.useState("")

  useEffect(() => {
    async function fetchData() {
      const newUrlId = url.split("/")[6]
      //    console.log(newUrlId) //? Veri kontrolü
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon-form/" + newUrlId);
      //  console.log(res.data.sprites.front_default);
      // setData(res.data);
      setNewPosters(res.data.sprites.front_default)
    } fetchData();
  }, [url])

  //https://pokeapi.co/api/v2/pokemon-form/2/

  return (
    <div >
      <div className='
            flex
            flex-col
            justify-center 
            items-center
            w-46
            p-5 
            m-10 
            rounded-2xl  bg-white/40'>
        <img srcSet={newPosters}  /*alt="Pokemonİmg" */ className='w-46 ' />
        <div className=''>
          <h2>Name: {name}</h2>

        </div>
      </div>
    </div>
  )
}

export default PaidionData