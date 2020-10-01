import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngridients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log('Rendering ingredients', ingredients)
  })

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setIngridients(filteredIngredients);
  }, []);

  const addIngredientsHandler = ingredient => {
    setIsLoading(true);
    fetch('https://react-hooks-fc1d4.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      setIsLoading(false);
      return response.json();
    }).then(responseData => {
      setIngridients(prevIngridients => [
        ...prevIngridients, 
        { id: responseData.name, ...ingredient}
      ]);
    });
  };

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true);
    fetch(`https://react-hooks-fc1d4.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
    }).then(response => {
      setIsLoading(false);
      setIngridients(prevIngridients => prevIngridients.filter((ingredient => ingredient.id !== ingredientId ) 
      ));
    }).catch(error => {
      setError('Something went wrong');
      setIsLoading(false);
    })
  }

  const clearError = () => {
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}> {error} </ErrorModal>}

      <IngredientForm onAddingIngredient={addIngredientsHandler} loading={isLoading} />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
