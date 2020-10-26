import React from 'react'
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ResultadoDiv = styled.div`
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
`;
const Info = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
    }
`;
const Precio = styled.p`
    font-size: 30px;
    span{
        font-weight: 700;
    }
`;
const Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).length === 0) return null;
    return ( 
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio con el que empezó el día: <span>{resultado.OPENDAY}</span></Info>
            <Info>Precio más alto del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio más bajo del día: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación ultimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Última actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
     );
}
Cotizacion.propTypes = {
    resultado: PropTypes.object.isRequired
} 
export default Cotizacion;