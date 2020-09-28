import React from 'react';
import CardCollapse from "./Card-collapse";
import CardExpand from "./Card-expand";

export default class Card extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick = function (e) {
        e.stopPropagation();
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    renderCard() {
        if(this.state.collapsed) {
            return (
                <CardCollapse
                    people={this.props.people}
                    starts={this.props.starts}
                    duration={this.props.duration}/>
            )
        } else {
            return (
                <CardExpand
                    people={this.props.people}
                    starts={this.props.starts}
                    duration={this.props.duration}/>
                )
        }
    }
    render() {
        return (
            <div className="card" onClick={this.handleClick}>
                { this.renderCard() }
            </div>
        )
    }
}
