import { useEffect, useState } from "react";



export default function productdisplay(){
  const [category,setCategory] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [product,setProduct] = useState([]);


useEffect(()=>{
  const handlecategory=async()=>{
    try {
      const res =await fetch("http://localhost:5000/api/allCategory");
      const data = await res.json();
      console.log(data);
    setCategory(data.message)
    } catch (error) {
      console.log(`Error !!!${error}`);
    }
  }
  handlecategory();
},[]);

const selectedCategory = category.find((cat)=>cat._id === selectedId);

const handleClick = (id)=>{
  setSelectedId(id);
}

const handleCategoryClick=async(categoryId)=>{
  try {
    const res =await fetch(`http://localhost:5000/api/products/category/${categoryId}`);
    const data = await res.json();
    const mydata = JSON.stringify(data.products);
    console.log(mydata);
    if(mydata.length>0){
      setProduct(data.products);
    }else{
      alert("Its Empoty")
    }
    
  
    console.log(product); 
  } catch (error) {
    console.log(`Error !!!${error}`);
  }
}

return(
<>
<div>




  {category.map((data)=>(
  <>
  <div key={data._id}>
    <h1>{data.CategoryName}</h1>
    <button onClick={()=>{
    handleClick(data._id)
    handleCategoryClick(data._id);
    }}>click me !!</button>
  </div>
  </>
  ))}

{
  selectedCategory && (
    <div>
      selected id:{selectedCategory._id}
      </div>
  )
}

{
  product.map((data)=>(
    <>
    <div key={data._id}>
      <h1>{data.name}</h1>
    </div>
    </>
  ))
}


</div>
</>
);


}