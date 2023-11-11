// import { color } from "@mui/system"
// import React, { useEffect, useState } from "react"
import './Home.css'
function Home(){
  return (
    <> <h1 className="welcome" style={{color:"#374259"}}>Welcome to home of GreatGuys</h1> 
    <h2 className="welcome" style={{color:"#374259"}} >Award</h2>
    <link href="https://awards.infcdn.net/circle_v2.css" rel="stylesheet"/><div id="circle_v2" className="Award"> <div class="data_test arc-heading "> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="160px" height="160px" viewBox="0 0 160 160"> <defs> <path id="heading-arc" d="M 30 80 a 50 50 0 1 1 100 0"></path> </defs> <text class="arc-heading__heading " fill="#000" text-anchor="middle"> <textPath startOffset="50%" xlink:href="#heading-arc">Recommended</textPath> </text> </svg> </div> <div class="sq_year">2023</div> <a href="https://restaurant-guru.in/Great-Guys-Vadodara" class="sq_center " target="_blank">Great Guys</a> <div class="arc-heading arc-heading__bottom"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="120px" height="120px" viewBox="0 0 120 120"> <defs> <path id="subheading-arc" d="M 12 60 a 48 48 0 0 0 96 0"></path> </defs> <text class="arc-heading__subheading" fill="#000" text-anchor="middle"> <textPath startOffset="50%" xlink:href="#subheading-arc"><a href="https://restaurantguru.com" target="_blank">Restaurant Guru</a></textPath> </text> </svg> </div></div>
      <div className="App">

         
            <p className="misson-statement">At GreatGuys, <br />Our mission is to revolutionize the fast food industry by providing a mouthwatering and guilt-free vegetarian dining experience that nourishes both people and the planet. We are committed to crafting delectable, chef-inspired dishes that cater to diverse tastes and dietary preferences, without compromising on quality or speed.

At the heart of our mission is a dedication to sustainability. We believe in the power of plant-based nutrition to create a positive impact on the environment, animal welfare, and human well-being. By sourcing locally grown, organic ingredients, we reduce our carbon footprint and support local farmers. Our menu is thoughtfully designed to showcase the vibrant flavors and versatility of plants, aiming to delight even the most discerning palates.

Beyond our culinary offerings, we strive to cultivate a warm and welcoming atmosphere where individuals and families can gather, connect, and savor delicious meals. Our commitment to transparency means that our customers can enjoy their meals with confidence, knowing that our dishes are prepared with integrity and care.

GreatGuys is not just a restaurant; it's a movement towards a more compassionate and sustainable way of eating. We envision a world where fast food doesn't have to mean sacrificing health, taste, or ethical values. Join us on this journey as we redefine convenience dining, one delicious bite at a time.</p>


</div>

        
      
  </>
  )
  }


export default Home