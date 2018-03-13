import React from 'react';
import { Switch, withRouter, Route } from 'react-router'
import { connect } from 'react-redux';

class Home extends React.Component {
    componentWillMount () {
        this.props.history.replace('/')
    }

    render () {
        console.log(this.props)

        return (
            <div>
                <Switch>
                    <Route path='/' render={() => (<h2>Allo</h2>)}/>
                    <Route path='/about' component={<h2>Hello</h2>}/>
                </Switch>
            </div>
        )
    }
}


export default connect() (withRouter(Home))
