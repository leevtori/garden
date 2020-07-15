import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import {NavLink, Switch, Route} from 'react-router-dom';
// import parse from '@mysql/xdevapi/lib/DevAPI/Util/URIParser';
// import { response } from 'express';

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

    const error = this.state.error;
    const items = this.state.items;
    if (error){
      return <div>Error: {error.message} </div>
    } if (items.length === 0) {
      return (
        <div>
        <h6> flower names </h6>
        <ul>
        </ul>
  
      </div>
      )
    }
    else {
    return (
      <div className='app'>
      <Navigation/>
      <Main/>
      
      <div>
        <h6> flower names </h6>
          {items.map(item => (
            <div id={item[0]}>
              <img src={process.env.PUBLIC_URL + '/images/' + item[1] + '.jpg'} alt={item[1]}/>
              <h3 key={item[0]}>{item[1]}</h3>
            </div>
          ))}
      </div>
      </div>
    )
    }
  }
}
class Navigation extends Component {
  render () {
    return (
  <nav>
    <ul>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/game1'>Word Scramble Game</NavLink></li>
      <li><NavLink to='/gam2'>Name the Flower Game</NavLink></li>
    </ul>
  </nav>
);
    }
  }

const Main = () => (
  <Switch>
    <Route path="/" component={Home}></Route>
    <Route path="/game1" component={Scramble}></Route>
    <Route path="/game2" component={PictureGuessing}></Route>
  </Switch>
);

const Home = () => (
  <div className="home">
    <h1>Welcome to the Garden!</h1>
    <p>Browse around, learn about some flowers and test your knowledge!</p>
  </div>
);

const Scramble = () => (
  <div className='game1'>
    <h1>Word Scramble Game</h1>
    <p> stuff blah blah</p>
  </div>
);

const PictureGuessing = () => (
  <div className="game2">
    <h1>Name the Flower</h1>
    <p>Blahblahblah</p>
  </div>
);
export default App;
