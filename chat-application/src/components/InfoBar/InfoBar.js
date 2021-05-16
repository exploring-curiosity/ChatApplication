import React from 'react';
import './infobar.css';
import onlineIcon from '../../images/onlineIcon.png';
import closeIcon from '../../images/closeIcon.png';
const InfoBar = ({room}) => {
    return ( 
       <div className='infobar'>
           <div className='leftinner'>
                <img className='onlineicon' src={onlineIcon} alt='onlineImage'/>
                <h3>{room}</h3>
           </div>
           <div className='rightinner'>
                <a href="/"><img src={closeIcon} alt='closeImage'/></a>
           </div>
       </div> 
    );
}
 
export default InfoBar;