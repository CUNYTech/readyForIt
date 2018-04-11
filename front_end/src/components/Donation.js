import React from 'react';
import '../css/Donation.css';

const Donation = ({donation}) => {
    return(
        <div className="item">
            <h1>{donation.title}</h1>
            <h3>{donation.amount}</h3>
            <div className="itemContent">
                <img alt="" src={donation.image}/>
                <p>{donation.description}</p>
            </div>

            <button className="readMore">
                <a 
                href={`https://www.gofundme.com${donation.link}`}
                target="_blank">
                + Read More</a>
            </button>
        </div>
    )
}
 

export default Donation;