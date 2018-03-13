import React from 'react';

class Signin extends React.Component {

    render () {
        console.log(this.props)
        return (
            <div className="root-wrapper">
                <h1> APP </h1>
                <a href={this.props.loginUri}>Sign into spotify</a>
            </div>
        )
    }
}

export default Signin
