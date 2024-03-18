import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Menu from './menu/Menu';
import NotFound from './pages/NotFound';
import Contact from './pages/contact/Contact.tsx';
import TopBar from './components/navbar/TopBar.tsx';
import Home from './pages/home/Home.tsx';
import AboutUs from './pages/about/AboutUs.tsx'
import Login from './pages/Login/Login.tsx';
import SignUp from './pages/signup/SignUp.tsx';
import Cart from './components/cart/Cart.tsx'
import AdminLogin from './admin/adminLogin.tsx'
import axios from 'axios'
import Member from './pages/member/member.tsx'
import CheckoutComponent from './components/cart/Checkout'
import AdminHome from '../src/pages/admin/adminHome.tsx'
import CheckoutAsGuest from '../src/components/cart/CheckGuest.tsx'
import { useEffect,useState } from "react"


export function App() {
  const [users,setUsers]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:3000/gusers', {
      withCredentials:true
    })
    .then(users=>setUsers(users.data))
  },[])
  

  const handleSignUp = (email: string, password: string) => {
    // Replace with your actual backend API endpoint for user registration
    const signUpEndpoint = 'http://localhost:3000/singup';
  
    // Using Axios or another HTTP client to send a POST request to the server
    axios.post(signUpEndpoint, {
      email: email,
      password: password,
    })
    .then(response => {
      // Handle the response from the server if the signup was successful
      console.log('User signed up successfully:', response.data);
      // Possibly save the received token to local storage or state
      // Navigate to a different page if needed, etc.
    })
    .catch(error => {
      // Handle any errors that occurred during the signup process
      console.error('Signup error:', error.response || error.message);
    });
  };

  return (
    <>
      <TopBar />
        <Routes>
          <Route path= "/" element = {<Home /> }  />
          <Route path= "menu" element= {<Menu />}  />
          <Route path= "contact" element= {<Contact />} />
          <Route path= "about" element= {<AboutUs />} />
          <Route path= "login" element= {<Login  />} />
          <Route path= "signup" element= {<SignUp {...handleSignUp} />} />
          <Route path="cart" element= { <Cart />} />
          <Route path= "*" element= {<NotFound />} />
          <Route path='admin' element={<AdminLogin /> } />
          <Route path='member' element={<Member /> } />
          <Route path="checkout" element= { <CheckoutComponent />} ></Route>
          <Route path="administrator" element= { <AdminHome />} ></Route>
          <Route path="checkoutasguest" element={<CheckoutAsGuest />}></Route>
          
        </Routes>
    </>
  )
}
export function WrappedApp(){
  return ( 
    <Provider store={store}>
      <BrowserRouter>

        <App />
      </BrowserRouter>
    </Provider>
  
  );
}



