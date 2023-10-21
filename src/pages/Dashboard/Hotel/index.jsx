import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import instance from '../../../services/api';

export default function Hotel() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios.get(`${instance}/hotels`)
      .then(resp => setHotels(resp.data))
      .catch(erro => alert(erro.response.data.message));
  }, []);

  // Função para lidar com o clique em um hotel
  const handleHotelClick = (hotelId) => {
    // Faça algo com o hotel clicado, por exemplo, redirecione para uma página de detalhes do hotel
    console.log(`Hotel ${hotelId} clicado!`);
  };

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      
      {/* Renderize cada hotel como um botão clicável */}
      {hotels.map((hotel) => (
        <HotelContainer key={hotel.id} onClick={() => handleHotelClick(hotel.id)}>
          <img src={hotel.image} alt={hotel.name} />
          <h1>{hotel.name}</h1>
          <h2>Tipos de acomodação</h2>
          <h3>Single e Double</h3>
          <h2>Vagas disponíveis:</h2>
          <h3>{hotel.Rooms.length}</h3>
        </HotelContainer>
      ))}
    </>
  );
}


const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const HotelContainer = styled.div`
  width: 196px;
  height: 264px;
  top: 323px;
  left: 771px;
  border-radius: 10px;
  background: #EBEBEB;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  /* justify-content: space-around;
  align-items: center; */
  div {
    margin-left: 14px;
    margin-top: 10px;
    align-items: center;
    justify-content: center;
  }
  img {
    margin-left: 14px;
    margin-top: 14px;
    width: 168px;
    height: 109px;
    top: 339px;
    left: 785px;
    border-radius: 5px;
    background: black;
    text-align: center;
  }
  h1 {
    margin-left: 14px;
    margin-top: 10px;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #343434;
  }
  h2 {
    margin-left: 14px;
    margin-top: 10px;
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    color: #3C3C3C;
  }
  h3 {
    margin-left: 14px;
    margin-top: 10px;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    color: #3C3C3C;
  }
`;
