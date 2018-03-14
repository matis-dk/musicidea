import React from 'react';

class Signin extends React.Component {

    render () {
        return (
            <div className="signin-wrapper">
                <div className="signin-box">
                    <div className="signin-img-wrapper"></div>
                    <div className="signin-form">
                        <h1>Sign-in </h1>
                        <div className="signin-spotify">
                            <a className="signin-spotify-button" href={this.props.loginUri}>Sign into spotify</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin
