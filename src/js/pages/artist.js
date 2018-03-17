import React from 'react';
import { connect } from 'react-redux'

class Artist extends React.Component {


    render () {
        return (
            <div className="container">
                <div className="container-item" id="playlist">
                    <h1>Artist page!</h1>
                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }}) (Artist)
