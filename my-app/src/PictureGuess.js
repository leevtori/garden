import React, {Component} from 'react';

function NumGenerator(max, number) {
    const output = []
    {[...Array(number)].map((e, i) => {
        output.push(Math.floor(Math.random() * max))
    })}
    return output
}

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
        const indexes = this.props.index
        const items = this.props.items
        return (
            <div>
                {indexes.map(index => (
                    <div key={items[index][0]}>
                        <img src={process.env.PUBLIC_URL + '/images/' + items[index][1] + '.jpg'} alt={items[index[1]]}/> 
                        <p>{items[index][1]}</p>
                        <NameRow index={index}
                        items={items}
                        answer={this.props.guessText}/>
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
        const answer = this.props.answer

        return (
            <div key={items[this.props.index][1]}>
                <input className="inputData" id={items[index][1]} type='text' value={answer === items[index][1]? answer : '' } readOnly/>                
            </div>
        )
    }
}

class TableData extends Component {

    render() {
        const imageIndexes = this.props.imageIndexes
        return (
            <div>
                <ImageRow index={imageIndexes}
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
            debugger;
            const imageIndexes = NumGenerator(this.props.items.length, 4)
            return (
                <div className="game2">
                    <h1>Name the Flower</h1>
                    <p>Can you identify these flowers?</p>
                    <InputBar 
                    guessText={this.state.guessText}
                    onGuessTextChange={this.handleGuessTextChange}/>
                    <TableData
                    guessText={this.state.guessText}
                    imageIndexes={imageIndexes}
                    items={this.props.items}/>
                </div>
            );
        }

    }
  } 

export default PictureGuessing;