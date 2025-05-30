import { useState } from 'react'
import SignUpPage from './Components/SignUpPage'
import LoginPage from './Components/LoginPage'
import Counter from './Components/Counter'
import { ToastProvider } from './Components/ToastComponents/ToastProvider'
import HomePage from './Components/HomePage/HomePage'
import FruitList from './Components/Learning/FruitList'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import MyCart from './Components/Cart/MyCart'
import ContactUsPage from './Components/Navbar/ContactUs';
import DealsOffersPage from './Components/DealsAndOffers/DealsOffersPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<ToastProvider><HomePage/></ToastProvider>}/>
          <Route path='/Login' element={ <ToastProvider><LoginPage/></ToastProvider>}/>
           <Route path='/Registeration' element={<ToastProvider><SignUpPage/></ToastProvider>}/>
            <Route path='/MyCart' element={<ToastProvider><MyCart/></ToastProvider>}/>
            <Route path='/ContactUsPage'element={<ToastProvider><ContactUsPage/></ToastProvider>}/>
            <Route path='/DealsandOffers' element={<ToastProvider><DealsOffersPage/></ToastProvider>}/>
      </Routes>
    </Router>
   
      {/* <HomePage/> */}
           
      {/* <FruitList/> */}
    {/* <LoginPage/> */}
    {/* <SignUpPage/> */}
   
 
      {/* <LoginPage/> */}
      {/* <Counter/> */}
    
    </>
  )
}

export default App
