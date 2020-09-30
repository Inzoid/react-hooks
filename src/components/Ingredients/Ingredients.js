import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngridients] = useState([]);

  useEffect(() => {
    console.log('Rendering ingredients', ingredients)
  })
  
  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setIngridients(filteredIngredients);
  }, []);

  const addIngredientsHandler = ingredient => {
    fetch('https://react-hooks-fc1d4.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setIngridients(prevIngridients => [
        ...prevIngridients, 
        { id: responseData.name, ...ingredient}
      ]);
    });
  };

  const removeIngredientHandler = ingredientId => {
    setIngridients(prevIngridients => prevIngridients.filter((ingredient => ingredient.id !== ingredientId ) 
    ));
  }

  return (
    <div className="App">
      <IngredientForm onAddingIngredient={addIngredientsHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
