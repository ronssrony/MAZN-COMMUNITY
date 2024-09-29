import {  useEffect, useState } from "react"
import Sidebar from "../partial/Sidebar"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import useFetch from "../utils/useFetch"
import { RiMenuLine } from "@remixicon/react"

const socket = io('http://localhost:3000')
function Message() {
  const [message, setMessage] =  useState('')
  const [receivemessage , setReceivemessage] = useState([])
  const {receiverId} = useParams(); 
  const {data,ispending , error} = useFetch(`http://localhost:3000/api/receiverprofile/${receiverId}`)
  const [senderId , setSenderid] = useState()
  const [messages, setMessages] = useState([])

    useEffect(()=>
      {
        fetch('http://localhost:3000/api/fetchuserid',{
          credentials:'include'
        }).then((res)=>{
          if(res.ok) return res.json()
              else {
          throw Error("something went wrong in mymessage useeffect")}
        }).then((data)=>{         
          setSenderid(data.message)
          socket.emit('join_room',{receiverId , senderId:data.message})
          return data.message
        }).then((senderId)=>{
          fetch('http://localhost:3000/api/receivemessage', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
              message,          
              receiverId,       
              senderId          
            })
          })
          .then((res) => {
            if (res.ok) return res.json();  
            else throw Error('The message is not sent');
          })
          .then((messages) => {
              
            setMessages(messages.message);  
              
          })
          .catch((err) => {
            console.log(err.message);  
          });
        })
      },[])


    

    function sentMessage(){
     
      socket.emit('sentMessage',{message , receiverId , senderId:senderId})
      setMessages([...messages,{message,receiverId,senderId}]);  
      var notification = new Audio('/music/tap.mp3')
      notification.play()
    
      fetch('http://localhost:3000/api/message', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          message,          
          receiverId,       
          senderId          
        })
      })
      .then((res) => {
        if (res.ok) return res.json();  
        else throw Error('The message is not sent');
      })
      .then((messages) => {
        document.querySelector(".messagebox").value = ''; 
        setMessage('')
          
      })
      .catch((err) => {
        console.log(err.message);  
      });
      
   

    }
    useEffect(()=>{
      console.log('this')
      socket.on('receiveMessage',(data)=>{
        setMessages((prevMessages) => [...prevMessages, data]);
        var notification = new Audio('/music/livechat.mp3')
      notification.play()
        
       })
  },[socket])

  useEffect(()=>{
   
   const messagecart = document.querySelectorAll('.messagecart'); 
   const lastmessage =  messagecart[messagecart.length - 1] ;
   
   setTimeout(() => {
    
     if(lastmessage){
      lastmessage.scrollIntoView({behavior:"smooth"}); 
     }
   }, 100);
  
  },[messages])

  return (

    <div className="h-screen relative bg-red-300 ">
        <Sidebar/>
        <div className="w-5/6 max-w-5/6 relative flex flex-col  justify-between h-[75%] max-sm:translate-y-40 lg:translate-y-20 max-sm:translate-x-8  lg:translate-x-60">
          {ispending && <div className="w-full flex justify-between px-36">
           <div className="flex items-center gap-2">
           <img className="w-16 h-16 rounded-full object-cover bg-slate-300" src='' alt="" />
           <h1 className="w-20 h-5 rounded-md bg-slate-300"></h1>
           </div>
           <div>
            <button> <RiMenuLine/> </button>
           </div>
          </div>}


          {data &&  <div className="w-full flex justify-between  px-36">
           <div className="flex items-center gap-2">
           <img className="w-16 h-16 rounded-full object-cover" src={ `http://localhost:3000/images/uploads/${data.user.photo}`} alt="" />
           <h1>{data.user.name || data.user.email}</h1>
           </div>
           <div>
            <button> <RiMenuLine/> </button>
           </div>
          </div>}
          
           <div className="">
           <div className="scrollbar h-96 max-h-96 overflow-y-scroll   w-full">
          {(messages.length>1) &&  messages.map((mesg , ind)=>
             <div key={mesg._id || ind} className="messagecart self-end  px-36 py-5 relative  ">
             <div className=" ">
              {mesg.senderId===senderId ? <div className="sender w-full flex justify-end"> <h1 className="break-words p-2 rounded-tl-xl rounded-br-xl  bg-green-300">{mesg.message} </h1></div>:<div className="receiver flex justify-start w-full md:w-1/2 text-wrap">   <h1 className="bg-green-300 p-2 rounded-tl-xl rounded-br-xl   break-words" >{mesg.message}</h1></div>}             
            </div> 
              </div>
          
          )} </div>
        

            <form onSubmit={(e)=>{e.preventDefault() ;sentMessage()}} action="" className="w-full flex justify-center gap-5 ">
            <input type="text" size={32} className="messagebox bg-slate-200 outline-none py-4 w-4/6 px-10 rounded-xl " onChange={(e)=>setMessage(e.target.value)}/>
            
            <button type="submit"  className="py-4 bg-red-300 px-10  rounded-full  ">Send</button>
            </form>
           </div>   
        </div>
    </div>
  )
}

export default Message