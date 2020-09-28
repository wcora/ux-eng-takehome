import React from "react";
import './index.scss';

export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            running:"",
            text:"I'M FEELING LUCKY TODAY"
        }
    }

    randomEvent = () => {
        this.setState({running: "active", text:"PICKING A PARTY FOR YOU"})
        setTimeout(() => {
            this.props.findEvent();
            this.setState({running: "", text:"I'M FEELING LUCKY TODAY"})
        }, 2000);
    }

    render() {
        return (
            <div
                className={`timeline ${this.state.running}`}
                style={{
                    backgroundColor:"#6A76E8",
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "0.5rem",
                    cursor: "pointer"
                }}
            onClick={this.randomEvent}
        >
                {this.state.text}
        </div>)
    };
}
