import React, {Component} from 'react';
import './App.css';
import {NavLink, Switch, Route} from 'react-router-dom';
import PictureGuessing from './PictureGuess'
import Scramble from './Scramble'

function NumGenerator(max, number) {
  const output = []
  {[...Array(number)].map((e, i) => {
      output.push(Math.floor(Math.random() * max))
  })}
  return output
}

//https://jsfiddle.net/8r2mv6pw/
function MixString(a){
  a=a.split("");
  for(var b=a.length-1;0<b;b--){
      var c=Math.floor(Math.random()*(b+1));
      var d=a[b];
      a[b]=a[c];
      a[c]=d
  }return a.join("")
}

function scrambledList(items) {
  if (items.length === 0){
    return <div></div>
  } 
  const output = []
  const indexes = NumGenerator(201, 10)
  {indexes.map(index => (
    output.push([index,items[index][1], MixString(items[index][1])])
  ))}
  return output
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error : null,
      items: [] };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
      
    fetch('/api/flower')
      .then(res => res.text())
      .then((body) => {
        this.setState({
          items : JSON.parse(body)
        });
        // console.log(JSON.parse(body));
      },
      (error) => {
        this.setState({
          error
        });
      }
      )
      .catch(error => console.log("parsing failed", error))
  }

  render() {
    const imageIndexes = NumGenerator(201, 4)
    const scrambledWords = scrambledList(this.state.items)
    console.log(scrambledWords)
    return (
    <div>
    <nav>
      <ul>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/game1'>Word Scramble Game</NavLink></li>
        <li><NavLink to='/game2'>Name the Flower Game</NavLink></li>
      </ul>
    </nav>

    <Switch>
      {/* <Route path="/" exact render={(props) => (
        <Home {...props} isAuthed={true}/>
      )}
      /> */}
      <Route path="/" exact><Home items={this.state.items}/></Route>
      <Route path="/game1" exact><Scramble wordList={scrambledWords}/></Route>
      <Route path="/game2" exact><PictureGuessing items={this.state.items} indexes={imageIndexes}/></Route>
    </Switch>
    </div>
    );  
  }
  }

class Home extends Component { 

  render () {
    const error = this.props.error;
    const items = this.props.items;

    if (error){
      return <div>Error: {error.message} </div>
    } if ( items.length === undefined) {
      return <div></div>
    }
    else {
    return (
      <div className='home'>
        <h1>Welcome to the Garden!</h1>
        <p>Browse around, learn about some flowers and test your knowledge!</p>
        {/* {items.map(item => (
          <div id={item[0]}>
            <img src={process.env.PUBLIC_URL + '/images/' + item[1] + '.jpg'} alt={item[1]}/>
            <h3 key={item[0]}>{item[1]}</h3>
          </div>
        ))} */}
      </div>
    );
  }}    
} 

export default App;
