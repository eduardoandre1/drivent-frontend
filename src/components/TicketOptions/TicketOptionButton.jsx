import styled from "styled-components";
import { useState } from "react";

export default function TicketOptionButton(props){

    function handleChange(e) {
        props.selectFunction(props); 
    };
    
    return <TypeBtn onClick={handleChange} isselected={props.selected === props.name? true : false} >
                <p> {props.name} </p>
                <p className='price'> R$ {props.price} </p>       
            </TypeBtn>
}

const TypeBtn = styled.button`

    width: 145px;
    height: 145px; 
    font-size: 16px;
    margin: 20px 20px 20px 0;  
    border-radius: 20px;
    border: 1px solid #CECECE;
    background-color: ${props => (props.isselected ? '#FFEED2' : '#FFFFFF')};
    cursor: pointer;

    &:hover {
        box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15); 
    }
    
`