import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {observer, inject} from 'mobx-react';
import { decorate } from 'mobx';
import JSONPretty from 'react-json-pretty';

class App extends Component {

  componentWillMount(){
    this.props.store.getJson();
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <JSONPretty json={this.props.store.jsondata}/>
        </header>
        
      </div>
    );
  }
}

App = inject('store')(observer(App))

export default App;
