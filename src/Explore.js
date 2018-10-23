import React, { Component } from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import * as config from './config';
import Gallery from 'react-grid-gallery';
class Explore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            api: null,
            images: [],
            hasMore: 0,
            show: true
        };
    }
    loadImages(page) {
        var list = [];
        axios.get(config.API_URL)
            .then(res => {
                this.setState({
                    api: res.data.photos.photo
                });

                var images = [];
                var total = this.state.api.length;
                if (this.state.hasMore < total) {
                    list = this.state.api.slice(Number(this.state.hasMore), Number(this.state.hasMore + 20))

                    list.map((image, i) => {
                        image = {
                            src: list[i].url_l,
                            thumbnail: list[i].url_l,
                            thumbnailWidth: list[i].width_l,
                            thumbnailHeight: list[i].height_l,
                            caption: list[i].title,
                            info: { owner: list[i].ownername, views: list[i].views },
                        };
                        images.push(image);
                    });
                }
                if (this.state.hasMore < total) {
                    this.setState({
                        images: this.state.images.concat(images),
                        hasMore: this.state.hasMore + 20
                    });
                }
                else if (this.state.hasMore >= total) {
                    this.setState({
                        show: false
                    });
                    console.log("err");
                    return;
                }
            }).catch(err => {
                console.log(err);
            });
    }
    render() {
        var items = this.state.images.map(image => {
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
            <div className="container">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadImages.bind(this)}
                    hasMore={this.state.show}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >

                    <Gallery images={items} enableImageSelection={false} />

                </InfiniteScroll>
            </div>
        );
    }
}
//Style
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

export default Explore;
