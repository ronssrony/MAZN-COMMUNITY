import React from 'react'
import { Link } from 'react-router-dom'

function People({data , message}) {
  return (
    <>
    <div className=''>
        <Link to={`/message/${data._id}`} className='flex items-center gap-2 '> 
            <img className="w-10 h-10 rounded-[50%] object-cover" src={`http://localhost:3000/images/uploads/${data.photo}`} alt="" />
        {data.name && <h1  className=" text-lg  text-wrap ">{data.name}</h1>}
        </Link>
    </div>
    <h1 className='ml-12 text-sm font-semibold'>{message} </h1>
    </>
  )
}

export default People