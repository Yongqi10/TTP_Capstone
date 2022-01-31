import React from "react"
import MenuCard from "./MenuCard"
import { useState, useEffect } from "react"

export default function MenuItems({allFoods}) {

    return(
        // formats the grid
        <div className="gridContainer"> 
        <div className="itemsContainer">
        {allFoods.map(index => {
            {/* formats the container */}
            return(
                <MenuCard item = {index}/>
            )
            })}
        </div>
        </div>
    );
}