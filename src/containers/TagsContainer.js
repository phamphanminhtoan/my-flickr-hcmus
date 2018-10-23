import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tags from './../Tags';
import {actSearchTags} from './../actions/index';

class TagsContainer extends Component {
    render() {
        var {tags, searchTags} = this.props;
        return (
            <Tags tags = {tags} searchTags = {searchTags} match={this.props.match} history={this.props.history}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        tags: state.tags
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        searchTags: (tags) => {
            dispatch(actSearchTags(tags));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsContainer);