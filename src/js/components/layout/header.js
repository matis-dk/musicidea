import React from 'react';

import logo from '../../../img/musicidea-logo3-white.svg'

import { Avatar } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import Immutable from 'immutable';


//==================================================================

class Header extends React.Component {

    state = {
        menuActive: false,
        menuPage: true
    }

    componentDidMount () {

        setTimeout(function() {
            this.setState({
                menuActive: true
            })
        }.bind(this), 350)
    }

    toggleMenu () {
        const newState = {
            ...this.state
        }
        this.setState({
            menuActive: !newState.menuActive
        })
    }

    render() {
        const userProfileImg = this.props.store.user.userImages[0];

        return (
            <div id="header">
                <div className="header-profile">
                    <Link to="/profile">
                        <Avatar className="nav-user" shape="circle" icon={userProfileImg ? false : 'user'} src={userProfileImg ? userProfileImg.url : false} size="large" />
                    </Link>
                </div>
                <nav>
                    <ul className="nav-menu" data-active={this.state.menuActive} data-current="Home">
                        <li className="nav-menu-li">
                            <Link to="/" className="nav-menu-a text-nav" href="">Home</Link>
                        </li>
                        <li className="nav-menu-li">
                            <Link to="/explore" className="nav-menu-a text-nav" href="">Explore</Link>
                        </li>
                        <li className="nav-menu-li">
                            <Link to="/template" className="nav-menu-a text-nav" href="">Template</Link>
                        </li>
                        <li className="nav-menu-li" id="nav-menu-button" onClick={() => this.toggleMenu()}>
                            <img className="nav-menu-logo" src={logo} alt=""/>
                        </li>
                        <li className="nav-menu-li">
                            <Link to="/about" className="nav-menu-a text-nav" href="">About</Link>
                        </li>
                        <li className="nav-menu-li">
                            <Link to="/contact" className="nav-menu-a text-nav" href="">Contact</Link>
                        </li>
                    </ul>
                </nav>
                <div></div>
            </div>
        )
    }
}

export default withRouter(Header);
