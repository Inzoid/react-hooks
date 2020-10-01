import React, { useReducer, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientsReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there');
  }
}

const httpReducer = (currHttpState, action) => {
  switch(action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null
      };
    case 'RESPONSE':
      return {
        ...currHttpState,
        loading: false,
        error: null
      };
    case 'ERROR':
      return {
        loading: false, error: action.errorMessage
      };
    case 'CLEAR':
      return {
        ...currHttpState, error: null
      };
    default:
      throw new Error('Should not be reached');
  }
}

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientsReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null });

  useEffect(() => {
    console.log('Rendering ingredients', ingredients)
  })

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({type: 'SET', ingredients: filteredIngredients})
  }, []);

  const addIngredientsHandler = ingredient => {
    dispatchHttp({type: 'SEND'});
    fetch('https://react-hooks-fc1d4.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      dispatchHttp({type: 'RESPONSE'}); 
      return response.json();
    }).then(responseData => {
      dispatch({type: 'ADD', ingredient})
    });
  };

  const removeIngredientHandler = ingredientId => {
    dispatchHttp({type: 'SEND'});
    fetch(`https://react-hooks-fc1d4.firebaseio.com/ingredients/${ingredientId}.jon`, {
      method: 'DELETE',
    }).then(response => {
      dispatchHttp({type: 'RESPONSE'});
      dispatch({type: 'DELETE', id: ingredientId});
    }).catch(error => {
      dispatchHttp({type: 'ERROR', errorMessage: 'Error gan'});
    })
  }

  const clearError = () => {
    dispatchHttp({type: 'CLEAR'});
  };

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}> {httpState.error} </ErrorModal>}
      <IngredientForm onAddingIngredient={addIngredientsHandler} loading={httpState.loading} />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
