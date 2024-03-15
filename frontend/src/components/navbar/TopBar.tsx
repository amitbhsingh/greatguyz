import {Container,Nav,Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Topbar.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useDispatch,useSelector} from 'react-redux'
import { RootState } from '../../redux/store';
import {clearUser} from '../../features/auth/authSlice'

const TopBar = () => {
  // const totalQuantity = cartProd.items.reduce((total, item) => total + item.quantity, 0);
  const cartItemCount = useSelector((state: RootState) => state.cart.items.reduce((count, item) => count + item.quantity, 0));
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch=useDispatch();
  const handleLogout = () => {
    // Logout logic here
    dispatch(clearUser());
    // Redirect to home page or perform other actions as needed
};
  
  return (
    <>
      <Navbar className='clr' bg="myred" data-bs-theme="dark"  >
        <Container>
          <Navbar.Brand as ={Link} to="/">
          <img src={logo} 
          style={{width:90, marginTop:1, marginBottom:1, marginRight:10, marginLeft:-10}} />
           </Navbar.Brand>
          <Nav className="ms-auto" style={{color:"#F2D8D8"}} >
            <Nav.Link as={Link} to ="/menu" > Menu</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            {user ? (
            <>
            <Nav.Link as={Link} to="/member">Hello {user.email.split('@')[0]} :)</Nav.Link>

            <Nav.Link as={Link} to="#" onClick={handleLogout}> Logout</Nav.Link>
            <span>{user.name}</span> {/* Display user's name */}
            </>
            ) : (
            <>
            <Nav.Link className='space-btwn' as={Link} to="/login">Login </Nav.Link>
            <Nav.Link className='space-ed' as={Link} to="/signup"> Sign Up</Nav.Link>
            </>
            )}
            
            
            <Nav.Link  as={Link} to="/cart" > < ShoppingCartIcon /> {cartItemCount} </Nav.Link>

            <div></div>

          </Nav>
        </Container>
      </Navbar> 
    </>
  )
}

export default TopBar