import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import Loading from '../UI/LoadingIndicator';
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

  useEffect(() => {
    document.title = `Clicked ${enteredAmount} times`;
  })

  const addCountIngredients = () => {
    setEnteredAmount(enteredAmount + 1);
  };

  const minCountIngredients = () => {
    setEnteredAmount(enteredAmount - 1);
  }

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
          <div className="count">
            <button type="submit">Add Ingredient</button>
            {props.loading && <Loading />}
          </div>
        </form>
        <div className="count">
          <button onClick={addCountIngredients}>+ Add</button>
          <button onClick={minCountIngredients}>- Min</button>
        </div>
      </Card>
    </section>
  );
});

export default IngredientForm;
