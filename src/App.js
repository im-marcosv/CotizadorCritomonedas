import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import styled from '@emotion/styled';
import img from './cryptomonedas.png';
import axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media(min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 2rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 2rem;
  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
  

`;

function App() {
  const [moneda, guardarMoneda] = useState('');
  const [cripto, guardarCripto] = useState('');
  const [cotizacion, guardarCotizacion] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCripto = async () => {
      //Evitamos que se ejecute la primera vez
      if(moneda === '') return;
      //Consultar la API para tener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
      //Mostrar el spinner
      guardarCargando(true);
      const resultado = await axios.get(url);
      
      //Ocultar el Spinner y mostrar resultado
      setTimeout(() => {
        //Cambiar State de cargando
        guardarCargando(false);
        guardarCotizacion(resultado.data.DISPLAY[cripto][moneda]);
      }, 3000);
      
    }
    cotizarCripto();
  },[moneda, cripto]);

  //Mostrar Spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={cotizacion}/>;
  return (
    <Contenedor>
      <div><Imagen src={img} alt="imagen cripto" /></div>
      <div>
        <Heading>Cotizador de Criptomonedas</Heading>
        <Formulario guardarMoneda={guardarMoneda} guardarCripto={guardarCripto}/>
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
