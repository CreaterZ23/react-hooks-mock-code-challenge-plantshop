import React, {useState} from "react";

function NewPlantForm( { handleAddPlant} ) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)

function handleSubmitForm(event){
  event.preventDefault()
  const newPlant = {
    name: name,
    image: image,
    price: price
  }
  fetch('http://localhost:6001/plants', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlant),
  })
  .then((r) => r.json())
  .then((newPlant) => handleAddPlant(newPlant));
}




  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmitForm}>
        <input onChange={(e)=> setName(e.target.value)} value={name}type="text" name="name" placeholder="Plant name" />
        <input onChange={(e)=> setImage(e.target.value)} value={image}type="text" name="image" placeholder="Image URL" />
        <input onChange={(e)=> setPrice(parseFloat(e.target.value))} value={price}type="number" name="price" step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
