import React from "react";
import PlantCard from "./PlantCard";

function PlantList( {plantData, handlePlantDelete} ) {
  const eachPlant = plantData.map(plant=> (
    <PlantCard
    key={plant.id}
    id={plant.id}
    name={plant.name}
    image={plant.image}
    price={plant.price}
    handlePlantDelete={handlePlantDelete}
    />
  ))
  return (
    <ul className="cards">{eachPlant}</ul>
  );
}

export default PlantList;
