import { React, useState, useEffect, memo } from 'react'
import PokemonDetail from "./PokemonDetail"
import axios from 'axios';

function detailPage() {
    return <PokemonDetail />
}



function PokemonCard({ name, url, id }) {
    const [User, setUser] = useState({ Poster: "", Name: "", Reirly: "", CardNo: "", Power: "" })

    useEffect(() => {
        axios.get(url)
            .then(response => {
                //  console.log(response.data.abilities[1].ability.url)

                // CardNo: `${url.substring(34, 35)}` böyle verişlebilir belki
                setUser({
                    Poster: `${response.data.sprites.front_default}`,
                    Name: `${name}`, Reirly: "",
                    CardNo: `${id}`,
                    Power: ""
                })

            })
            .catch(error => {
                // 404, 500 vs. burada yakalanır
                console.error('Error:', error.response?.status);
            });
    }, [])


    return (
        <div onClick={detailPage} >
            <div className='p-10 border-2 w-60  m-10 rounded-2xl border-t-orange-800 border-b-purple-800 bg-white/40'>
                <img srcSet={User.Poster} alt="deneme" className='w-46 ' />
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