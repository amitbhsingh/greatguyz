import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Menu from './menu/Menu';
import NotFound from './pages/NotFound';
import Contact from './pages/contact/Contact';
import TopBar from './components/navbar/TopBar';
import Home from './pages/home/Home';
import AboutUs from './pages/about/AboutUs'
import Login from './pages/LoginSUP/Login';
import SignUp from './pages/LoginSUP/SignUp';
import Cart from './components/cart/Cart'

export function App() {
  const handleLogin = (email: string, password: string) => {
    // Perform authentication logic here, e.g., call an API
    console.log('Logging in with:', email, password);
  };

  const handleSignUp = (email: string, password: string) => {
    // Perform signup logic here, e.g., call an API
    console.log('Signing up with:', email, password);
  };

  return (
    <>
      <TopBar />
        <Routes>
          <Route path= "/" element = {<Home /> }  />
          <Route path= "menu" element= {<Menu />} />
          <Route path= "contact" element= {<Contact />} />
          <Route path= "about" element= {<AboutUs />} />
          <Route path= "login" element= {<Login {...handleLogin} />} />
          <Route path= "signup" element= {<SignUp {...handleSignUp} />} />
          <Route path="cart" element= { <Cart />} />
          <Route path= "*" element= {<NotFound />} />
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




