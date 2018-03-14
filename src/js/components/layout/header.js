import React from 'react';

import logo from '../../../img/Musicidea-logo-min.svg'
//import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { DatePicker } from 'antd';


class Header extends React.Component {

    render() {
        return (
            <div id="header">
                <div>Profile
                    <a  href=""></a>
                </div>
                <nav>Navigation
                    <img src={logo} alt=""/>
                </nav>
                <div><DatePicker /></div>
            </div>
        )
    }
}

export default Header;
