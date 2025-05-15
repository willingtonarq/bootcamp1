import React, { useEffect, useState } from 'react';
import axios from 'axios';



export default function SelectDesdeLista() {
 const [opciones, setOpciones] = useState([]);
  // Lista de valores 
  useEffect(() => {
    axios.get('http://localhost:8000/paises')  
      .then((response) => {
        setOpciones(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);
  

  // Estado para almacenar la opción seleccionada
  const [seleccionado, setSeleccionado] = useState('');

  // Manejar el cambio de selección
  const manejarCambio = (event) => {
    let valor = event.target.value
    setSeleccionado(valor);

    axios.get(`http://localhost:8000/graficos/${valor}`)
        .catch((error) => {
          console.error('Error al obtener el detalle:', error);
        });
    };

  return (
    <div>
      <label htmlFor="pais">Selecciona un país:</label>
      <select id="pais" value={seleccionado} onChange={manejarCambio}>
        <option value="">-- Selecciona una opción --</option>
        {opciones.map((opcion, index) => (
          <option key={index} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
        
      {seleccionado && <p>Seleccionaste: {seleccionado}</p> &&
      <div style={{ marginTop: '1rem' }}>
          <img
            src={`${seleccionado}_renewables.gif`}
            alt={`GIF de ${seleccionado}`}
          />
        </div>}
    </div>
  );
}

function MostrarGif(value) {
    value = value + "_renewables.gif"
  return (<img src={value} alt="Gif animado" />);
}
