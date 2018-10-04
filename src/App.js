import React, { Component } from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import * as config from './config';
import { Motion, spring } from 'react-motion';
import Gallery from 'react-grid-gallery';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api: null,
            images: [],
            hasMore: 0,
            show: true
        };
        this.handleHover = this.handleHover.bind(this);
        this.getSpringProps = this.getSpringProps.bind(this);
    }

    handleHover(active, index) {
        var { images } = this.state;
        var obj = images[index];
        obj.isHover = active;
        images[index] = obj;
        this.setState({
            images: images
        });
    }
    getSpringProps(isHover) {
        return {
            defaultStyle: {
                scale: 1.15,
                marginTop: 25,
                imageOpacity: 0.7,
                opacity: 0,
            },
            style: {
                scale: spring(isHover ? 1 : 1.15),
                marginTop: spring(isHover ? 22 : 25),
                imageOpacity: spring(isHover ? 0.4 : 0.7),
                opacity: spring(isHover ? 1 : 0)
            },
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
                    list = this.state.api.slice(Number(this.state.hasMore), Number(this.state.hasMore + 10))

                    list.map((image, i) => {
                        image = {
                            src: list[i].url_l,
                            thumbnail: list[i].url_s,
                            thumbnailWidth: list[i].width_s,
                            thumbnailHeight: list[i].height_s,
                            caption: list[i].title,
                            info: { owner: list[i].ownername, views: list[i].views },
                        };
                        return images.push(image);

                    });
                }
                if (this.state.hasMore < total) {

                    this.setState({
                        images: this.state.images.concat(images),
                        hasMore: this.state.hasMore + 10
                    });
                }
                else if (this.state.hasMore >= total) {
                    this.setState({
                        show: false
                    });
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
            console.log(image);
            return image;
        });
        return (
            <div>
                <div className="container">


                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadImages.bind(this)}
                        hasMore={this.state.show}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        <div
                            style={{
                                display: 'block',
                                minHeight: '1px',
                                width: '100%',
                                border: '1px solid #ddd',
                            }}
                        >
                            <Gallery images={items} enableImageSelection={false} />
                        </div>
                    </InfiniteScroll>
                </div>
            </div >
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

const customTagStyle = {
    wordWrap: 'break-word',
    display: 'inline-block',
    backgroundColor: 'white',
    height: 'auto',
    fontSize: '75%',
    fontWeight: '600',
    lineHeight: '1',
    padding: '.2em .6em .3em',
    borderRadius: '.25em',
    color: 'black',
    verticalAlign: 'baseline',
    margin: '2px',
};

export default App;
