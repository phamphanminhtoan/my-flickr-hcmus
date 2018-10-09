import React, { Component } from 'react';
import './App.css';

import Explore from './Explore';
import Tags from './Tags';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {

    constructor(props){
        super(props);
        this.state ={
            search : ""
        }
    }
    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            this.setState({
                search: e.target.value
            })
            
        }
    }

   
    render() {
        
        
        return (
            <div>
                <Router>
                    <div>
                        <nav className="navbar navbar-inverse">
                            <Link to='/' className="navbar-brand">My Flickr</Link>
                            <ul className="nav navbar-nav">
                                <li className="active">
                                    <Link to="/">Explore</Link>
                                </li>
                                <li>
                                    <Link to="/tags">Tags</Link>
                                </li>
                               
                            </ul>



                            
                            <form className="navbar-form navbar-left" role="search">
                                <div className="form-group">
                                    <input name="name"  type="text" className="form-control" placeholder="Search" onKeyPress={this._handleKeyPress} />
                                </div>
                                
                            </form>
                           
                        </nav>
                        <div>
                            <Route exact path="/" component={Explore} />
                            <Route path="/tags" component={(match) => <Tags match = {match} search = {this.state.search}/>} />
                            <Route path={`/tags/${this.state.search}`} component={(match) => <Tags match = {match} search = {this.state.search}/>} />
                        </div>
                    </div>

                </Router>
            </div>
        );
    }
}


export default App;
