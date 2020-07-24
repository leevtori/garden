import React, {Component} from 'react';
import './Scramble.css'

class ScrambleCol extends Component {
    render(){
        const item = this.props.item
        return (
            <td>{item[2]}</td>
        );
    }
}

class AnswerCol extends Component {
    render(){
        debugger;
        const item = this.props.item
        const guessText = this.props.guessText.toLowerCase()
        const rightAnswer = item[1]

        const giveUp = this.props.giveUp

        const value = (rightAnswer.toLowerCase() === guessText)?
            <td><span style={{color: 'green'}}>{guessText}</span></td> :
            '';

        if (giveUp === true) {
            return (
                <td id={item[0]}><span style={{color: 'red'}}>{rightAnswer}</span></td>
            );
        } else {
            return (
                <td id={item[0]}>{value}</td>
            );
        }
    }
}

class TableData extends Component{
    render() {
        debugger;
        const wordList = this.props.wordList

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
                    {wordList.map(item => (
                        <tr>
                            <ScrambleCol item={item}/>
                            <AnswerCol item={item} guessText={this.props.guessText} giveUp={this.props.giveUp}/>
                            <td>{item[1]}</td>
                        </tr>
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
        this.handleGiveUpClick = this.handleGiveUpClick.bind(this);
    }

    handleGuessTextChange(e){
        this.props.onGuessTextChange(e.target.value);
    }

    handleGiveUpClick(e){
        this.props.onClickGiveUp(e.target.value);
        e.preventDefault();
        console.log("gave up")
    }

    render() {
        debugger;
        const giveUp = this.props.giveUp
        if (giveUp === false){
            return (
                <form>
                    <p>Enter your guess here :</p>
                    <input id="inputData"
                    type='text'
                    placeholder="Flower Name"
                    value={this.props.guessText}
                    onChange={this.handleGuessTextChange}
                    />        
                    <button onClick={this.handleGiveUpClick}>Give up?</button>
                </form>
            );
        } else {
            return (
                <form>
                    <p>Enter your guess here :</p>
                    <input id="inputData"
                    type='text'
                    placeholder="Flower Name"
                    value={this.props.guessText}
                    onChange={this.handleGuessTextChange}
                    />        
                    <button>Play again!</button> :
                </form>
            );
        }
    }
}

class Scramble extends Component {
    constructor(props){
        super(props);
        this.state = {
            guessText:'',
            giveUp: false
        };
        this.handleGuessTextChange = this.handleGuessTextChange.bind(this);
        this.handleGiveUpClick = this.handleGiveUpClick.bind(this);
    }

    handleGuessTextChange(guessText){
        this.setState({
            guessText : guessText
        });
    }

    handleGiveUpClick() {
        this.setState({
            giveUp: true
        });
    }

    render () {
        debugger;
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
                    wordList={this.props.wordList}
                    onClickGiveUp={this.handleGiveUpClick}
                    giveUp={this.state.giveUp}
                    />
                    <TableData
                    wordList={this.props.wordList}
                    guessText={this.state.guessText}
                    giveUp={this.state.giveUp}
                    />
                </div>
            );
        }
    }        
} 

export default Scramble;