
import React from "react";
import MenuItems from "../Components/MenuItems";
import SideMenu from "../Components/SideMenu";
import { useState, useEffect } from "react";


export default function HomePage() {

  const [type, setType] = useState("")
  const [foodItems, setFoodItems] = useState([]);

  const fetchFoodData = async () => {
      try {
          const response = await fetch(`http://localhost:5000/Food/${type}`);
          const jsonData = await response.json();
          setFoodItems(jsonData);
          console.log(foodItems)
      } catch (err) {
          console.error(err);
      }
  }

  useEffect(()=>{
      fetchFoodData()
  },[type])

  console.log(type)


  return (
    <div className="width">
      <SideMenu  allFoods = {foodItems} setType = {setType}/>
      <MenuItems allFoods = {foodItems}/>
    </div>
  );
}
