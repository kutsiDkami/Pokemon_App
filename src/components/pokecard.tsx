import { useState, useEffect } from 'react'
import axios from 'axios';
import "../tailwind.css"
function pokecard() {
  const [UserPoke, setUserPoke] = useState({ Poster: "", Name: "", Reirly: "", CardNo: "", Power: "" })
  const [FakeUser, setFakeUser] = useState([])
  // useEffect(() => {
  //   fetch('https://pokeapi.co/api/v2/pokemon/ditto')
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json.sprites.front_default)
  //       setUserPoke({
  //         Poster: `${json.sprites.front_default}`,
  //         Name: "", Reirly: "", CardNo: "", Power: ""

  //       })

  //     })
  // }, [])
  // useEffect(() => {
  //   fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=2')
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json, "?limit=20&offset=2 limit isteği atar")
  //       console.log(json.results[0].url)
  //     })
  // }, [])
  // useEffect(() => {
  //   fetch('https://pokeapi.co/api/v2/pokemon/3/')
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json, "bu bir karakter isteğidir")
  //       console.log(json.results[0].url)
  //     })
  // }, [])

  // useEffect(() => {
  //   fetch('https://pokeapi.co/api/v2/ability/1/')
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json.pokemon[0].pokemon.name)
  //       console.log(json.pokemon[0].pokemon.url)
  //     })
  // }, [])
  // useEffect(() => {
  //   fetch('https://pokeapi.co/api/v2/pokemon/44/')
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json)
  //       // console.log(json.sprites.front_default)

  //     })
  // }, [])


  // useEffect(() => {

  //   axios.get('https://jsonplaceholder.typicode.com/todos')
  //     .then(response => {
  //       console.log(response.data)
  //       setFakeUser(response.data)
  //     })
  //     .catch(error => {
  //       // 404, 500 vs. burada yakalanır
  //       console.error('Error:', error.response?.status);
  //     });
  // }, [])
  return (
    // <div className='flex flex-wrap'>
    //   <div className='p-10 border-2 w-60  m-10 rounded-2xl border-t-orange-800 border-b-purple-800'>
    //     <img srcSet={UserPoke.Poster} alt="deneme" />
    //     <div className=''>
    //       <h2>Name:</h2>
    //       <h2>Reirly:</h2> {/*Reirly = Nadirlik*/}
    //       <h2>Card No:</h2>
    //       <h2>Power:</h2>
    //     </div>
    //   </div>
    <div>
      {
        FakeUser.map((user, index) => {
          // console.log(user)
          return (<div className='p-10 border-2 w-60  m-10 rounded-2xl border-t-orange-800 border-b-purple-800'>
            <img srcSet="" alt="deneme" />
            <div className=''>
              <h2>Name:</h2>
              <h2>Reirly:</h2> {/*Reirly = Nadirlik*/}
              <h2>Card No:</h2>
              <h2>Power:</h2>
            </div>
          </div>)
        })
      }

    </div>
  )
}

export default pokecard