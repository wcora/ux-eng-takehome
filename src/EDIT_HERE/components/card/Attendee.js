import React from 'react';

const Attendee = (props) => {
    const {name, img, affinityToMe} = props.attendee;
    const affinityScore = affinityToMe.toFixed(2);
    return(
        <div className={"card--body--attendee"}>
            <img src={img} alt={name}/>
            <div className={"card--body--attendee--info"}>
                <h6>{name}</h6>
                <p>Affinity to me: {affinityScore}</p>
            </div>
            <div style={{"clear": "both"}}></div>
        </div>
    )
}

export default Attendee;
