import React from 'react';

import logo from '../../../img/Musicidea-logo-min.svg'

import { Button } from 'antd'
import { Link, withRouter } from 'react-router-dom'

//==================================================================

class Header extends React.Component {

    state = {
        menuActive: true,
        menuPage: true
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
        return (
            <div id="header">
                <div>
                    <Button type="primary" shape="circle" icon="user" size="large" />
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
                <div>Player</div>
            </div>
        )
    }
}

export default withRouter(Header);
