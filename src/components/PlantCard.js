import React, { useState } from "react";

function PlantCard({id, name, image, price, handlePlantDelete }) {
  const [isToggle, setIsToggle] = useState(true)
  const [newPrice, setNewPrice] = useState(price)
  function handleBttnClick(){
      setIsToggle(!isToggle)
    }
  
  
  function handlePriceChange(e){
    setNewPrice(parseFloat(e.target.value))
  }


  function handleNewPriceSub(){
    const inputPrice = {
      price: newPrice
    }
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputPrice)
    }).then(resp => resp.json())
      .then(data => updatePrice(data))
    
  }

  function updatePrice(newPrice){
    setNewPrice({...price, newPrice})
  }
  
  
  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      <form onSubmit={handleNewPriceSub}>
        <input onChange={handlePriceChange} type="number" name="price" step="0.01" placeholder={price} />
        <button type="submit">Update Price</button>
      </form>
      {isToggle ? (
        <button onClick={handleBttnClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleBttnClick}>Out of Stock</button>
      )}
      <button onClick={()=> handlePlantDelete(id)}>Delete Plant</button>
    </li>
  );
}

export default PlantCard;
