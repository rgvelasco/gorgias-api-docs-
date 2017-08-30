import React from 'react'
import ReactDOM from 'react-dom'
import {fromJS} from 'immutable'
import axios from 'axios'

import {App} from './components/App'

axios.get(process.env.REACT_APP_OPENAPI_URL)
    .then((json = {}) => json.data)
    .then(resp => {
        window.openapi = fromJS(resp)
        ReactDOM.render(<App/>, document.getElementById('root'))
    })
