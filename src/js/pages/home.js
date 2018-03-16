import React from 'react';
import { withRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';

import bc from '../../img/background.jpg'

import * as actionUsers from '../store/actions/action_user'

class Home extends React.Component {

    componentDidMount() {
        this.props.getDataInit(this.props.store.spotify.init)
    }

    render () {

        return (
            <div id="home">
                <div className="home-hero">
                    <img src={bc} alt="" id="home-hero-img"/>
                    <div className="home-des">
                        <div className="home-h1-wrapper">
                            <h1 className="text-h1">MusicIdea</h1>
                        </div>
                    </div>
                </div>
                <section className="home-section">
                    News1
                </section>
                <section className="home-section">
                    News1
                </section>
                <section className="home-section">
                    News1
                </section>
            </div>
        )
    }
}


export default connect(store => {return {store: store }},  { ...actionUsers }) (withRouter(Home))
