import {useParams} from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Trailer.css';

import React from 'react'

const Trailer = () => {

    let params = useParams();
    let key = params.ytTrailerId;
    console.log(key);

  return (
    <div className="react-player-container">
      {(key!=null)?<ReactPlayer controls="true" playing={true} url ={key} 
      width = '60%' height='45%' />:null}
    </div>
  )
}

export default Trailer