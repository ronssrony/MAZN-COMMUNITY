
import Sidebar from "../partial/Sidebar"
import useFetch from "../utils/useFetch"
import Productcart from "./Productcart"
import Profilecart from "./Profilecart"


function Home() {

  const {data , ispending , error} = useFetch('http://localhost:3000/api/postfeed')
 
  return (
   <>

   <Sidebar/>
    <div className="flex w-5/6 flex-col items-center max-sm:translate-y-40 lg:translate-y-20 max-sm:translate-x-8  lg:translate-x-48 ">
      {ispending && <div>...</div>}
      {error && <div>{error}</div>}
      {data &&  data.posts.map((post)=>
        <div key={post._id} >
        <Profilecart  data={post.referid}/>
        <Productcart  data={post.photo} post={post} user={data.user} />
        </div>
     
      )
      
      }
    </div>
   
   </>
   
  )
}

export default Home