import { useState } from "react";

export default function FruitList(){
const[isOpen,SetIsOpen] = useState(false);

const greetIng=()=>{
  SetIsOpen(false);
}
  return(
<>
<button onClick={()=>SetIsOpen(true)}>Click me!!!!!!</button>

{isOpen &&(
  <div>
    <p>Hello</p>
    <button onClick={greetIng}>Click me </button>
  </div>
)

}
</>
  );
}