import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numbersEntered: '',
            numbersArranged: [],
            resultMsg: 'Result:'
        }

    }

    handleChange = () => event => { 
        this.setState({numbersEntered: event.target.value});
    }

    postData = (url = ``, data = {}) => {
        let context = this;
        return fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(data),
        })
        .then((response) => {if(response.ok){  return response.json(); } else{ context.setState({resultMsg: 'Could not connect'})}})
        .then(responseData => {return responseData})
        .then(data => {context.setState({resultMsg: 'Result: ' + data.fizzBuzz})})
    }

    handleNumbers = () => {
        const {numbersEntered, numbersArranged} = this.state;

        this.setState({
            numbersArranged: [
                ...numbersArranged,
                ...numbersEntered
                    .split(/[,.-]+/)
                    .filter(n => n !== /[ ]+/ && n !== /^[0-9]*$/ && n !== null && n !== '')
                    .map(n => Number(n))
                    .filter(n => n < 2147483647)
                    .filter(n => !isNaN(n))
            ],
            numbersEntered: ''
        });
    }

    handleSubmit = () => {
        const {numbersArranged} = this.state;

        if(numbersArranged && numbersArranged.length > 0) {
            this.postData('http://ec2-18-224-202-17.us-east-2.compute.amazonaws.com:9000/fizzbuzz/convert', numbersArranged);
        }
    }

    render() {
        const {numbersEntered, numbersArranged, resultMsg} = this.state;

        return (
            <div className="App">
                <div
                    className="container"
                    style={{
                    border: '1px'
                }}>
                    <h3>{resultMsg}</h3>
                </div>
                <br/>
                <div className="container">
                    <h5>{numbersArranged.map((n, index) => (index !== (numbersArranged.length-1) ? n + ', ': n))}</h5>
                </div>
                <div className="container">
                    <textarea
                        value={numbersEntered}
                        onChange={this.handleChange()}
                        className="u-full-width"
                        placeholder="Enter the numbers here seperated by ', . - ' ..."
                        id="exampleMessage"
                        style={{
                        resize: 'none',
                        margin: 'auto',
                        marginBottom: '4px',
                        height: '180px',
                        display: 'grid'
                    }}/>
                    <button
                        onClick={this.handleNumbers}
                        style={{
                        textTransform: 'none',
                        float: 'right'
                    }}>
                        add them
                    </button>
                </div>
                <div className="container">
                    <button
                        onClick={this.handleSubmit}
                        className="button-primary"
                        style={{
                        width: '240px'
                    }}>
                        try!!
                    </button>
                    <button
                        onClick={() => this.setState({numbersArranged: [], numbersEntered: '', resultMsg: 'Result:'})}
                        style={{
                        textTransform: 'none'
                    }}>
                        reset all
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
