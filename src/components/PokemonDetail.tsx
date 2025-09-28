
import React, { memo, useEffect, useState, useReducer, useMemo } from 'react'
import { Params, useParams, useNavigate, data } from 'react-router-dom'
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import reducer from '../services/reducer'
const initialState = {
  detailData: {},
}



function PokemonDetail() {
  const { id } = useParams();
  // const [Data, setData] = useState({ Poster: "", Name: "", Reirly: "", CardNo: "", Power: "", Species: "" })
  const [state, dispach] = useReducer(reducer, initialState)
  const [numbers, setNumbers] = useState()

  const { detailData } = state;





  const Detail = - useMemo(async () => {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
    //  console.log(res)
    dispach({
      type: "DETAIL_DATA", detailData: {
        Poster: `${res.data.sprites.front_default}`,
        Name: `${res.data.name}`,
        Reirly: "",
        CardNo: `${res.data.id}`,
        Power: "",
        Species: ""
      }
    })

  }, [id])
  const PaginateData = - useMemo(async () => {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10277&offset=0")
    // console.log(res.data.results)

    const nums = res.data.results.map((_, index) => index + 1);

    setNumbers(nums)



  }, [id])
  console.log(numbers)

  //const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const Navigate = useNavigate();


  // useEffect(() => {

  //   axios.get("https://pokeapi.co/api/v2/pokemon/" + id).then(res => {
  //     console.log(res.data)
  //     //setData(response.data)
  //     dispach({
  //       type: "DETAIL_DATA", detailData: {
  //         Poster: `${res.data.sprites.front_default}`,
  //         Name: `${res.data.name}`,
  //         Reirly: "",
  //         CardNo: `${res.data.id}`,
  //         Power: "",
  //         Species: ""
  //       }
  //     })

  //   })
  // })



  // useEffect(() => {
  //   axios.get("https://pokeapi.co/api/v2/pokemon/" + id).then(response => {
  //     console.log(response.data)
  //     //setData(response.data)
  //     setData({
  //       Poster: `${response.data.sprites.front_default}`,
  //       Name: `${response.data.name}`, Reirly: "",
  //       CardNo: `${response.data.id}`,
  //       Power: "",
  //       Species: ""
  //     })

  //   })

  // }, [id])
  useEffect(() => {
    Detail
    PaginateData
  }, [])
  //console.log(detailData.cardNo)
  // console.log((parseInt(id) + 1))



  // onClick = {() => { Navigate("/detail/" + User.CardNo) }



  return (
    <div className='m-5'>


      <h1 className='text-4xl'>{detailData.Name}</h1>
      <img
        srcSet={detailData.Poster} alt=""
        className='flex'
        style={{
          width: "250px",
          height: "250px",
          border: "1px solid",
          borderRadius: "20px"
        }}
      />
      <pre>movies:</pre>
      <div className='flex  flex-row items-center justify-center flex-wrap'>
        {numbers && numbers.map((item, index) => (
          //console.log(item),

          <div key={index} onClick={() => { Navigate("/detail/" + item) }} className='flex  flex-row items-center justify-center p-5 h-10 m-2 bg-blue-400 rounded' >
            <div>{item}</div>
          </div>
        ))}</div>
      {/* <button onClick={() => { Navigate(-1) }} className='border-2 p-2 rounded-lg bg-orange-400 hover:bg-orange-600'>Go Back</button>
      <button onClick={() => { Navigate("/datail/" + items[+1]) }} className='border-2 p-2 rounded-lg bg-orange-400 hover:bg-orange-600'>Go Next</button> */}
    </div >
  )
}

export default PokemonDetail