import { useState } from "react";


function Counter(){
const[count,setCount]= useState(0);
const [showpassword ,setShowPassword]= useState(false)
const[formdata,setformData] = useState({
    name:'',
    email:''
})

// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setformData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

const handleChange=(e)=>{
    const {name,value} = e.target;
    setformData(prev=>({
        ...prev,
        [name]:value
    }))
}



return(
<>
<div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-red-500 text-3xl mb-4">
        Counter Value: {count}
      </h1>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600"
      >
        Increment
      </button>

      <input type={showpassword ? "text":"password"} placeholder="Enter Your Password"/>
      <button onClick={()=> setShowPassword(!showpassword)}>{showpassword ? "Hide" :"show"}</button>
     
     <form>
     <input type="text" name="name" value={formdata.name} onChange={handleChange}/>
     <input type="email" name="email" value={formdata.name} onChange={handleChange}/>

     </form>



    </div>
</>
);



}

export default Counter;