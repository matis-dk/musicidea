import React from 'react';
import { connect } from 'react-redux';

import { Icon } from 'antd'


import mpilettiIcon from '../../img/mpiletti.svg'

class Profile extends React.Component {

    render () {

        return (
            <div className="container">
                <div className="container-item" id="contact">
                    <div className="container-about">
                        <div className="about-musicidea">
                            <h2 className="profile-header">Contact</h2>
                            <hr/>
                            <h3>Oplysninger</h3>
                            <p>Jeg kan kontaktes på min personlige side</p>
                            <br/>
                            <a className="about-links" href="https://www.mpiletti.com" target="_blank">
                                <img className="icons" src={mpilettiIcon} alt=""/>
                                <span>Mpiletti</span>
                            </a>
                            <br/><br/>
                            <h3>Source code</h3>
                            <p>Koden er frit tilgængelig på GitHub under min profil "matis-dk"</p>
                            <br/>
                            <a className="about-links" href="https://github.com/matis-dk/musicidea" target="_blank">
                                <Icon className="icons" type="github" />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }} ) (Profile)
