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
    // constructor(props){
    //     super(props);
    //     this.handleAddItem = this.handleAddItem.bind(this);
    // }
    // handleAddItem(){
    //     console.log("adding item in table data")
    // }

    render(){
        debugger;
        const item = this.props.item
        const guessText = this.props.guessText.toLowerCase()
        const rightAnswer = item[1]
        const giveUp = this.props.giveUp
        const onAddItem = this.props.onAddItem

        const value = (rightAnswer.toLowerCase() === guessText)?
            <span style={{color: 'green'}}>{guessText}</span> : 
            <span style={{display: 'none'}}>{guessText}</span>;
        
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
    // constructor(props){
    //     super(props);
    //     this.handleAddItem = this.handleAddItem.bind(this);
    // }
    // handleAddItem(){
    //     console.log("adding item in table data")
    // }

    render() {
        debugger;
        const wordList = this.props.wordList
        // const onAddItem = this.props.onAddItem
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
                        <tr key={item[0]}>
                            <ScrambleCol item={item}/>
                            <AnswerCol item={item} guessText={this.props.guessText} giveUp={this.props.giveUp} inputList={this.props.inputList} onAddItem={this.props.onAddItem}/>
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
        this.handleGuessTextChange = this.handleGuessTextChange.bind(this);
        this.handleGiveUpClick = this.handleGiveUpClick.bind(this);
    }

    handleGuessTextChange(e){
        this.props.onGuessTextChange(e.target.value);
        e.preventDefault();
    }

    handleGiveUpClick(e){
        this.props.onClickGiveUp(e.target.value);
        e.preventDefault();
        console.log("gave up")
    }

    handlePlay(e){
        e.preventDefault();
    }

    submitForm(e) {
        e.preventDefault();
    };

    render() {
        debugger;
        const giveUp = this.props.giveUp

        if (giveUp === false){
            return (
                <form onSubmit={this.submitForm}>
                    <p>Enter your guess here :</p>
                    <input id="inputData"
                    type='text'
                    placeholder="Flower Name"
                    value={this.props.guessText}
                    onChange={this.handleGuessTextChange}
                    onKeyPress={e =>{
                        if (e.key === 'Enter') e.preventDefault();}}
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
                    onKeyPress={e =>{
                        if (e.key === 'Enter') e.preventDefault();}}
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
            giveUp: false,
            currentCell: 0
        };
        this.handleGuessTextChange = this.handleGuessTextChange.bind(this);
        this.handleGiveUpClick = this.handleGiveUpClick.bind(this);
        this.handleAddItem = this.onAddItem.bind(this);
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
    debugger;
    onAddItem = (item) => {
        this.setState(state => {
            console.log("adding item")
            const list = state.inputAnswers.concat(item);
            return {
                list
            };
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
                    inputList={this.state.inputAnswers}
                    onAddItem={this.handleAddItem}
                    />
                </div>
            );
        }
    }        
} 

export default Scramble;