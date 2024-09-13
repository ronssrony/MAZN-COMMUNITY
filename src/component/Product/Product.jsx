import { useParams } from "react-router-dom";
import useFetch from "../utils/useFetch"



function Blog() {
  const { id }= useParams(); 
  const {data:blog , ispending , error} = useFetch('http://localhost:8000/blogs/' +id) ;

  return (

   <>
    {error && <div className='loading flex w-full h-screen justify-center items-center text-pink-600 font-semibold text-3xl'> {error} </div>}
    {ispending && <div className='loading flex w-full h-screen justify-center items-center'> <div className='w-10 h-10 rounded-3xl border-4 border-red-400 stroke-pink-500'></div> </div>}
    {blog&&    <div className="blog-detail text-black rounded p-5 flex flex-col gap-2 px-20"  >
       <h1 className="text-3xl">Title: {blog.title}</h1>
       <h1 className="text-xl">Author: {blog.author}</h1>
       <p className="text-black w-1/2"> Content: {blog.body} </p>
    </div>}
   </>
  ) 
}

export default Blog