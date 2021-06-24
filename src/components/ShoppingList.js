import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {

  const [selectedCategory, setSelectedCategory] = useState("Produce");
  const [searchText, setSearchText] = useState("");

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
      console.log(regex)
      return categoryItems.filter((item) => regex.test(item.name)) // if the item object's name property contains the given searchText inside, it will return it
    }
    return searchItems()
  }

  return (
    <div className="ShoppingList">
      <ItemForm />
      <Filter onSearchChange={handleSearchTextChange} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {displayItems().map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
