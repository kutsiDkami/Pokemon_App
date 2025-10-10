
import React, { useEffect, useState, useReducer, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import "./pagination.css";
import reducer from '../services/reducer'
import { stringify } from 'postcss';

import PaidionData from "./PaidionData"
import { string } from 'prop-types';

const initialState = {
  detailData: {},

}


function PokemonDetail() {

  const { id } = useParams();

  const [state, dispach] = useReducer(reducer, initialState)


  const { detailData } = state;
  const Navigate = useNavigate();


  window.addEventListener("load", () => {
    //? sayfanın yenilenmesini dinler ve adresini değiştirir
    Navigate("/")
  })


  //? id gelmediği sürece sadece 1 kez çalışır pokemonu çeker 
  const Detail = useMemo(async () => {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon-form/" + id)

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




  //---------------------------------Pagination 4 lü üst kısım-------------------------------//

  const [posts, setPosts] = useState([]);
  //? Şu anki sayfa (react-paginate 0’dan başlatır)
  const [currentPage, setCurrentPage] = useState(0);

  //? Sayfa başına gösterilecek veri miktarı
  const postsPerPage = 4; // gelen sayfa başına gösterilecek öğe sayısı

  //? useEffect: component yüklendiğinde sadece 1 kez çalışacak
  useEffect(() => {
    const fetchPosts = async () => {
      //? JSONPlaceholder API → toplam 1527 pokemon döner
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon-form?limit=10502&offset=0");
      //console.log(res.data.results.length)
      setPosts(res.data.results); //? tüm veriyi state’e koy
    };
    fetchPosts();
  }, []);

  //? Gösterilecek verileri hesapla (slice ile sayfaya göre ayırıyoruz)
  const offset = currentPage * postsPerPage; //? hangi index’ten başlayacak
  const currentPosts = posts.slice(offset, offset + postsPerPage); //? o sayfanın verisi
  let pageCount = Math.ceil(posts.length / postsPerPage); //? toplam sayfa sayısı

  //? Sayfa değiştiğinde çalışacak fonksiyon
  const handlePageClick = (e: any) => {
    //? react-paginate bize { selected: index } döner
    setCurrentPage(e.selected);

  };

  //----------------------------Route Dom manupuletation------------------//
  const newRouteDom = (e: any) => {
    //? react-paginate bize { selected: index } döner
    //console.log(e)

    Navigate("/detail/" + (e.selected + 1))  // Sayfa yenileme
  };

  const [numbers, setNumbers] = useState(5);



  //? 2.Pagination RouteDom yeniler ve bunun için tüm  
  useEffect(() => {
    const RouterPagiation = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon-form?limit=10502&offset=0")
      // console.log(res.data.results)

      // const nums = res.data.results.map((_, index) => index + 1);
      const nums = res.data.results.map((data: any, index: number) => {
        return parseInt(data.url.split("/")[6])
      });
      //  console.log(nums.length - 1) hata veriyo
      setNumbers(nums[nums.length - 1])
    }
    RouterPagiation();
  }, []);

  //? kontrol
  //console.log(numbers)


  useEffect(() => {
    Detail

  }, [])


  return (
    <div className='m-5'>


      {/* Gösterilen Pokemonlar  4 lü kısım*/}
      <div className='flex flex-wrap justify-center border-1 rounded-2xl m-1 bg-[linear-gradient(45deg,red,green)]  '>
        {currentPosts?.map((data: any, index: number) => {
          // console.log(data)
          return <PaidionData name={data.name} url={data.url} id={index + 1} key={index} />
        })}
      </div>

      {/*  4 lü kısımın Pagination'ı */}
      <ReactPaginate
        //? “Önceki” butonunun yazısı
        previousLabel={"← Önceki"}
        //? “Sonraki” butonunun yazısı
        nextLabel={"Sonraki →"}
        //? Ara noktaları için (…) göstermek
        breakLabel={"..."}
        //? Toplam sayfa sayısı
        pageCount={pageCount}
        //? Başta ve sonda gösterilecek sayfa numarası
        marginPagesDisplayed={2}
        //? Orta kısımda gösterilecek sayfa numarası
        pageRangeDisplayed={3}
        //? Sayfa değiştiğinde çalışacak fonksiyon
        onPageChange={handlePageClick}
        //? CSS classları
        containerClassName={"pagination"} //? Ana container
        activeClassName={"active"} //? Aktif sayfa
      />

      {/* Detay sayfası */}
      <div className='flex flex-col  items-center m-10 justify-center '>
        <h1 className='text-4xl m-2'>{detailData.Name}</h1>

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
      </div>
      {/*  RouterDom Paginate */}
      <ReactPaginate
        //? “Önceki” butonunun yazısı
        previousLabel={"← Önceki"}
        //? “Sonraki” butonunun yazısı
        nextLabel={"Sonraki →"}
        //? Ara noktaları için (…) göstermek
        breakLabel={"..."}
        //? Başlangıç sayfası seçme
        initialPage={(parseInt(id) - 1)}
        //? Toplam sayfa sayısı
        // pageCount={numbers ? numbers : pageCount}
        pageCount={numbers}
        //? Başta ve sonda gösterilecek sayfa numarası
        marginPagesDisplayed={2}
        //? Orta kısımda gösterilecek sayfa numarası
        pageRangeDisplayed={3}
        //? Sayfa değiştiğinde çalışacak fonksiyon
        onPageChange={newRouteDom}
        //? CSS classları
        containerClassName={"pagination"} //? Ana container
        activeClassName={"active"} //? Aktif sayfa
      />

    </div >
  )
}

export default PokemonDetail