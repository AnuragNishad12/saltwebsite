import React, { useEffect, useState } from 'react';

export default function FruitFilter() {
const [categories,setCategories] = useState([])
const [Loading,setLoading] = useState(true);

useEffect(()=>{

  const fetchData =async()=>{
    try {
      const response = await fetch("http://localhost:5000/api/allCategory",{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      console.log(data);
      setCategories(data.message);
      console.log("MyData",data.message);
      setLoading(false);
     } catch (error) {
      console.log("Error",error);
      setLoading(false);
     }
  }

  fetchData();
},[]);

if(Loading) return <p>Loading Data.....</p>;
 
return(
<>
{
  categories.map((data)=>{
    return(
      <div key={data._id}>
      <h1>{data.CategoryName}</h1>
     </div>
    )
  })
};

{
  categories.map((data)=>(
    <div key={data._id}>
      <h1>{data.CategoryName}</h1>
    </div>
  ))
}

</>
);
 
}


