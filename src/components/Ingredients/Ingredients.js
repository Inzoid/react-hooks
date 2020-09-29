import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngridients] = useState([]);
  
  const addIngredientsHandler = ingredient => {
    setIngridients(prevIngridients => [
      ...prevIngridients, 
      { id: Math.random().toString(), ...ingredient}
    ]);
  };

  return (
    <div className="App">
      <IngredientForm onAddingIngredient={addIngredientsHandler} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
