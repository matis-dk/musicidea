import React from 'react';
import { withRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { Carousel } from 'antd';

class Home extends React.Component {

    render () {

        return (
            <div id="home">
                <div id="home-hero">
                    <Carousel >
                      <div className="home-hero-slider" id="hero-slide1"></div>
                      <div className="home-hero-slider" id="hero-slide2"></div>
                      <div className="home-hero-slider" id="hero-slide3"></div>
                      <div className="home-hero-slider" id="hero-slide4"></div>
                    </Carousel>
                </div>
                <div>
                    HOME
                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }}) (withRouter(Home))
