import React from 'react';

function Criptomoneda({criptomoneda}) {
    const { Name, FullName} = criptomoneda.CoinInfo;
    
    return (
        <option value={Name}>
           {FullName}
        </option>
    )
}

export default Criptomoneda
