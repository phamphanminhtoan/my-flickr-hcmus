import React, { Component } from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import * as config from './config';
import { Motion, spring } from 'react-motion'


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

                        image = `https://farm${list[i].farm}.staticflickr.com/${list[i].server}/${list[i].id}_${list[i].secret}_m.jpg`;
                        return images.push({ url: image, isHover: false, title: list[i].title, ownername: list[i].ownername, views: list[i].views });

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
        var items = [];
        this.state.images.map((image, index) => {
            return items.push(
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" key={index}>
                    <div className="thumbnail">
                        <Motion {...this.getSpringProps(image.isHover)}>
                            {tweenCollection => {
                                let styleImage = {
                                    transform: 'scale(' + tweenCollection.scale + ')',
                                    opacity: tweenCollection.imageOpacity,
                                };
                                let styleTitle = {
                                    marginTop: tweenCollection.marginTop + '%',
                                };
                                let styleSubtitle = {
                                    opacity: tweenCollection.opacity,
                                };
                                return (
                                    <div className='subcontainer'>
                                        <div
                                            className='containerImage'
                                            onMouseOver={this.handleHover.bind(null, true, index)}
                                            onMouseOut={this.handleHover.bind(null, false, index)}>
                                            <img
                                                style={styleImage}
                                                src={image.url}
                                                // className='img'
                                                 />
                                            <div className='overlay'>
                                                <div className='subtitle' style={styleSubtitle}>
                                                    <div className='subtitleText'>{image.title}</div>
                                                    <div className='subtitleOwner'>by {image.ownername}</div>
                                                    <div className='subtitleOwner glyphicon glyphicon-eye-open'>&nbsp;{image.views}</div>
                                                    
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                );
                            }}
                        </Motion>
                        {/* <img src={image.url} alt="" /> */}
                    </div>
                </div>
            );
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
                        <div className="tracks col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            {items}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default App;
