//==================================================================
// IMPORT DEPENDENCIES

    // REACT
    import React from 'react';
    import ReactDOM from 'react-dom';

        // REACT ROUTER
        import { BrowserRouter, Route } from 'react-router-dom';

        // REACT HOT
        import { hot } from 'react-hot-loader'

    // REDUX
    import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
    import { Provider } from 'react-redux';

        // REDUX MIDDLEWARE
        import { createLogger } from 'redux-logger';
        import ReduxThunk from 'redux-thunk'


// IMPORT MODULES

    // APPLIKATION
    import App from './js/app'

    // SCSS STYLES
    import './style/style.scss';

    // REDUCERS
    import reducer_spotifyOAuth from './js/store/reducers/reducer_spotifyOAuth';
    import reducer_user from './js/store/reducers/reducer_user';
    import reducer_content from './js/store/reducers/reducer_content';
    import reducer_playback from './js/store/reducers/reducer_playback';
    import reducer_explore from './js/store/reducers/reducer_explore';


//==================================================================
// REDUX STORE

    const reducers = combineReducers({
            spotify: reducer_spotifyOAuth,
            user: reducer_user,
            content: reducer_content,
            playback: reducer_playback,
            explore: reducer_explore
    });

    const middleware = applyMiddleware(createLogger(), ReduxThunk);

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore( reducers, composeEnhancers(middleware) );

    window.store = store;
//==================================================================
// REACT RENDER

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);


//==================================================================
// HMR

if (module.hot) { module.hot.accept() }
