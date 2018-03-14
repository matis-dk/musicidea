import React from 'react';
import { withRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';

class Home extends React.Component {

    render () {

        return (
            <div>
                <nav>
                    <Link className="signin-spotify-button" to="/">Home</Link>
                    <Link className="signin-spotify-button" to="/profile">Profile</Link>
                </nav>
                <div>
                    HOME
                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }}) (withRouter(Home))
