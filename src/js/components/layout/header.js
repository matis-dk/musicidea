import React from 'react';

import logo from '../../../img/musicidea-logo3-white.svg'

import { Avatar, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'


//==================================================================

class Header extends React.Component {

    state = {
        menuActive: false
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
        const username = this.props.store.user.userId;

        return (
            <div id="header">
                <div>
                    <Link to="/profile" className="header-profile">
                        <Icon className="nav-user" type="user" size="large" />
                        { username ? <span className="text-nav">{username}</span> : null }
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
