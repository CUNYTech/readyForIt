import React from 'react';

const Donation = ({donation}) => {
    return(
        <div>
            <h2>{donation.title}</h2>
            <img alt="" src={donation.image}/>
            <h5>{donation.amount}</h5>
            <p>{donation.description}</p>
            <a href={`https://www.gofundme.com${donation.link}`} target="_blank">Read More</a>
        </div>
    )
}
 

export default Donation;