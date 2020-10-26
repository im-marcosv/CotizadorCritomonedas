import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue',cursive;
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 2rem;
    margin-top: 2rem;
    display: block;
`;
const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    font-size: 1.2rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border:none;
`;
const useMoneda = (label, stateInicial, opciones) => {
    //State del hook
    const [state, actualizarState] = useState(stateInicial);
    const Seleccionar = () => (
        <Fragment>
            <Label htmlFor="moneda">{label}</Label>
            <Select 
                name="moneda" 
                id="moneda" 
                onChange={e => actualizarState(e.target.value)}
                value={state}>
                <option value="">-- Seleccione --</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
                
            </Select>
        </Fragment>
    );
    // Retornar State, interfaz y función que modifica el state
    return [state, Seleccionar, actualizarState];

}

export default useMoneda;