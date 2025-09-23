
import React, { memo, useEffect, useState } from 'react'
import { Params, useParams } from 'react-router-dom'
import axios from 'axios';
function PokemonDetail() {
  const { id } = useParams();
  const [Data, setData] = useState({ Poster: "", Name: "", Reirly: "", CardNo: "", Power: "", Species: "" })

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/" + id).then(response => {
      console.log(response.data)
      //setData(response.data)
      setData({
        Poster: `${response.data.sprites.front_default}`,
        Name: `${response.data.name}`, Reirly: "",
        CardNo: `${response.data.id}`,
        Power: "",
        Species: ""
      })

    })

  }, [id])
  console.log(Data)







  return (
    <div className='m-5'>
      <h1 className='text-4xl'>{Data.Name}</h1>
      <img
        srcSet={Data.Poster} alt=""
        className='flex'
        style={{
          width: "250px",
          height: "250px",
          border: "1px solid",
          borderRadius: "20px"
        }}
      />
      <pre>movies:</pre>

    </div>
  )
}

export default PokemonDetail