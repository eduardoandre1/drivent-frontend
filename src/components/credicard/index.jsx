import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import styled from 'styled-components';

function  PaymentForm(){
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  return (
    <CardConteiner >
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form>
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="name"
          name="name"
          placeholder="Card Name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="cvc"
          name="cvc"
          placeholder="CVC"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="expiry"
          name="expiry"
          placeholder="Card expiry"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
      </form>
    </CardConteiner>
  );
}
const CardConteiner = styled.div`
width: 706px;
height: 225px;
display: flex;
flex-direction: row;
margin-left: auto;
margin-right: auto;
justify-items: center;
align-items: center;
form {
    width: 45%;
    height: 100%;
    padding: 5px;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
input{
    border-radius: 3px;
    border: 1px solid black;
    width: 182px;
    height: 37px;
}

`
export default PaymentForm;