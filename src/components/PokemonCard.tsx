import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classNames from "classnames";
import TiltedCard from './TiltedCard';

function PokemonCard({ name, url, id }: any) {
    const [User, setUser] = useState({ Poster: "", Name: "", CardNo: "", color: ``, type: "" })
    const Navigate = useNavigate();


    useEffect(() => {
        axios.get(url)
            .then(response => {
                //  console.log(response.data.abilities[1].ability.url)
                // console.log(response.data.id)
                // CardNo: `${url.substring(34, 35)}` böyle verişlebilir belki
                //  console.log(response.data.types[0].type.name)
                setUser({
                    Poster: `${response.data.sprites.front_default}`,
                    Name: `${name}`,
                    CardNo: `${response.data.id}`,
                    color: `${response.data.version_group.name}`,
                    type: `${response.data.types[0].type.name}`,


                })


            })
            .catch(error => {
                // 404, 500 vs. burada yakalanır
                console.error('Error:', error.response?.status);
            });
    }, [])
    // console.log(User.type);

    //TODO Örnek ClassNames yapısı
    //     import classNames from "classnames";
    //     const btnColor = ["danger", "succes", "warning"];

    //! includes metodu array içinde arama yapar ve true false döner
    //   if (btnColor.includes(variant) == false) {
    //     variant = "default";
    //   }

    //          className={classNames({
    //           "p-4 m-1 h-10 text-white flex items-center rounded": true,

    //           "bg-gray-700": variant === "default",
    //           "bg-red-600": variant === "danger",
    //           "bg-green-600": variant === "succes",
    //           "bg-yellow-600": variant === "warning",
    //         })}

    //!---------------------Poke ClassNamess yapısı---------------------------//







    return (
        <div onClick={() => { Navigate("/detail/" + User.CardNo) }} className='w-1/4' >
            <TiltedCard
                containerHeight="300px"
                containerWidth="400px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                    <div

                        className={classNames({
                            " flex justify-center items-center w-[400px] p-5 mt-5  rounded-2xl text-white": true,

                            "bg-[linear-gradient(45deg,rgba(144,200,40,1),rgba(198,230,110,1))]": User.type === "bug",
                            "bg-[linear-gradient(45deg,rgba(120,95,80,1),rgba(90,75,70,1))]": User.type === "dark",
                            "bg-[linear-gradient(45deg,rgba(130,70,255,1),rgba(110,60,170,1))]": User.type === "dragon",
                            "bg-[linear-gradient(45deg,rgba(255,220,60,1),rgba(255,230,40,1))]": User.type === "electric",
                            "bg-[linear-gradient(45deg,rgba(255,140,180,1),rgba(255,190,220,1))]": User.type === "fairy",
                            "bg-[linear-gradient(45deg,rgba(220,60,60,1),rgba(230,130,120,1))]": User.type === "fighting",
                            "bg-[linear-gradient(45deg,rgba(255,145,60,1),rgba(255,195,110,1))]": User.type === "fire",
                            "bg-[linear-gradient(45deg,rgba(185,165,255,1),rgba(210,200,255,1))]": User.type === "flying",
                            "bg-[linear-gradient(45deg,rgba(125,105,185,1),rgba(180,165,205,1))]": User.type === "ghost",
                            "bg-[linear-gradient(45deg,rgba(140,230,95,1),rgba(195,240,160,1))]": User.type === "grass",
                            "bg-[linear-gradient(45deg,rgba(240,215,120,1),rgba(230,210,130,1))]": User.type === "ground",
                            "bg-[linear-gradient(45deg,rgba(170,240,240,1),rgba(210,245,245,1))]": User.type === "ice",
                            "bg-[linear-gradient(45deg,rgba(190,190,140,1),rgba(220,220,180,1))]": User.type === "normal",
                            "bg-[linear-gradient(45deg,rgba(200,85,200,1),rgba(215,160,215,1))]": User.type === "poison",
                            "bg-[linear-gradient(45deg,rgba(255,105,160,1),rgba(255,170,210,1))]": User.type === "psychic",
                            "bg-[linear-gradient(45deg,rgba(210,190,90,1),rgba(230,220,140,1))]": User.type === "rock",
                            "bg-[linear-gradient(45deg,rgba(210,210,230,1),rgba(230,230,240,1))]": User.type === "steel",
                            "bg-[linear-gradient(45deg,rgba(130,195,180,1),rgba(170,220,200,1))]": User.type === "unknown",
                            "bg-[linear-gradient(45deg,rgba(120,170,255,1),rgba(180,210,255,1))]": User.type === "water"
                        })}

                    >

                        <img srcSet={User.Poster}  /*alt="Pokemonİmg"*/ className='w-46' />
                        <div style={{ fontSize: "20px" }}>
                            <h2>Name: {User.Name}</h2>
                            <h2>Card No: {User.CardNo}</h2>
                            <h2>type: {User.type}</h2>
                        </div>
                    </div>


                }
            />
        </div >
    )
}

export default PokemonCard