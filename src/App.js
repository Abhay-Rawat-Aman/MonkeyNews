import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class FileName extends Component {
  apiKey="1287999e9d6d4e6a90f7af104a1622d3";
  state={
    progess:0
  }
  setProgress=(progress)=>
  {
    this.setState({progress:progress})
  }
  render() {
    return( 
      <div>
          <Router>
            <LoadingBar
              color='#f11946'
              height={5}
              progress={this.state.progress}
            />
            <Navbar/>
            <Switch>
              <Route exact path='/'><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={3} category="general"/></Route>
              <Route exact path='/business'><News setProgress={this.setProgress} apiKey={this.apiKey} key="business"pageSize={3} category="business"/></Route>
              <Route exact path='/science'><News setProgress={this.setProgress} apiKey={this.apiKey} key="science"pageSize={3} category="science"/></Route>
              <Route exact path='/entertainment'><News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment"pageSize={3} category="entertainment"/></Route>
              <Route exact path='/health'><News setProgress={this.setProgress} apiKey={this.apiKey} key="health"pageSize={3} category="health"/></Route>
              <Route exact path='/sports'><News setProgress={this.setProgress} apiKey={this.apiKey} key="sports"pageSize={3} category="sports"/></Route>
              <Route exact path='/technology'><News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={3} category="technology"/></Route>
            </Switch>
          </Router>
      </div>
    )
  }
}