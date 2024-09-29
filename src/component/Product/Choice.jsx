import React from 'react'
import { useEffect, useState } from 'react'
import Reviews from '../Homepage/Reviews';
function Choice({post}) {
    
    const [react , setReact] = useState(0) 
    const [dope , setDope] = useState('Dope'); 
    const [reviewbox, setReviewbox] = useState('hidden')
    const [comments, setComments] = useState(null)

    
    
    function handlereview(){
        if(reviewbox==='hidden')
        {
          setReviewbox('block')
          fetch(`http://localhost:3000/api/reviews/${post._id}`,{
            credentials:'include'
          }).then((res)=>{
             if(res.ok) return res.json() ;
             else {
              throw Error('No comments are found')
             }
          }).then((comments)=>{
           
             setComments(comments) ;
          })

        }

        else if(reviewbox==='block') {
          setReviewbox("hidden")
        }
    }


  return (
    <div className='px-10 h-auto mb-10'>
    <div className="productimg mt-2 h-96 relative">
       <img className='h-full min-w-80 object-cover border border-black' src={`http://localhost:3000/images/uploads/${post.photo.image}`} alt="" />
      
    </div>
   <div className="reaction"> 
       <p className='mb-1 font-[serif]'>{post.reactions.length} Dope</p>
       <div className='reactionbtn flex justify-between px-2 bg-opacity-50  text-lg bg-black text-white w-80 min-w-80'>
           <button className='border-r w-[30%] border-white '>{dope}</button>
           <button onClick={handlereview} className='reviews border-r w-[40%] border-white  '>Reviews</button>
           <button className='w-[30%] '>Share</button>
       </div>
   </div>
   <div className={`${reviewbox} w-80 ` }>
    <div className='scrollbar reviewslider overflow-x-hidden w-full max-h-60 overflow-y-scroll'>

          <div className='reviews relative w-full'>
           {comments&& <div className=' relative w-80'> 
             {comments.map((comment)=>
             <div key={comment._id} className=''>
              <Reviews comment={comment}/>
             </div>
           
             )}
             </div>}



          </div>
     </div>
  
    
   </div>
</div>
  )
}

export default Choice