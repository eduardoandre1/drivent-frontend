import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '../../../components/Form/Button';

export default function Hotel() {
const [escolheuQuarto, setEscolheuQuarto] = useState(true);


return (
<>
<StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

<SubmitContainer>
<Button type="submit" disabled={escolheuQuarto} > Reservar Quarto</Button>
</SubmitContainer>
</>
);
}

const StyledTypography = styled(Typography)`
margin-bottom: 20px!important;
`;

const SubmitContainer = styled.div`
margin-top: 40px!important;
width: 100%!important;

> button {
margin-top: 0 !important;
color: #000000;

}
`;
