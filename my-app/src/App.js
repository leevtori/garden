import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
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
    // const {error, items} = this.state;
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
      <div>
        <h6> flower names </h6>
        <ul>
          {/* all
          {this.state.items}
          one
          {this.state.items[0][1]} hi
          {this.state.items[0][2]} */}
          
          {items.map(item => (
            <li key={item[0]}>
              {item[1]}
            </li>
          ))}
        </ul> 

      </div>
    )

    }
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
