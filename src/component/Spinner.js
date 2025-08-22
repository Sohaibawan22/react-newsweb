import React from 'react'
import Loading from '../Loading.gif'; // Importing the loading GIF

const Spinner = () => {

    return (
      <div className="spin">
        <img src={Loading} alt="loading" />
      </div>
    );
 
}
export default Spinner;