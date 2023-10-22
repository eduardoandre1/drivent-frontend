import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import useEnrollment from '../../hooks/api/useEnrollment';
import axios from "axios";



export default function TicketOptions() {

    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const [isTicketTypeSelected, setIsTypeTicketSelected] = useState(false);
    const [isHotelSelected, setIsHotelSelected] = useState(false);
    const [btnTypeSelected, setBtnTypeSelected] = useState(null);
    const [btnHotelSelected, setBtnHotelSelected] = useState(null);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [hotelPrice, setHotelPrice] = useState(0);
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    const { enrollment } = useEnrollment();    

    useEffect(() => {
        if (enrollment){
            setIsUserRegistered(true);
        }
    }, [enrollment]);

    const selectTicket = (button) => {

        if (btnTypeSelected === button) {
            setBtnTypeSelected(null);
            setIsTypeTicketSelected(false);
            setIsHotelSelected(false);
            setTicketPrice(0);
            setHotelPrice(0);
        } 
        else {
            setBtnTypeSelected(button);
            if (button === 'remote'){
                setIsTypeTicketSelected(false);
                setIsHotelSelected(true);
                setTicketPrice(100);
                setHotelPrice(0);
            }
            else {
                setIsTypeTicketSelected(true);
                setTicketPrice(250);
                setIsHotelSelected(false);
                setBtnHotelSelected(null);
            }
        }
    }

    const selectHotel = (button) => {

        if (btnHotelSelected === button) {
            setBtnHotelSelected(null);
            setIsHotelSelected(false);
            setHotelPrice(0);
        } 
        else {
            setBtnHotelSelected(button);
            setIsHotelSelected(true);
            if (button === 'noHotel'){
                setHotelPrice(0);
            }
            else {
                setHotelPrice(350);
            }
        }
    }

    function ticketChosen() {

        const url = `${import.meta.env.VITE_API_URL}/tickets/`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
    
        const data = {
          ticketTypeId: selectedTicketId
    
        };
        const promise = axios.post(url, data, config);
        promise.then(response => {
          console.log("reservado")
        })
          .catch(err => {
            alert(err.response.data);
    
          });
      }

    return (
        <>
        <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>

            <UnregisteredUserWarning isOpen={isUserRegistered} >
                <div> 
                    Você precisa completar sua inscrição antes
                    de prosseguir para escolha de ingresso
                </div>
            </UnregisteredUserWarning>
        
            <TicketSelection>
                <TicketType isOpen={isUserRegistered}>
                    <h5> Primeiro escolha a sua modalidade de ingresso </h5>
                    <Typebtn isSelected={btnTypeSelected === 'inPerson'} onClick={() => selectTicket('inPerson')}> 
                        <p> Presencial </p>
                        <p className='price'> R$ 250 </p>
                    </Typebtn>
                    <Typebtn isSelected={btnTypeSelected === 'remote'} onClick={() => selectTicket('remote')} > 
                        <p> Online </p>
                        <p className='price'> R$ 100 </p>
                    </Typebtn>
                </TicketType>                
            </TicketSelection>

            <TicketSelection>
                <TicketHotel isOpen={isTicketTypeSelected} >
                    <h5> Ótimo! Agora escolha sua modalidade de hospedagem </h5>
                    <Hotelbtn isSelected={btnHotelSelected === 'noHotel'} onClick={() => selectHotel('noHotel')}> 
                        <p> Sem hotel </p>
                        <p className='price'> + R$ 0 </p>
                    </Hotelbtn>
                    <Hotelbtn isSelected={btnHotelSelected === 'includeHotel'} onClick={() => selectHotel('includeHotel')}> 
                        <p> Com hotel </p>
                        <p className='price'> + R$ 350 </p>
                    </Hotelbtn>
                </TicketHotel>      

                <CloseTicketSelection isOpen={isHotelSelected}>
                    <h5> Fechado! O total ficou em <span> R${ticketPrice + hotelPrice} </span>. Agora é só confirmar! </h5>
                    <button onClick={() => ticketChosen()} > RESERVAR INGRESSO </button>
                </CloseTicketSelection>   
            </TicketSelection>            
        </>
    );
}

const StyledTypography = styled(Typography)`
    margin-bottom: 20px!important;
`;

const TicketSelection = styled.div`

    margin: 20px 0 20px 0;
    font-family: 'Roboto', sans-serif;

    h5 {
        
        font-size: 20px;
        color: #8E8E8E;
    }

    button {
        width: 145px;
        height: 145px;   
        border-radius: 20px;
        border: 1px solid #CECECE;
        margin: 20px 20px 20px 0;
        font-size: 16px;
        cursor: pointer;

        &:hover {
            box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15); 
        }
    }

    .price {
        color: #898989;
    }
`;

const Typebtn = styled.button`
    background-color: ${props => (props.isSelected ? '#FFEED2' : '#FFFFFF')};
`
const Hotelbtn = styled.button`
    background-color: ${props => (props.isSelected ? '#FFEED2' : '#FFFFFF')};
`

const CloseTicketSelection = styled.div`

    display: ${props => (props.isOpen ? 'block' : 'none')};

    h5 {
        font-size: 20px;
        color: #8E8E8E;
    }

    span {
        font-weight: bold;
    }

    button {
        width: 165px;
        height: 40px;
        border-radius: 4px;
        background: #E0E0E0;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25); 
        margin: 20px 20px 20px 0;
        font-size: 14px;
        cursor: pointer;

        &:hover {
            background-color: #cacaca; /* Mudar a cor ao passar o mouse */
        }
    }
`

const UnregisteredUserWarning = styled.div`

    display: ${props => (props.isOpen ? 'none' : 'flex')};    
    height: 80%;
    align-items: center;
    justify-content: center;

    div {
        width: 450px;
        text-align: center;
        color: #8E8E8E;
        font-family: 'Roboto', sans-serif;
        font-size: 20px; 
        line-height: normal; 
    }

`
const TicketType = styled.div`
    display: ${props => (props.isOpen ? 'block' : 'none')};
`
const TicketHotel= styled.div`
    display: ${props => (props.isOpen ? 'block' : 'none')};
`
