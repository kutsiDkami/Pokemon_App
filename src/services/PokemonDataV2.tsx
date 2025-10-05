import React, { useReducer, useEffect, useState, Suspense, lazy } from 'react'
import axios from 'axios';
import { data } from 'react-router-dom';
import useInfiniteScroll from "react-infinite-scroll-hook";
const PokemonCard = lazy(() => import("../components/PokemonCard"));
import reducer from './reducer'

const initialState = {
    data: [],
    loading: false,
    Offset: 0,
    hasNextPage: true,
    //  cardNo: []
}







function PokemonDataV2() {

    const [state, dispach] = useReducer(reducer, initialState)

    const { data, loading, Offset, hasNextPage } = state;


    //const offset = 0;
    const limit = 50;


    const FirstData = async (append = false) => {
        try {
            dispach({ type: "LODING" })
            const response = await // axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10500&offset=10500`)
                axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${Offset}`)
            const nextUrl = response.data.next;
            const newData = response.data.results;
            // console.log(hasNextPage)

            if (append) {
                // console.log(append + " append çalıştı")
                dispach({
                    type: "CHANCE_DATA", data: newData, loading: false, Offset: Offset + limit, hasNextPage: !!nextUrl, error: ""
                }
                )


            } else {
                // console.log(append + " append çalıştı")
                dispach({
                    type: "FIRST_DATA", data: newData, loading: false, Offset: Offset + limit, hasNextPage: !!nextUrl, error: ""
                })
            }

        } catch (error) {
            // 404, 500 vs. burada yakalanır
            console.log(error)
            dispach({ type: "ERROR", error: error })
        }
    }


    // İlk veri
    useEffect(() => {
        FirstData(false);
    }, []);


    // Hook ile observer oluştur
    const [sentryRef] = useInfiniteScroll({
        loading,
        hasNextPage,       // daha fazla veri varsa true
        onLoadMore: () => FirstData(true),
        disabled: false,
        rootMargin: "0px 0px 200px 0px", // 100px kala tetikler
    });


    return (<>
        <div className='flex flex-wrap justify-center grid-cols-3 gap-x-8   '>


            <Suspense fallback={<div className='w-full h-full flex justify-center m-5 text-3xl'>Loading...</div>}>
                {data && data.map((data, index) => {
                    //console.log(data)
                    return <PokemonCard name={data.name} url={data.url} id={index + 1} key={index} />
                })}
            </Suspense>

            {/* Sonsuz scroll tetikleyici */}
            <div ref={sentryRef}>  </div>
        </div>
        {loading && <h4 className='flex justify-center text-3xl m-2'>Loading...</h4>}
        {/* {!loading && <h4 className='flex justify-center text-3xl m-2'>Bitti</h4>} */}

    </>
    )
}

export default PokemonDataV2