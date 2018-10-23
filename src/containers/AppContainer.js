import React, { Component } from 'react';
import App from './../App';
import {actGetSearchKeys} from './../actions/index';
import { connect } from 'react-redux';

class AppContainer extends Component {
    render() {
        var {searchKeys, _handleKeyPress} = this.props;
        return (
            <App searchKeys = {searchKeys} _handleKeyPress = {_handleKeyPress} />
        );
    }
}

const mapStateToProps = state => {
    return {
        searchKeys: state.searchKeys
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        _handleKeyPress: (searchKeys) => {
            dispatch(actGetSearchKeys(searchKeys));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);