import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import instance from '../../../services/api';
import axios from 'axios';
import userContext from '../../../contexts/UserContext';

export default function Hotel({modality, payment}) {
const { userData: {token} } = useContext(userContext)
const [hotels, setHotels] = useState([]);
const [selectedHotel, setSelectedHotel] = useState(null);
const handleHotelClick = (hotelId) => {
setSelectedHotel(hotelId);
};

const getHotelStyle = (hotelId) => {
return {
background: selectedHotel === hotelId ? '#FFEED2' : '#EBEBEB',
};
};

// if (modality === 'presencial' && payment === 'true') {
useEffect(() => {
const getData = async () => {
try {
console.log('token: ', token);
const getHotels = await axios.get(`${instance}/hotels`, { headers: { Authorization: `Bearer ${token}`, },});
setHotels(getHotels.data);
console.log('hotels: ', getHotels.data);
} catch ({response: {data: {message}}}) {
alert(message);
console.log('erro: ', message);
}
}
getData();
}, [token]);
// }

if (modality === 'online') {
return (
<Error>
Sua modalidade de ingresso não inclui hospedagem <br></br>
Prossiga para a escolha de atividades
</Error>
);
}

if (payment === 'false') {
return (
<Error>
Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem
</Error>
);
}

return (
<>
<StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
{hotels.map((hotel) => (
<HotelContainer key={hotel.id} onClick={() => handleHotelClick(hotel.id)} style={getHotelStyle(hotel.id)}>
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

const Error = styled.div`
font-family: Roboto;
font-size: 20px;
font-weight: 400;
line-height: 23px;
letter-spacing: 0em;
text-align: center;
color: #8E8E8E;

`
