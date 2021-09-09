import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plantData, setPlantData] = useState([])
  const [issueRequest, setIssueRequest] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(()=> {
    console.log("Fetching data...");
    loadPlantData();
  }, [issueRequest])


function loadPlantData(){
  fetch("http://localhost:6001/plants")
    .then(resp => resp.json())
    .then(data => {console.log("Data fetched!", data);
                  setPlantData(data)})
}

function handleAddPlant(newPlant) {
  setPlantData([...plantData, newPlant]);
}
function handleSearch(event){
  setSearch(event.target.value)
}


function handlePlantDelete (id){
  const deletePlantUpdate = plantData.filter(plant => plant.id !== id)
  setPlantData(deletePlantUpdate)
  fetch(`http://localhost:6001/plants/${id}`, {
    method : "DELETE",
    headers : {
      'content-type': 'application/json'
    }
  })

}

const searchResults = plantData.filter(plant=> search ==='' || plant.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <main>
      <NewPlantForm handleAddPlant={handleAddPlant} />
      <Search handleSearch={handleSearch} search={search} />
      <PlantList handlePlantDelete={handlePlantDelete} plantData={searchResults}/>
    </main>
  );
}

export default PlantPage;
