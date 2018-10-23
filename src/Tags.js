import React, { Component } from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import * as config from './config';
import Gallery from 'react-grid-gallery';
import { withRouter } from 'react-router-dom';

var api = config.API_SEARCH;
class Tags extends Component {

    loadImages = (tags, api) => {
        var list = [];
        var newTag = tags;
        
        axios.get(api)
            .then(res => {
                newTag.api = res.data.photos.photo;
                this.setTag(newTag);
                console.log(api)
                var images = [];
                var total = this.props.tags.api.length;
                
                if (this.props.tags.hasMore < total) {

                    list = newTag.api.slice(Number(newTag.hasMore), Number(newTag.hasMore + 20));
                    
                    list.map((image, i) => {
                        if (list[i].url_l !== null) {
                            image = {
                                src: list[i].url_l,
                                thumbnail: list[i].url_l,
                                thumbnailWidth: parseInt(list[i].width_s, 10),
                                thumbnailHeight: parseInt(list[i].height_s, 10),
                                caption: list[i].title,
                                
                                info: { owner: list[i].ownername, views: list[i].views },
                            };
                            images.push(image);
                        }
                    });
                }
               
                if (this.props.tags.hasMore < total) {
                    newTag.images = newTag.images.concat(images);
                    newTag.hasMore = newTag.hasMore + 20;
                    this.setTag(newTag);
                    
                }
                else if (this.state.hasMore >= total) {
                    newTag.show = false;
                    this.setTag(newTag);
                    console.log("err");
                    return;
                }
            }).catch(err => {
                console.log(err);
            });
    }
    
    setTag = (tags) => {
        this.props.searchTags(tags);
    }

    componentWillMount() {
        if (this.props.searchTag !== null) {
            
            this.props.history.push(`${this.props.match.url}/${this.props.tags.searchTag}`);
            //var newTag = this.props.tags;
            api = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2424e5e2553925fe2b64d19b4f52ec3b&tags=${this.props.tags.searchTag}&extras=tags%2C+url_s%2C+url_l%2C+owner_name%2C+views&format=json&nojsoncallback=1`
            //api = api.slice(0, api.indexOf("tags") + 5) + this.props.tags.searchTag + api.slice(api.indexOf("&", api.indexOf("tags") + 5) , api.length);
            console.log(api);
           
        }
    }

    componentDidMount() {
        
    }
    render() {
        var {tags} = this.props;

        var items = tags.images.map(image => {
            
            image.customOverlay = (
                <div style={captionStyle}>
                    <div>Title : {image.caption}</div>
                    Owner : {image.info.owner}
                    <br />
                    Views : {image.info.views}
                </div>
            );
            return image;
        });
        return (
            <div className="container" >
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => this.loadImages(tags, api)}
                    hasMore={tags.show}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    <Gallery images={items} enableImageSelection={false} />

                </InfiniteScroll>
            </div>
        );
    }
}

const captionStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    maxHeight: '240px',
    overflow: 'hidden',
    position: 'absolute',
    bottom: '0',
    width: '100%',
    color: 'white',
    padding: '2px',
    fontSize: '90%',
};

export default (withRouter(Tags));