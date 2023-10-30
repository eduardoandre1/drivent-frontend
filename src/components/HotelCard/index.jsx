import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import useTicket from '../../hooks/api/useTicket';
import useToken from '../../hooks/useToken';
import useEnrollment from '../../hooks/api/useEnrollment';
import useTicketTypes from '../../hooks/api/useTicketTypes';
import instance from '../../services/api';
import api from '../../services/api'

// Mock para o modelo Hotel
const mockHotel = {
    id: 1,  
    name: 'Hotel ABC',
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphoto%2Fluxury-resort-gm104731717-11404102&psig=AOvVaw1c-amNpmZaKXdEk9aEpMXN&ust=1698121832884000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKDkufaqi4IDFQAAAAAdAAAAABAE.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
};


// Mock para o modelo Room
const mockRoom = {
    id: 1,
    name: 'Room A',
    capacity: 2,
    hotelId: 1,  
    createdAt: new Date(),
    updatedAt: new Date(),
};

// Mock para a lista de hotéis com quartos
const hotelsWithRooms = [
    {
        id: mockHotel.id,
        name: mockHotel.name,
        image: mockHotel.image,
        Rooms: [
            {
                id: mockRoom.id,
                name: mockRoom.name,
                capacity: mockRoom.capacity,
            },
        ],
    },
    {
        id: mockHotel.id,
        name: mockHotel.name,
        image: mockHotel.image,
        Rooms: [
            {
                id: mockRoom.id,
                name: mockRoom.name,
                capacity: mockRoom.capacity,
            },
        ],
    },
];




export default function HotelCard() {
    // const { ticket } = useTicket();
    // const { enrollment } = useEnrollment();      
    // const { ticketTypes } = useTicketTypes();
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState(0);
    const [ indexOfHotel, setIndexOfHotel ] = useState(-1);
    const [isLoadingHotels, setIsLoadingHotels] = useState(true);

    const token = useToken();

    const ticket = {
        status: 'PAID', 
        TicketType: {
            includesHotel: true, 
        },
    };

    async function getHotel() {
        try {
            const requests = hotels.map((hotel) => {
                return api.get(`${instance}/hotels/${hotel.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            });

        const responses = await Promise.all(requests);
        const hotelData = responses.map((response) => response.data);
        setHotels(hotelData);
        setIsLoadingHotels(false);
        
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        if (hotels.length > 0 && isLoadingHotels) {
            getHotel();
        }
    }, [hotels, isLoadingHotels])
    
    
    function selectHotel(i){
        const hotelId = hotelsWithRooms[i].id
        setIndexOfHotel(i)
        setSelectedHotel(hotelId)
        setSelectedRoom(0)
    }
    
    function selectRoom(i){
        const roomId = hotelsWithRooms[indexOfHotel].Rooms[i].id
        setSelectedRoom(roomId)
    }
    

    function verifyRoomTypes(Rooms) {
        const capacities = new Set();
    
        for (let i = 0; i < Rooms.length; i++) {
            capacities.add(Rooms[i].capacity);
        }
    
        if (capacities.size === 1) {
            if (capacities.has(1)) {
                return 'Single';
            } else if (capacities.has(2)) {
                return 'Double';
            } else if (capacities.has(3)) {
                return 'Triple';
            }
        } else {
            const types = [];
            if (capacities.has(1)) {
                types.push('Single');
            }
            if (capacities.has(2)) {
                types.push('Double');
            }
            if (capacities.has(3)) {
                types.push('Triple');
            }
            return types.join(' e ');
        }
    }
    
    function countRooms(Rooms) {
        if (Array.isArray(Rooms)) {
            return Rooms.length;
        }
        return 0; 
    }
    
    const shouldRenderHotels = ticket.TicketType.includesHotel && ticket.status === 'PAID';

    return (
        <>
            <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
            {/* {hotels.length === 0 && <p>Carregando hotéis...</p>} */}


            {!shouldRenderHotels && (
                <Error>
                {ticket.TicketType.includesHotel
                    ? 'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem'
                    : 'Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades'}
                </Error>
            )}

            {shouldRenderHotels && ticket.TicketType.includesHotel === true && ticket.status === 'PAID' && (
                <HotelsContainer>
                    {hotelsWithRooms.map((hotel, index) => (
                        <HotelContainer key={index} onClick={() => selectHotel(index)} selected={selectedHotel === hotel.id}>
                            <img src={hotel.image} alt={hotel.name} />
                            <h1>{hotel.name}</h1>
                            <h2>Tipos de acomodação:</h2>
                            <h3>{verifyRoomTypes(hotel.Rooms)}</h3>
                            <h2>Vagas disponíveis:</h2>
                            <h3>{countRooms(hotel.Rooms)}</h3>
                        </HotelContainer>
                    ))}
                </HotelsContainer>
            )}
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

const HotelsContainer = styled.div`
    display: flex;
    gap: 20px;
`

const Error = styled.div`
    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
    color: #8E8E8E;

`