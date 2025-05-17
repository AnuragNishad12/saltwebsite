import { useEffect } from "react";
import { useToast } from '../ToastComponents/ToastProvider.jsx';

const MyCart=()=>{
      const toast = useToast();


useEffect(()=>{

    const allgetitemCart = async ()=>{
try {
     const token = localStorage.getItem("token");
      const res = await fetch('http://localhost:5000/api/GetCartItems',{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json();
      if(res.ok){
           toast.success("Getting the Cart Items");
       console.log(data);
      }
      
        




    } catch (error) {
        console.log(`Getting Error ${error}`);
    }
    }

    allgetitemCart();
    
},[])






return(
<>
<h1>hello this is anurag</h1>





</>
);



}



export default MyCart;