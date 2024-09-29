import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Navbar(){
   const [link , setLink] = useState('Log In') ;
   const [hyperlink , sethyperLink] = useState('/login') ;
    useEffect(()=>{
      
   fetch('http://localhost:3000/api/middleware',{
    credentials: 'include'
   }).then((res)=>{
     if(res.ok) { return res.json()} 
     else {
      throw Error('user not logged in')
     }
   }).then((data)=>{
       if(data.message==='valid')
        {
        setLink('Profile') 
        sethyperLink('/profile') 
      }
   }).catch((err)=>
  console.log(err.message))
    },[])
   return(
      <div className=" w-full h-24 max-sm:h-36  flex max-lg:flex-col fixed z-50  bg-white max-sm:z-10 ">
      <div className="lg:w-1/2 md:w-full min-w-fit md:h-24  max-sm:h-36  h-24 p-5 ">
          <Link to="/" className="w-full h-full relative">
              <img className="w-3/2 h-20 max-sm:h-20 object-cover" src="/images/imazinistblack.png" alt=""/>
          </Link>
          <div className="flex text-black gap-5 mt-2 infowala relative  ">
              
              <div className="   text-black  flex gap-2 min-w-fit justify-around  relative lg:hidden  "> 
                 
              <Link href="text-black" to={`/products`} className="">All Products</Link>
              <Link href="text-black" to={`${hyperlink}`} className="">{link}</Link>
              <a href="text-black" className="">Help</a>
            </div>
          </div>
      </div>
  
      <div className="xl:flex lg:flex-col md:flex-col max-md:flex-col xl:flex-row  ">
        <div className="searchwala max-md:py-10 max-md:px-5 max-sm:px-0 md:py-10 md:px-5 max-sm:w-full max-lg:w-full  md:w-96 max-md:w-96 h-20 relative flex md:mr-2 max-sm:absolute max-lg:absolute max-md:absolute max-md:top-40 max-lg:top-40 max-sm:top-28 max-lg:hidden ">
          <input type="search" size="45" autoComplete="off" name="search" className="absolute max-sm:w-full  p-1 max-sm:border max-sm:border-black outline-none max-sm:bg-transparent bg-white border border-black"/> <label htmlFor="search" className="right-0 absolute p-1 opacity-60 font-light max-sm:text-black">SEARCH</label>
      </div>
      <div className="lg:ml-10 md:ml-10 max-sm:w-60 max-md:w-72 lg:w-72 max-lg:w-60  h-20 text-black  py-10 px-2 flex justify-between  relative max-lg:hidden"> 
              
      <Link href="text-black" to={`/products`} className="">All Products</Link>
      <Link href="text-black" to={`${hyperlink}`} className="">{link}</Link>
        <a href="">Help</a>
      </div>
      </div>
     
  </div>

   ) ;
}

export default Navbar 