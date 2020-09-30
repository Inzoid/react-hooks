import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [ enteredTitle, setEnteredTitle ] = useState('');
  const [ enteredAmount, setEnteredAmount ] = useState(0);

  const submitHandler = event => {
    event.preventDefault();
    props.onAddingIngredient({
      title: enteredTitle,
      amount: enteredAmount
    });
  };

  const addCountIngredients = () => {
    setEnteredAmount(enteredAmount + 1);
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" 
              value={enteredTitle} 
              onChange={event => {
                setEnteredTitle(event.target.value);
                }
              }
              />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount"
              value={enteredAmount}
              onChange={event => {
                setEnteredAmount(event.target.value);
                }
              }/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
        <button onClick={addCountIngredients}>Add Amount</button>
      </Card>
    </section>
  );
});

export default IngredientForm;
