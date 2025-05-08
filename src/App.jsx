import { useState } from 'react'
import SignUpPage from './Components/SignUpPage'
import LoginPage from './Components/LoginPage'
import Counter from './Components/Counter'
import { ToastProvider } from './Components/ToastComponents/ToastProvider'
import HomePage from './Components/HomePage/HomePage'
import FruitList from './Components/Learning/FruitList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastProvider>
      <HomePage/>
      {/* <FruitList/> */}
    {/* <LoginPage/> */}
    {/* <SignUpPage/> */}
    </ToastProvider>
      
      {/* <LoginPage/> */}
      {/* <Counter/> */}
    
    </>
  )
}

export default App
