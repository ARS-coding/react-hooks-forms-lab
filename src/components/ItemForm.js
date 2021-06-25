import React, {useState} from "react";
import { v4 as uuid } from "uuid";

function ItemForm({onItemFormSubmit}) {

  const [inputState, setInputState] = useState({name: "", category: "Produce"});
  const [id, setId] = useState(uuid());
  
  function onInputChange(event) { // for controlling the name and select inputs
    setId(uuid());
    setInputState({...inputState, [event.target.name]: event.target.value, id: id});
  }

  return (
    <form className="NewItem" onSubmit={(event) => {
      event.preventDefault();
      onItemFormSubmit(inputState);
    }}>
      <label>
        Name:
        <input type="text" name="name" onChange={onInputChange} />
      </label>

      <label>
        Category:
        <select name="category" onChange={onInputChange}>
          <option value="Produce" defaultValue>Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
