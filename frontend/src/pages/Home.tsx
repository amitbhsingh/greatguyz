// import { color } from "@mui/system"
import React, { useEffect, useState } from "react"
import './Home.css'
function Home(){
  const [decks,setDecks]=useState([]);
  const [title, setTitle] = useState("");



async function handleCreateDeck( e:React.FormEvent){
  e.preventDefault();
  await fetch("http://localhost:5000/decks",{
    method:"POST",
    body:JSON.stringify({
      title,
    }),
    headers:{
      "Content-Type": "application/json",
    },
  });
  setTitle("");
}
useEffect(()=>{
  async function fetchDecks(){
    const response=await fetch("http://localhost:5000/desck");
    const newDecks=await response.json();
    setDecks(newDecks)
  }
  fetchDecks();
},[]);
  return (
    <> <h1 className="welcome" style={{color:"#374259"}}>Welcome to home of GreatGuys</h1> 
      <div className="App">
        <form onSubmit={handleCreateDeck}>
          <label htmlFor="Deck title">Input section</label>
          <input 
          id="deck-title"
          value={title}

            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
              setTitle(e.target.value);
            }}

          />
          <button className="button" style={{color:"white", backgroundColor:"#374259"}}> Send </button>
          <div>
            <p className="misson-statement">At GreatGuys, <br />Our mission is to revolutionize the fast food industry by providing a mouthwatering and guilt-free vegetarian dining experience that nourishes both people and the planet. We are committed to crafting delectable, chef-inspired dishes that cater to diverse tastes and dietary preferences, without compromising on quality or speed.

At the heart of our mission is a dedication to sustainability. We believe in the power of plant-based nutrition to create a positive impact on the environment, animal welfare, and human well-being. By sourcing locally grown, organic ingredients, we reduce our carbon footprint and support local farmers. Our menu is thoughtfully designed to showcase the vibrant flavors and versatility of plants, aiming to delight even the most discerning palates.

Beyond our culinary offerings, we strive to cultivate a warm and welcoming atmosphere where individuals and families can gather, connect, and savor delicious meals. Our commitment to transparency means that our customers can enjoy their meals with confidence, knowing that our dishes are prepared with integrity and care.

GreenBite is not just a restaurant; it's a movement towards a more compassionate and sustainable way of dining. We envision a world where fast food doesn't have to mean sacrificing health, taste, or ethical values. Join us on this journey as we redefine convenience dining, one delicious bite at a time.</p></div>
        </form>
      </div>
  </>
  )
  }


export default Home