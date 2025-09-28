import React from 'react'
import "../tailwind.css"
function NavBar() {
    return (
        <>

            <div className='h-20 w-full p-5 bg-amber-400 flex justify-between items-center' >
                <h1
                    className='font-bold text-3xl text-shadow-lg/30 text-shadow-red-800  '
                >
                    Pokemon App
                </h1>
                <input type="text" className='bg-white rounded p-1' placeholder='search🔍︎' />


            </div >

        </>
    )
}

export default NavBar