import React, {useEffect, useState} from 'react'
import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCripto from '../hooks/useCripto';
import styled from '@emotion/styled';
import axios from 'axios';
import PropTypes from 'prop-types';

const Boton = styled.input`
    margin-top: 10px;
    font-weight: 700;
    font-size: 20px;
    padding: 10px;
    background-color: #0652DD;
    border:none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: .6s ease;
    &:hover{
        background-color: #5758BB;
        cursor: pointer;
    }
`;
const Formulario = ({guardarMoneda, guardarCripto}) => {
    //State del estado de Criptos
    const [listaCriptos, guardarCriptos] = useState([]);
    //State del error
    const [error, guardarError] = useState(false);
    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar Americano'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
        {codigo: 'UYU', nombre: 'Peso Uruguayo'}
    ]
    //Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);
    //Utilizar useCripto
    const [criptomoneda, SelectCripto] = useCripto('Elige tu Criptomoneda', '', listaCriptos)
    //Ejecutar llamado a la API
    useEffect(() =>{
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptos(resultado.data.Data)
        }
        consultarAPI();
    },[]);

    //Cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();

        //Validación
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        //Pasar datos al componente principal
        guardarMoneda(moneda);
        guardarCripto(criptomoneda);
    }
    return ( 
        <form onSubmit={handleSubmit}>
            {error ? <Error mensaje="Completa todos los campos"/> : null}
            <SelectMonedas />
            <SelectCripto />
            <Boton type="submit" value="Calcular"/>
        </form>
     );
}
Formulario.propTypes = {
    guardarMoneda: PropTypes.func.isRequired,
    guardarCripto: PropTypes.func.isRequired
} 
export default Formulario;