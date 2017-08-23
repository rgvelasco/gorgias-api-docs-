import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import {fromJS} from 'immutable'
import axios from 'axios'
import {router} from './routes'

axios.get(process.env.REACT_APP_OPENAPI_URL)
    .then((json = {}) => json.data)
    .then(resp => {
        window.openapi = fromJS(resp)
        ReactDOM.render(router, document.getElementById('root'))
    })
registerServiceWorker()
