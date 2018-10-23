import React, { Component } from 'react';
import './App.css';
import Explore from './Explore';
import TagsContainer from './containers/TagsContainer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const NavLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
            var active = match ? 'active' : '';
            return (
                <li className={active}>
                    <Link to={to}>{label}</Link>
                </li>
            )
        }}
        />
    )
}

class App extends Component {
    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.setState({
                search: e.target.value
            })
            var {searchKeys} = this.props;
            searchKeys.search = e.target.value;
            this.props._handleKeyPress(searchKeys);
        }
    }
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <nav className="navbar navbar-inverse">
                            <ul className="nav navbar-nav">
                                <NavLink label='Explore' to='/' activeOnlyWhenExact={true} />
                                <NavLink label='Tags' to='/tags' activeOnlyWhenExact={false} />
                            </ul>
                            <form className="navbar-form navbar-left" role="search">
                                <div className="form-group">
                                    <input 
                                        name="name" 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Search" 
                                        onKeyPress={this._handleKeyPress} />
                                </div>
                            </form>
                        </nav>
                        <div>
                            <Route exact path="/" component={Explore} />
                            <Route path="/tags" component={({ match, history }) => <TagsContainer match={match} history={history}/>} />
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;