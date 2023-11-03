import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Menu from './menu/Menu';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs'
import Login from './pages/LoginSUP/Login';
import SignUp from './pages/LoginSUP/SignUp';


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
          <Route path= "login" element= {<Login onLogin={handleLogin} />} />
          <Route path= "signup" element= {<SignUp onSignUp={handleSignUp} />} />
          <Route path= "*" element= {<NotFound />} />
        </Routes>
      
      
      
    </>
  )
}
export function WrappedApp(){
  return ( 
  <BrowserRouter>
    <App />
  </BrowserRouter>
  
  );
}




