import React, { useEffect, useState } from "react";
import axios from "axios";

import Criptomoneda from "./Criptomoneda";
import Error from "./Error";

function Formulario({ guardarMoneda, guardarCriptomoneda }) {
  /* States */
  const [criptomonedas, guardarCriptomonedas] = useState([]);
  const [monedaCotizar, guardarMonedaCotizar] = useState("");
  const [criptoCotizar, guardarCriptoCotizar] = useState("");
  const [error, guardarError] = useState(false);

  /* Effect */
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD";
      const resultado = await axios.get(url);

      // colocar respuesta en el state
      guardarCriptomonedas(resultado.data.Data);
    };

    consultarAPI();
  }, []);

  //Validar que el usuario lene ambos campos

  const cotizarMoneda = e => {
    e.preventDefault();

    //Validar si ambos campos estan llenos
    if (monedaCotizar === "" || criptoCotizar === "") {
      guardarError(true);
      return;
    }

    //Pasar los campos en el componente principal
    guardarError(false);

    guardarMoneda(monedaCotizar);
    guardarCriptomoneda(criptoCotizar);
  };

  //Mensaje de error en caso de que exista

  const componente = error ? (
    <Error mensaje="Ambos campos son obligatorios" />
  ) : null;

  return (
    <form onSubmit={cotizarMoneda}>
      {/* Mostramos el error */}
      {componente}
      <div className="row">
        <label htmlFor="">Elige tu moneda</label>
        <select
          className="u-full-width"
          onChange={e => guardarMonedaCotizar(e.target.value)}
        >
          <option value="">- Elige tu Moneda -</option>
          <option value="USD">Dolar Estadounidense</option>
          <option value="MXN">Peso Mexicano</option>
          <option value="GBP">Libras</option>
          <option value="EUR">Euro</option>
        </select>
      </div>

      <div className="row">
        <label htmlFor="">Elije tu Criptoomoneda</label>
        <select
          className="u-full-width"
          onChange={e => guardarCriptoCotizar(e.target.value)}
        >
          <option value="">- Elige tu Criptomoneda -</option>
          {criptomonedas.map(criptomoneda => (
            <Criptomoneda
              key={criptomoneda.CoinInfo.Id}
              criptomoneda={criptomoneda}
            />
          ))}
        </select>
      </div>
      <input
        type="submit"
        className="button-primary u-full-width"
        value="Calcular"
      />
    </form>
  );
}

export default Formulario;
