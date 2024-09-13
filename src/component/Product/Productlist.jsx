/* eslint-disable react/prop-types */

// import { Link } from "react-router-dom"


function Productlist({ products }) {


    return (
     <>

      <div className="products flex flex-wrap gap-1 px-20 w-full items-center justify-center font-[joan]">
  
      {products.map((product)=>(
        <div className="product-detail text-black min-w-60 w-1/4  flex flex-col"  key={product._id}>
          <img src={`https://mazn.onrender.com/images/uploads/${product.image}`} alt="" />
          <h1 className="inline">{product.name}</h1> <p className="inline-block">{product.price}</p>
        </div>
      ))}
      </div>
     
     </>

       

    )

  
}

export default Productlist