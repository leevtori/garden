import React, {Component} from 'react';
import './Game2.css'

class InputBar extends Component {
    constructor(props) {
        super(props);
        this.handleGuessTextChange = this.handleGuessTextChange.bind(this)
        this.handleGiveUpClick = this.handleGiveUpClick.bind(this)
    }
    handleGuessTextChange(e){
        this.props.onGuessTextChange(e.target.value);
    }

    handleGiveUpClick(e){
        this.props.onClickGiveUp(e.target.value)
        e.preventDefault();
        console.log("gave up")
    }

    render() {
        const giveUp = this.props.giveUp
        if (giveUp === false) {
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
        }
        return (
            <form>
                <p>Enter your guess here :</p>
                <input id="inputData"
                type='text'
                placeholder="Flower Name"
                value={this.props.guessText}
                onChange={this.handleGuessTextChange}
                />
                <button>Play again!</button>
            </form>
        );
    }
}
class ImageRow extends Component{
    render() {
        const indexes = this.props.indexes
        const items = this.props.items
        return (
            <div className="row">
            {indexes.map(index => (
                <div className="column" key={items[index][0]}>
                    <div id={items[index][0]}>
                        <img src={process.env.PUBLIC_URL + '/images/' + items[index][1] + '.jpg'} alt={items[index[1]]}/> 
                        <p>{items[index][1]}</p>
                        
                        <NameRow index={index}
                        items={items}
                        answer={this.props.answer}/>
                    </div>
                </div>
            ))}
            </div>
        )
    }
}

class NameRow extends Component {
    render () {
        const index = this.props.index
        const items = this.props.items
        const answer = this.props.answer.toLowerCase()
        const rightAnswer = items[index][1].toLowerCase()
        const value = (answer === rightAnswer)? rightAnswer : ''
        const disabled = (value === '')? false : true

        return (
            <input className="inputData" id={items[index][1]} type='text' value={value} disabled={disabled} readOnly/>                
        )
    }
}

class TableData extends Component {

    render() {
        return (
            <div className="table">
                <ImageRow indexes={this.props.indexes}
                answer={this.props.guessText}
                items={this.props.items}/>
            </div>
        );     
    }
}

class PictureGuessing extends Component {
    constructor(props){
      super(props);
      this.state = {
        guessText: '',
        giveUp: false
      };
      this.handleGiveUpClick = this.handleGiveUpClick.bind(this);
      this.handleGuessTextChange = this.handleGuessTextChange.bind(this);
    }

    handleGuessTextChange(guessText){
        this.setState({
            guessText: guessText
        });
    }

    handleGiveUpClick(){
        this.setState({
            giveUp: true
        });
    }
  
    render () {
        if (this.props.items.length === 0){
            return <div></div>
        } else {
            return (
                <div className="game2">
                    <h1>Name the Flower</h1>
                    <p>Can you identify these flowers?</p>
                    <InputBar 
                    guessText={this.state.guessText}
                    onGuessTextChange={this.handleGuessTextChange}
                    giveUp={this.state.giveUp}
                    onClickGiveUp={this.handleGiveUpClick}/>
                    <TableData
                    guessText={this.state.guessText}
                    indexes={this.props.indexes}
                    items={this.props.items}
                    giveUp={this.state.giveUp}/>
                </div>
            );
        }
    }
  } 

export default PictureGuessing;