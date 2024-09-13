import Navbar from './component/partial/Navbar.jsx'
import Allproducts from './component/AllProducts/Allproducts.jsx'
import Home from './component/Home/Home.jsx'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 function App() {
  return (


   <Router>
    <div className="w-full ">
    <Navbar/>
    <div className="content">
    <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route  path="/products" element={<Allproducts/>} />

    
    </Routes>
    </div>

    </div>
    </Router>
  

  )
}

export default App 