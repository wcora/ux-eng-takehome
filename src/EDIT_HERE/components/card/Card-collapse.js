import React from 'react';
import PlusIcon from "../Atomics/PlusIcon";
import _ from "lodash";
import "./Card.scss";

export default class CardCollapse extends React.Component{

    render() {
        const peopleToShow = _.filter(
            this.props.people,
            (person) => person.affinityToMe >= 0.5
        );

        return (
            <div className={"card--detail"}>
                <div className="card--header minor--text">
                    {peopleToShow.map((person) => (
                        <img className={"avatar"}
                            key={person.id}
                            alt={person.id}
                            src={person.img} />
                    ))}
                    + {this.props.people.length - peopleToShow.length} people
                    <PlusIcon/>
                </div>
            </div>
        )
    }
}
