import { useEffect, useState } from 'react'

import Reviews from './Reviews';

function Productcart({ post , user}) {

    const [react , setReact] = useState(0) 
    const [dope , setDope] = useState('Dope'); 
    const [reviewbox, setReviewbox] = useState('hidden')
    const [comments, setComments] = useState(null)

    useEffect(()=>{
      setReact(post.reactions.length)
      if(post.reactions.includes(user._id)){
        setDope('Undope')   
      }

        
    },[])
    function handlereaction(){
        if(dope==='Dope') { 
          setReact(react+1) ; setDope('Undope')
          fetch(`http://localhost:3000/api/dope/${post._id}`,{
            credentials:'include'
          }).then((res)=>{
            if(res.ok) return res.json() 
              else {
             throw Error('Not Doped')
              }
          }).then((info)=>{
            if(info.message==='login')
            {
              history('/login')
            }
            console.log(info.message)
          }).catch((err)=>{
            console.log(err.message)
          })
        }

       else {
        setDope('Dope');  setReact(react-1)
        fetch(`http://localhost:3000/api/undope/${post._id}`,{
          credentials:'include'
        }).then((res)=>{
          if(res.ok) return res.json() 
            else {
           throw Error('Not Doped')
            }
        }).then((info)=>{
          if(info.message==='login')
          {
            history('/login')
          }
          console.log(info.message)
        }).catch((err)=>{
          console.log(err.message)
        })
             
       }

    }

    
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

    function reviewsubmit(e){
        
         e.preventDefault() ;
         let form =e.target ; 
         let formdata = new FormData(form) ; 
         fetch(`http://localhost:3000/api/review/${post._id}`,{
    
            method:"POST" ,
           credentials:'include' ,
           body:formdata
         }).then((res)=>{
           if(res.ok) return res.json() 
            else {
          throw Error('something went wrong on reviewsubmit')}
         }).then((comments)=>{
          document.querySelector('.textarea').value = ''; 
            setComments(comments)

         }).catch((err)=>{
          console.log(err.message)
         })
         
    }

    
  return (
    <div className='px-10 h-auto mb-10'>
         <div className="productimg mt-2 h-96 relative">
            <img className='h-full min-w-80 object-cover border border-black' src={`http://localhost:3000/images/uploads/${post.photo.image}`} alt="" />
           
         </div>
        <div className="reaction"> 
            <p className='mb-1'>{react} Dope</p>
            <div className='reactionbtn flex justify-between px-2   text-lg bg-black text-white w-80 min-w-80'>
                <button onClick={handlereaction} className='border-r w-[30%] border-white '>{dope}</button>
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
          <form onSubmit={(e)=>{reviewsubmit(e)}} className='mt-2'>
            <textarea name="review" required placeholder='Write Your Review' className='textarea w-full border rounded p-2  border-black outline-none resize-none'></textarea>
            <button type='submit' className='border border-black px-2 '>Review</button>
          </form>
         
        </div>
    </div>
  )
}

export default Productcart