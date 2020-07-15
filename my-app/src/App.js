import React, {Component} from 'react';
import './App.css';
import {NavLink, Switch, Route} from 'react-router-dom';

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
        debugger;
        this.setState({
          items : JSON.parse(body)
        });
        console.log(JSON.parse(body));
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
      <Route path="/game1" exact><Scramble/></Route>
      <Route path="/game2" exact><PictureGuessing/></Route>
    </Switch>
    </div>
    );  
  }
  }

// const Main = () => (

// );

class Home extends Component { 
  constructor(props){
    super(props);
  }

  render () {
    const error = this.props.error;
    const items = this.props.items;

    if (error){
      return <div>Error: {error.message} </div>
    } if ( items.length === 0) {
      return <div></div>
    }
    else {
    return (
      <div className='home'>
        <h1>Welcome to the Garden!</h1>
        <p>Browse around, learn about some flowers and test your knowledge!</p>
        {items.map(item => (
          <div id={item[0]}>
            <img src={process.env.PUBLIC_URL + '/images/' + item[1] + '.jpg'} alt={item[1]}/>
            <h3 key={item[0]}>{item[1]}</h3>
          </div>
        ))}
      </div>
    );
  }}    
} 

class Scramble extends Component {
  render () {
    return (
      <div className='game1'>
        <h1>Word Scramble Game</h1>
        <p> stuff blah blah</p>
      </div>
    );
  }
} 



class PictureGuessing extends Component {
  render () {
    return (
      <div className="game2">
        <h1>Name the Flower</h1>
        <p>Blahblahblah</p>
      </div>
    );
  }
} 


export default App;
