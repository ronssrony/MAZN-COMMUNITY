import { Link } from "react-router-dom";

function Navbar(){
    
 
   return(
      <div className=" w-full h-60  flex max-lg:flex-col   max-sm:z-10 ">
      <div className="lg:w-1/2 md:w-full min-w-fit md:h-96  max-sm:h-60  h-96 p-5  ">
          <Link to="/" className="w-full h-full relative">
              <img className="w-3/2 h-2/5 object-cover" src="/fontbolt.png" alt=""/>
          </Link>
          <div className="flex text-black gap-5 mt-2 infowala relative  ">
              
              <div className="   text-black  flex gap-2 min-w-fit justify-around  relative lg:hidden  "> 
                 
              <Link href="text-black" to={`/products`} className="">All Products</Link>
              <a href="text-black" className="">Help</a>
            </div>
          </div>
      </div>
  
      <div className="xl:flex lg:flex-col md:flex-col max-md:flex-col xl:flex-row  ">
        <div className="searchwala max-md:py-10 max-md:px-5 max-sm:px-0 md:py-10 md:px-5 max-sm:w-full max-lg:w-full  md:w-96 max-md:w-96 h-20 relative flex md:mr-2 max-sm:absolute max-lg:absolute max-md:absolute max-md:top-40 max-lg:top-40 max-sm:top-28 max-lg:hidden ">
          <input type="search" size="45" autoComplete="off" name="search" className="absolute max-sm:w-full  p-1 max-sm:border max-sm:border-black outline-none max-sm:bg-transparent bg-white border border-black"/> <label htmlFor="search" className="right-0 absolute p-1 opacity-60 font-light max-sm:text-black">SEARCH</label>
      </div>
      <div className="lg:ml-10 md:ml-10 max-sm:w-60 max-md:w-72 w-56  h-20 text-black  py-10 px-2 flex justify-around  relative max-lg:hidden"> 
              
      <Link href="text-black" to={`/products`} className="">All Products</Link>
        <a href="">Help</a>
      </div>
      </div>
     
  </div>

   ) ;
}

export default Navbar 