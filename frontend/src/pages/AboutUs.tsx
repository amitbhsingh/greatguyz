import './about.css'
import founder from '../assets/founder.jpg'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';

// import CableIcon from '@mui/icons-material/Cable';

const AboutUs = () => {
  return (
    <>
    <div>
      <h1 className='misson'>Misson Statement</h1>
      
    <div><img src={founder} alt="founder" className='anilp' /></div>
    <div className='rectangle' >


    <p className='misson-text'>"At GreatGuys, our mission is to revolutionize the fast food industry by providing a 
      mouthwatering and guilt-free vegetarian eating experience that nourishes both people and the planet. 
      We are committed to crafting delectable, chef-inspired dishes that cater to diverse tastes and dietary preferences, 
      without compromising on quality or speed.
      At the heart of our mission is a dedication to sustainability.
      We believe in the power of plant-based nutrition to create a positive impact on the environment, 
      animal welfare, and human well-being. By sourcing locally grown, organic ingredients, 
      we reduce our carbon footprint and support local farmers. <br /><br /> 
      Our menu is thoughtfully designed to showcase the vibrant flavors and versatility of plants, 
      aiming to delight even the most discerning palates.
      Beyond our culinary offerings, 
      we strive to cultivate a warm and welcoming atmosphere where 
      individuals and families can gather, connect, and savor delicious meals. 

    


      Our commitment to transparency means that our customers can enjoy their meals with confidence, 
      knowing that our dishes are prepared with integrity and care.
      GreatGuys is not just a store; it's a movement towards a more compassionate and sustainable way of eating. 
      We envision a world where fast food doesn't have to mean sacrificing health, taste, or ethical values. 
      Join us on this journey as we redefine convenience dining, one delicious bite at a time."</p> 
      </div>




      <div className='message-div'>
    <h4>Message from our CEO and Founder</h4>
    <p className='message'>It gives me immense pleasure to welcome you to <br /> the greatguys website. 
    <br />
    
    Our website is a window into our world through <br /> which you can see how and where we started, <br /> where we are today, 
    and what future looks like. <br /> <b> - Anil Patole, Founder</b> 
    <Link to="https://www.facebook.com/profile.php?id=100090468813799" target='_blank' rel='noreferrer'><FacebookIcon fontSize={'large'} /> </Link>
   <b> & </b> <Link to="https://www.instagram.com/_greatguys.in_/" target='_blank' rel='noreferrer'><InstagramIcon fontSize={'large'}/> </Link>
   </p>
     
    
      </div>
      </div>
    </>
  )
}

export default AboutUs