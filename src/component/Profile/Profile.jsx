import { useState } from "react"
import useFetch from "../utils/useFetch"
import {RiAddLine} from '@remixicon/react'

import Choicelist from "../Product/choicelist"
import Sidebar from "../partial/Sidebar"


function Profile() {

    const {data, isPending , error} = useFetch('http://localhost:3000/api/profile')
    const [image ,setImage] = useState('/images/profile.jpg'); 
    const [ispendingimg , setPending ] = useState(false)
     const [submit , setSubmit] = useState('')
    function previewImage(e){
      document.querySelector('.submitbtn').style.display = 'flex'; 
      
      setSubmit('Submit')
      let filereader = new FileReader() ;
       
      filereader.onload = ((event)=>{
        document.querySelector('.dpimg').setAttribute("src",event.target.result)
         setImage(event.target.result)
      })
      
      filereader.readAsDataURL(e.target.files[0])
      
    }  

    function handleimageform(e){
      e.preventDefault();
      setPending(true)
      setSubmit('......')
      let form =e.target ; 
      let formdata = new FormData(form) ; 
      fetch( `http://localhost:3000/api/profile/${data.user._id}`, {
        method:"POST" , 
        body:formdata , 
        credentials:"include"
      }).then((res)=>{
        setPending(false)
        setSubmit('Submit')
        console.log(res)
        if(res.ok) return res.json() 
        else{
          throw Error('Input is invalid') ; 
        }
      }).then((data)=>{
        
      }).catch((err)=>{
        console.log(err.message)
      })
    }


 

  return (
    <div className="font-[joan] w-5/6 ">
     {isPending && <div> .... </div> }
     {error && <div> {error} </div> }
     {data &&  
    
    <div>

    <Sidebar/>

    <div className="profileside  flex flex-col gap-5 items-center max-sm:translate-y-40 lg:translate-y-20 max-sm:translate-x-8  lg:translate-x-60 ">
    
     <div className="h-36 w-36  relative mb-5 ">

    {data.user.picture &&   <div className="dp h-full w-full flex flex-col  justify-center "><img className="dpimg rounded-[50%] border-4 border-opacity-70 border-[#DC143C] h-full w-full  object-cover" src={ `http://localhost:3000/images/uploads/${data.user.picture}`}/> <form onSubmit={(e)=>handleimageform(e)} encType="multipart/form-data"  >
    <label className="absolute w-full text-center  flex justify-center bg-white bg-opacity-60 z-10 bottom-0" htmlFor="image"> <RiAddLine/> </label>
     <input type="file" name="image" id="image" className="hidden" onChange={(e)=>{previewImage(e)}}/> 
     <button className="submitbtn hidden absolute left-9  w-1/2 text-center flex justify-center bg-[#e6385a] text-white mt-2 hover:bg-opacity-70 active:bg-opacity-100 z-10 rounded" disabled={ispendingimg} type="submit">{submit}</button> </form> </div> }

    {data.profile.photo &&  <div className="dp h-full w-full flex flex-col  justify-center "><img className="dpimg rounded-[50%]   h-full w-full  object-cover" src={ `http://localhost:3000/images/uploads/${data.profile.photo}`}/> <form onSubmit={(e)=>handleimageform(e)} encType="multipart/form-data"  >
    <label className="absolute w-full text-center  flex justify-center bg-white bg-opacity-60 z-10 bottom-0" htmlFor="image"> <RiAddLine/> </label>
     <input type="file" name="image" id="image" className="hidden" onChange={(e)=>{previewImage(e)}}/> 
     <button className="submitbtn hidden absolute left-9  w-1/2 text-center flex justify-center bg-[#e6385a] text-white mt-2 hover:bg-opacity-70 active:bg-opacity-100 z-10 rounded" disabled={ispendingimg} type="submit">{submit}</button> </form> </div> }


    {!data.profile.photo && !data.user.picture  &&  <div className="dp h-full w-full flex flex-col  justify-center "><img className="dpimg rounded-[50%] border-4 border-opacity-70 border-[#DC143C] h-full w-full  object-cover" src={`${image}`}/> <form onSubmit={(e)=>handleimageform(e)} encType="multipart/form-data"  >
    <label className="absolute w-full text-center  flex justify-center bg-white bg-opacity-60 z-10 bottom-0" htmlFor="image"> <RiAddLine/> </label>
     <input type="file" name="image" id="image" className="hidden" onChange={(e)=>{previewImage(e)}}/> 
     <button className="submitbtn hidden absolute left-9  w-1/2 text-center flex justify-center bg-[#e6385a] text-white mt-2 hover:bg-opacity-70 active:bg-opacity-100 z-10 rounded" disabled={ispendingimg} type="submit">{submit}</button> </form> </div> }


     </div>
     <div>
     <h1>Name: {data.profile.name || data.user.fullname} </h1>
     <h1> Email: {data.user.email}</h1>
     <h1>Follower: {data.profile.follower.length }</h1>
     <h1> Follow: {data.profile.follow.length}</h1>
     </div>
 
     <div className="choicelist">
      <h1 className="text-2xl border-b  border-black pb-2 mb-5">Your Choicelist </h1>
   <div className="choices flex flex-wrap">
   <Choicelist posts={data.posts}  />
   </div>
      </div>    

     </div> 
     </div>

     }
    </div>
  )
}

export default Profile