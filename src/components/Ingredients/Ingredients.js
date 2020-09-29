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

  const removeIngredientHandler = ingredientId => {
    setIngridients(prevIngridients => prevIngridients.filter((ingredient => ingredient.id !== ingredientId ) 
    ));
  }

  return (
    <div className="App">
      <IngredientForm onAddingIngredient={addIngredientsHandler} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
