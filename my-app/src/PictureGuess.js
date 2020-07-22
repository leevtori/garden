import React, {Component} from 'react';
import './Game2.css'

class InputBar extends Component {
    constructor(props) {
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
        guessText: ''
      };

      this.handleGuessTextChange = this.handleGuessTextChange.bind(this);
    }

    handleGuessTextChange(guessText){
        this.setState({
            guessText: guessText
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
                    onGuessTextChange={this.handleGuessTextChange}/>
                    <TableData
                    guessText={this.state.guessText}
                    indexes={this.props.indexes}
                    items={this.props.items}/>
                </div>
            );
        }
    }
  } 

export default PictureGuessing;