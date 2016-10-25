import React from 'react'
import ReactDOM from 'react-dom'
import {Router, hashHistory} from 'react-router'
import {fromJS} from 'immutable'
import axios from 'axios'
import {routes} from './routes'

axios.get(__docUrl)
    .then((json = {}) => json.data)
    .then(resp => {
        window.openapi = fromJS(resp)

        ReactDOM.render(
            <Router
                history={hashHistory}
                children={routes}
            />,
            document.getElementById('root')
        )
    })
