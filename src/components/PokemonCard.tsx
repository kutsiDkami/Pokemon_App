import { React, useState, useEffect, memo } from 'react'
import PokemonDetail from "./PokemonDetail"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function detailPage() {

}



function PokemonCard({ name, url, id }) {
    const [User, setUser] = useState({ Poster: "", Name: "", Reirly: "", CardNo: "", Power: "" })
    const Navigate = useNavigate();

    useEffect(() => {
        axios.get(url)
            .then(response => {
                //  console.log(response.data.abilities[1].ability.url)
                // console.log(response.data.id)
                // CardNo: `${url.substring(34, 35)}` böyle verişlebilir belki
                setUser({
                    Poster: `${response.data.sprites.front_default}`,
                    Name: `${name}`, Reirly: "",
                    CardNo: `${response.data.id}`,
                    Power: ""
                })

            })
            .catch(error => {
                // 404, 500 vs. burada yakalanır
                console.error('Error:', error.response?.status);
            });
    }, [])



    return (
        <div onClick={() => { Navigate("/detail/" + User.CardNo) }} className='w-1/4' >
            <div className='
            flex
             
            justify-center 
            items-center
          
            p-5 
            border-2  
            m-10 
            rounded-2xl border-t-orange-800 border-b-purple-800 bg-white/40'>
                <img srcSet={User.Poster}  /*alt="Pokemonİmg" */ className='w-46 ' />
                <div className=''>
                    <h2>Name: {User.Name}</h2>
                    <h2>Reirly:</h2> {/*Reirly = Nadirlik*/}
                    <h2>Card No: {User.CardNo}</h2>
                    <h2>Power:</h2>
                </div>
            </div>
        </div>
    )
}

// function PokemonCard() {
//     return (<></>)
// }

export default PokemonCard