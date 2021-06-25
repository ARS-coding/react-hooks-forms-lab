import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ setItems, items }) {

  // const [itemsData, setItemsData] = useState(items); // being used for displaying the list items

  const [selectedCategory, setSelectedCategory] = useState("All"); // being used for filterin items by their category
  const [searchText, setSearchText] = useState(""); // being used for filterin the items 

  function onItemFormSubmit(inputState) { // to crate another item
    // event.preventDefault();
    if(items.some((item) => item.id === inputState.id)) {
      return console.log("Please add a different item.")
    } else if (inputState.name === "" || inputState.id === undefined) { return console.log("Please specify a name.") }
    console.log("Added succesfully!");
    setItems([...items, {id: inputState.id, name: inputState.name, category: inputState.category}])
  }
  // console.log(items)
  function handleSearchTextChange(event) {
    setSearchText(event.target.value)
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  
  function displayItems() { 
    const categoryItems = items.filter((item) => {
      if (selectedCategory === "All") return true;
  
      return item.category === selectedCategory;
    });
  
    function searchItems() { // don't call this if searchText state is an empty string
      let regex = new RegExp(`${searchText}`, "i");
      return categoryItems.filter((item) => regex.test(item.name)) // if the item object's name property contains the given searchText inside, it will return it
    }
    return searchItems()
  }

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      <Filter search={searchText} onSearchChange={handleSearchTextChange} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {displayItems().map((item) => ( // every item displayed is related to the "items" state that has been declared in App.js file
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
