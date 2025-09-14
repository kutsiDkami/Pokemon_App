import { React, useState, useEffect } from 'react'
import axios from 'axios';

function PokemonCard({ name, url }) {
    const [User, setUser] = useState({ Poster: "", Name: "", Reirly: "", CardNo: "", Power: "" })

    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log(response.data)
                setUser({
                    Poster: `${response.data.sprites.front_default}`,
                    Name: `${name}`, Reirly: "", CardNo: "", Power: ""
                })

            })
            .catch(error => {
                // 404, 500 vs. burada yakalanır
                console.error('Error:', error.response?.status);
            });
    }, [])


    return (
        <div >
            <div className='p-10 border-2 w-60  m-10 rounded-2xl border-t-orange-800 border-b-purple-800'>
                <img srcSet={User.Poster} alt="deneme" />
                <div className=''>
                    <h2>Name: {name}</h2>
                    <h2>Reirly:</h2> {/*Reirly = Nadirlik*/}
                    <h2>Card No:</h2>
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