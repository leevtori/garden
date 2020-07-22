import React, {Component} from 'react';
import './Scramble.css'

class TableRow extends Component {
    render(){
        const data = this.props.data

        return (
            <tr id={data[0]}>
                <td className="scrambledText">{data[2]}</td>
                <AnswerCol answer={this.props.answer} data={data}/>
                <td className='hint'>{data[1]}</td>
            </tr>
        );
    }
}

class AnswerCol extends Component {
    render(){
        const data = this.props.data
        const answer = this.props.answer.toLowerCase()
        const rightAnswer = data[1].toLowerCase()
        const value = (answer === rightAnswer)? rightAnswer : ''

        return(
            <td className="textAnswer" id={data[0]}>{value}</td>
        );
    }
}

class TableData extends Component{
    render() {
        return (
            <table>
                <thead>
                <tr>
                    <th>Scramble</th>
                    <th>Flower</th>
                    <th>Hint</th>
                </tr>
                </thead>
                <tbody>
                    {this.props.wordList.map(row => (
                        <TableRow data={row} answer={this.props.answer}/>
                    ))}
                </tbody>
            </table>
        );
    }
}

class InputBar extends Component {
    constructor(props){
        super(props);
        this.handleGuessTextChange = this.handleGuessTextChange.bind(this)
    }

    handleGuessTextChange(e){
        this.props.onGuessTextChange(e.target.value);
    }

    render() {
        return (
            <form>
                <p>Enter your guess here :</p>
                <input id="inputData"
                type='text'
                placeholder="Flower Name"
                value={this.props.guessText}
                onChange={this.handleGuessTextChange}
                />
            </form>
        );
    }
}

class Scramble extends Component {
    constructor(props){
        super(props);
        this.state = {
            guessText:''
        };
        this.handleGuessTextChange = this.handleGuessTextChange.bind(this);
    }

    handleGuessTextChange(guessText){
        this.setState({
            guessText : guessText
        });
    }

    render () {
        if (this.props.wordList.length === undefined){
            return <div>here</div>
        } else {
            return (
                <div className="game1">
                    <h1>Word Scramble</h1>
                    <p>Can you unscramble the word into a flower name?</p>
                    <InputBar 
                    guessText={this.state.guessText}
                    onGuessTextChange={this.handleGuessTextChange}
                    />
                    <TableData
                    wordList={this.props.wordList}
                    answer={this.state.guessText}
                    />
                </div>
            );
        }
    }        
  } 

export default Scramble;