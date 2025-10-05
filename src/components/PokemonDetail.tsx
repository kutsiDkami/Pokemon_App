
import React, { memo, useEffect, useState, useReducer, useMemo } from 'react'
import { Params, useParams, useNavigate, data } from 'react-router-dom'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import "./pagination.css";
import reducer from '../services/reducer'
import { stringify } from 'postcss';
const initialState = {
  detailData: {}

  // currentPage: 0,// Şu anki sayfa
  // postsPerPage: 10,// Sayfa başına gösterilecek öğe sayısı
  // totalPosts: 0
}

import PaidionData from "./PaidionData"
import { string } from 'prop-types';



function PokemonDetail() {


  const { id } = useParams();
  // const [Data, setData] = useState({ Poster: "", Name: "", Reirly: "", CardNo: "", Power: "", Species: "" })
  const [state, dispach] = useReducer(reducer, initialState)
  //const [numbers, setNumbers] = useState()
  // const [currentPage, setCurrentPage] = useState(0)  // Toplam öğe sayısı
  // Sayfa başına gösterilecek öğe sayısı
  // Şu anki sayfa

  // const { detailData, currentPage, postsPerPage, totalPosts } = state;

  const { detailData } = state;
  const Navigate = useNavigate();


  const Detail = useMemo(async () => {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon-form/" + id)
    // const res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
    // console.log("resForm ",resForm)
    //  console.log("res ",res)
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



  // // Tüm postları tutacağımız state
  // const [posts, setPosts] = useState([]);
  // // Toplam sayfa sayısı (API’den gelen toplam kayda göre hesaplanır)
  // const [pageCount, setPageCount] = useState(0);
  // // Şu anki aktif sayfa (ReactPaginate ile 0’dan başlıyor)
  // const [currentPage, setCurrentPage] = useState(0);



  // // Sayfa başına gösterilecek veri miktarı
  // const postsPerPage = 10;

  // // useEffect: component yüklendiğinde VE sayfa değiştiğinde çalışacak
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     // JSONPlaceholder API’si sayfalama destekliyor (_page ve _limit query parametreleri ile)
  //     // Burada currentPage + 1 yapıyoruz çünkü ReactPaginate sayfa indexini 0’dan başlatıyor.
  //     const res = await axios.get(
  //       `https://pokeapi.co/api/v2/pokemon?limit=${postsPerPage}&offset=${currentPage + 1}`
  //     );

  //     // API’den dönen verileri state’e set ediyoruz
  //     //   console.log(res.data.results)
  //     setPosts(res.data.results);

  //     // Normalde toplam veri sayısını API “X-Total-Count” header’ında gönderir.
  //     // JSONPlaceholder sabit 100 veri döndüğü için burada elle yazıyoruz.
  //     const total = 10277;
  //     setPageCount(Math.ceil(total / postsPerPage));
  //   };

  //   fetchPosts();
  // }, [currentPage]); // currentPage değişince yeni istek atar

  // // Sayfa değişiminde çalışacak fonksiyon
  // const handlePageClick = (e: any) => {
  //   // react-paginate bize { selected: index } şeklinde parametre gönderiyor
  //   setCurrentPage(e.selected);
  // };

  //---------------------------------New-Yapı-------------------------------//

  const [posts, setPosts] = useState([]);
  //! Şu anki sayfa (react-paginate 0’dan başlatır)
  const [currentPage, setCurrentPage] = useState(0);

  //! Sayfa başına gösterilecek veri miktarı
  const postsPerPage = 4; // gelen sayfa başına gösterilecek öğe sayısı

  //! useEffect: component yüklendiğinde sadece 1 kez çalışacak
  useEffect(() => {
    const fetchPosts = async () => {
      //! JSONPlaceholder API → toplam 100 post döner
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10277&offset=0");
      // console.log(res.data.results)
      setPosts(res.data.results); //! tüm veriyi state’e koy
    };
    fetchPosts();
  }, []);

  //! Gösterilecek verileri hesapla (slice ile sayfaya göre ayırıyoruz)
  const offset = currentPage * postsPerPage; //! hangi index’ten başlayacak
  const currentPosts = posts.slice(offset, offset + postsPerPage); //! o sayfanın verisi
  let pageCount = Math.ceil(posts.length / postsPerPage); //! toplam sayfa sayısı

  //! Sayfa değiştiğinde çalışacak fonksiyon
  const handlePageClick = (e) => {
    //! react-paginate bize { selected: index } döner
    setCurrentPage(e.selected);
    // console.log(parseInt(detailData.CardNo) + 1)
    //console.log(e)
    //Navigate("/detail/" + (parseInt(detailData.CardNo) + 1))  // Sayfa yenileme
  };

  // console.log(currentPosts)


  //----------------------------Route Dom manupuletation------------------//
  const newRouteDom = (e) => {
    //? react-paginate bize { selected: index } döner
    console.log(e)
    // console.log(parseInt(detailData.CardNo) + 1)
    //console.log(e)
    Navigate("/detail/" + (e.selected + 1))  // Sayfa yenileme
  };

  const [numbers, setNumbers] = useState();

  // const RouterPagiation = useMemo(async () => {
  //   const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10277&offset=0")
  //   // console.log(res.data.results)

  //   // const nums = res.data.results.map((_, index) => index + 1);
  //   const nums = res.data.results.map((data, index) => {
  //     return data.url.split("/")[6]

  //   });

  useEffect(() => {
    const RouterPagiation = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10277&offset=0")
      // console.log(res.data.results)

      // const nums = res.data.results.map((_, index) => index + 1);
      const nums = res.data.results.map((data, index) => {
        return data.url.split("/")[6]
      });

      setNumbers(parseInt(nums[nums.length - 1]))
    }
    RouterPagiation();
  }, []);

  console.log(numbers)
  //const RouteOffset = currentPage * postsPerPage;
  // const newDeneme = numbers.slice(RouteOffset, RouteOffset + postsPerPage);
  //let pageCount = Math.ceil(posts.length / postsPerPage);






  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/`)
  //   }
  // })



  // const PaginateData = useMemo(async () => {
  //   const total = 1025;
  //   const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${postsPerPage}&offset=${currentPage + 1}`)
  //   //console.log(`https://pokeapi.co/api/v2/pokemon?limit=${postsPerPage}&offset=${currentPage + 1}`)
  //   //console.log(res.data.results)
  //   // dispach({ type: "PAGINATE_DATA", currentPage: 0, postsPerPage: 10, totalPosts: 0, detailData: {} })
  //   dispach({ type: "PAGINATE_DATA", detailData: res.data.results })
  //   //const pageCount = Math.ceil(detailData.length / postsPerPage);
  //   //console.log(detailData.length)
  // }, [])
  // // pokeapi deki toplam pokemon sayısı



  //! Deneme veya hatalı yapılar
  // const PaginateData = useMemo(async () => {
  //   const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10277&offset=0")
  //   console.log(res.data.results)

  //   // const nums = res.data.results.map((_, index) => index + 1);
  //   const nums = res.data.results.map((data, index) => {
  //     return data.url.split("/")[6]
  //     //  nums = data.url.split("/")[6]
  //   });


  //   setNumbers(nums)
  // }, [])

  //console.log(numbers)
  // ! sadece number olarak aldığımız için card no ile uyuşmayanlar yayına gelmiyor örnek 1028 ve sonrası fln 
  //! pagination yeniden ayarla 

  //const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];



  useEffect(() => {
    Detail
    // RouterPagiation
    //  PaginateData
    // fetchData
    //PaginateData
  }, [])


  return (
    <div className='m-5'>


      {/* Gösterilen Postlar */}
      <div className='flex flex-wrap justify-center border-1 rounded-2xl m-1 bg-[linear-gradient(45deg,red,green)]  '>
        {currentPosts?.map((data, index) => {
          // console.log(data)
          return <PaidionData name={data.name} url={data.url} id={index + 1} key={index} />
        })}
      </div>

      {/* Veri Listesi */}
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
      </div>

      <div className='flex  flex-row items-center justify-center flex-wrap'>
        {/* {numbers && numbers.map((item, index) => (
          //console.log(item),

          <div key={index} onClick={() => { Navigate("/detail/" + item) }}
            className='
          flex  flex-row items-center justify-center p-5 h-10 m-2 bg-blue-400 rounded
          hover:bg-amber-600
           active:bg-amber-400' >
            <div>{item}</div>
          </div>
        ))} */}
      </div>
      {/* <button onClick={() => { Navigate(-1) }} className='border-2 p-2 rounded-lg bg-orange-400 hover:bg-orange-600'>Go Back</button>
      <button onClick={() => { Navigate("/detail/" + (parseInt(detailData.CardNo) + 1)) }} className='border-2 p-2 rounded-lg bg-orange-400 hover:bg-orange-600'>Go Next</button> */}

      <ReactPaginate
        //? “Önceki” butonunun yazısı
        previousLabel={"← Önceki"}
        //? “Sonraki” butonunun yazısı
        nextLabel={"Sonraki →"}
        //? Ara noktaları için (…) göstermek
        breakLabel={"..."}
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