import React, { useReducer, memo, useEffect, useState, Suspense, lazy } from 'react'
import axios from 'axios';
const PokemonCard = React.lazy(() => import("../components/PokemonCard"));



/*{ Poster: "", Name: "", Reirly: "", CardNo: "", Power: "" }*/



function PokemonData() {

    const [usePokemonData, setUsePokemon] = useState([])
    const [scrollY, setScrollY] = useState(0)
    const [offset, setOffset] = useState(0)

    window.addEventListener("scroll", () => {
        setScrollY(window.scrollY)

    });

    let limit = 50; //gelen verinin sonu
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            .then(response => {
                // console.log(response.data.results)
                // setUsePokemon([...usePokemonData, ...response.data.results]);
                setUsePokemon(usePokemonData => [...usePokemonData, ...response.data.results])
                // setUsePokemon(usePokemonData => [...state.usePokemonData, ...response.data.results])

            })
            .catch(error => {
                // 404, 500 vs. burada yakalanır
                console.error('Error:', error.response?.status);
            });
    }, [offset])
    useEffect(() => {
        //   console.log("innerHeight:" + window.innerHeight)
        //   console.log("scrollY:" + window.scrollY)
        //   console.log("scrollHeight:" + document.documentElement.scrollHeight)

        let pageHeight = document.documentElement.scrollHeight;
        // console.log(pageHeight - (window.innerHeight + window.scrollY))

        if (pageHeight - (window.innerHeight + window.scrollY) <= 50) {
            //  let last = pageHeight - (window.innerHeight + window.scrollY);
            //console.log("çalıştı offset 50 ", pageHeight - (window.innerHeight + window.scrollY))
            setOffset(offset + 9)
            console.log(offset)
            //  console.log(offset)
        }
        //else {
        //     console.log("why")
        // }
    }, [scrollY])
    return (
        <div className='flex flex-wrap justify-center'>
            <Suspense fallback={<div>Loading...</div>}>
                {usePokemonData.map((data, index) => {
                    // console.log(data)
                    return <PokemonCard name={data.name} url={data.url} key={index} />
                })}
            </Suspense>
        </div>
    )
}

export default PokemonData