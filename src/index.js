//==================================================================
// IMPORT DEPENDENCIES

    // REACT
    import React from 'react';
    import ReactDOM from 'react-dom';

    // REDUX
    import { createStore, combineReducers, applyMiddleware } from 'redux';
    import { Provider } from 'react-redux';

        // REDUX MIDDLEWARE
        import { createLogger } from 'redux-logger';



// IMPORT MODULES

    // MODULES
    import App from './js/app'

    // SCSS STYLES
    import './style/style.scss';

    // REDUCERS
    import reducer_notes from './js/reducers/reducer_notes';
    import reducer_profile from './js/reducers/reducer_profile';


//==================================================================

    // STORE
    const store = createStore(
        combineReducers({
            notes: reducer_notes,
            profile: reducer_profile
        }),
        applyMiddleware(
            createLogger()
        )
    )

//==================================================================
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);


//==================================================================

// ============== HMR ============== \\
if (module.hot) { module.hot.accept() }
