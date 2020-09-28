import React from 'react';
import './Sort.scss'
import SortIcon from "./SortIcon";


export default class Sort extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dropdown: false,
            active: 0
        }
        this.toggleDropdown = this.toggleDropdown.bind(this)
    }
    handlePartyClick = (e) => {
        if (e.target.innerHTML === 'Chronological') {
            this.sortData(['starts'], 'parties');
        } else {
            this.sortData(['affinity'], 'parties');
        }
    }
    handleJobClick = (e) => {
        if (e.target.innerHTML === 'Credits') {
            this.sortData(['credits']);
        } else if (e.target.innerHTML === 'Start Date') {
            this.sortData(['latestStartDate'], 'jobs');
        } else {
            this.sortData(['estimatedHours'], 'jobs');
        }
    }
    toggleDropdown = () => {
        this.setState({ dropdown: !this.state.dropdown })
    }

    sortData = (order, type) => {
        this.props.sortBy(order, type)
    }

    renderDropdown = () => {
        return (
            this.props.content === "parties" ?
                    this.state.dropdown ?
                        <ul onClick={this.handlePartyClick}>
                            <li>Chronological</li>
                            <li>Affinity</li>
                        </ul>
                        :
                        null
                 :
                    this.state.dropdown ?
                    <ul onClick={this.handleJobClick}>
                        <li>Credits</li>
                        <li>Start Date</li>
                        <li>Hours</li>
                    </ul>
                    :
                    null
                )
    }
    render() {
        return (
            <div className={"sort"} onClick={this.toggleDropdown}>
                <SortIcon/>
                <div style={{"clear": "both"}}></div>
                {this.renderDropdown()}
            </div>
        )
    }
}
