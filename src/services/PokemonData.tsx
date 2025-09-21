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

    // const [NewCardLoding, setNewCardLoding] = useState(false);
    useEffect(() => {
        //   console.log("innerHeight:" + window.innerHeight)
        //   console.log("scrollY:" + window.scrollY)
        //   console.log("scrollHeight:" + document.documentElement.scrollHeight)

        let pageHeight = document.documentElement.scrollHeight;
        // console.log(pageHeight - (window.innerHeight + window.scrollY))

        let results = pageHeight - (window.innerHeight + window.scrollY);
        if (results <= 200) {
            //  let last = pageHeight - (window.innerHeight + window.scrollY);
            //console.log("çalıştı offset 50 ", pageHeight - (window.innerHeight + window.scrollY))

            // setNewCardLoding(true)
            setTimeout(() => {
                // console.log("çalışıyo")

                //console.log("timeout ")
                setOffset(offset + 30)
                // console.log(offset)
                //  setNewCardLoding(false)

            }, 100);
        }
        //else {
        //     console.log("why")
        // }
    }, [scrollY])
    return (
        <div className='flex flex-wrap justify-center'>
            <Suspense fallback={<div className='w-full h-full flex justify-center m-5 text-3xl'>Loading...</div>}>
                {usePokemonData.map((data, index) => {
                    // console.log(data)
                    return <PokemonCard name={data.name} url={data.url} id={index + 1} key={index} />
                })}

                {/*  <div className='w-full justify-center m-5 text-3xl' style={{ display: NewCardLoding ? 'flex' : 'none' }}>Loading...</div> */}
            </Suspense>

        </div>
    )
}

export default PokemonData