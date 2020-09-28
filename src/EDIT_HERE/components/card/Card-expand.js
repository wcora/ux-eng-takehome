import React from 'react';
import MinusIcon from '../Atomics/MinusIcon';
import Attendee from './Attendee';
import {getFutureDate} from "../../utils"
import "./Card.scss"
import _ from "lodash";

export default class CardExpand extends React.Component{
    constructor(props) {
        super(props);
        this.totalPage =  Math.ceil(this.props.people.length / 5) - 1;
        this.attendees = _.orderBy(this.props.people, ['affinityToMe']).reverse();
        this.prevPage = this.prevPage.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.setAttendees = this.setAttendees.bind(this)

        this.state = {
            page: 0,
            toShow: this.setAttendees(0)

        }
    }
    setAttendees = function(page){
        return this.attendees.slice(page * 5, Math.min((page+1) * 5, this.attendees.length))
    }

    prevPage = function(e) {
        e.stopPropagation();
        const curPage = this.state.page;
        if (curPage > 0) {
            const ppl = this.setAttendees(curPage-1);
            this.setState({
                page: curPage-1,
                toShow: ppl
            })
        }
    }

    nextPage = function (e)  {
        e.stopPropagation();
        const curPage = this.state.page;
        if (curPage < this.totalPage) {
            const ppl = this.setAttendees(curPage+1);
            this.setState({
                page: curPage+1,
                toShow: ppl
            })
        }
    }

    render() {
        const page = this.state.page;
        const attendeesToShow = this.state.toShow;
        return (
            <div className={"card--detail"}>
                <div className="card--header">
                    <MinusIcon/>
                </div>
                <section className="card--body">
                    <p className="card--body--info minor--text">{attendeesToShow.length} people are going</p>
                    <p className="card--body--info minor--text">{this.props.duration} hour(s) long</p>
                    <p className="card--body--info minor--text">Starts {getFutureDate(this.props.starts)}</p>
                    <div className="break"></div>
                    <h4>Who are coming? </h4>
                    {attendeesToShow.map((attendee) => (
                        <Attendee
                            key={attendee.id}
                            attendee={attendee}/>
                    ))}
                    <div className="card--body--buttons">
                        <button className={"btn btn--prev"}
                                disabled={page < 1}
                                onClick={this.prevPage}>Prev</button>
                        <button className={`btn btn--next`}
                                disabled={page >= this.totalPage}
                                onClick={this.nextPage}>Next</button>
                    </div>
                </section>
            </div>
        )
    }
}
