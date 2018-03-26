import React from 'react';
import { withRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';

import bc from '../../img/background.jpg'

import * as actionUsers from '../store/actions/action_user'

class Home extends React.Component {

    componentDidMount() {
        const store = this.props.store;
        if ( store.spotify.loginAllowed &&  (store.user.userId == "")) {
            this.props.getDataInit(store.spotify.init)
        }


    }

    render () {

        return (
            <div id="home">
                <div className="home-hero">
                    <img src={bc} alt="" className="home-hero-img"/>
                    <div className="home-des">
                        <div className="home-h1-wrapper">
                            <h1 className="h1-hero" id="h1-hero1">Music</h1>
                            <h1 className="h1-hero" id="h1-hero2">I</h1>
                            <h1 className="h1-hero" id="h1-hero3">dea</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }},  { ...actionUsers }) (withRouter(Home))
