import { useEffect, useState } from "react"
import Sidebar from "../partial/Sidebar"
import { io } from "socket.io-client"
import People from "./People"


const socket = io('http://localhost:3000')
function Message() {

    const [receivemessage , setReceivemessage] = useState([])
    const [people, setPeople] = useState(null); 

   useEffect(()=>{
          fetch('http://localhost:3000/api/mymessages',{
            credentials:'include'
          }).then((res)=>{
            if(res.ok) return res.json()
                else {
            throw Error("something went wrong in mymessage useeffect")}
          }).then((data)=>{         
               socket.emit('join_room',data.message)
          })
   }, [])


    useEffect(()=>{
        socket.on('receiveMessage',(data)=>{
            console.log(data.senderid)
            setReceivemessage((data.message))
            fetch(`http://localhost:3000/api/chatpeople/${data.senderid}`)
            .then((res)=>{ if(res.ok)return res.json()
                           else {
                            throw Error('something wrong in fetch chatpeople')
                           }
            })
            .then((data)=>{
                setPeople(data)
                console.log(data)
            }).catch((err)=>{
                console.log(err)
            })
         })
    },[socket])
  return (

    <div>
        <Sidebar/>
        <div className="w-5/6 max-sm:translate-y-40 lg:translate-y-20 max-sm:translate-x-8  lg:translate-x-60">
           
           {people && <div className="mt-5">
            <People data={people} message={receivemessage}/>
           </div>}
        </div>
    </div>
  )
}

export default Message