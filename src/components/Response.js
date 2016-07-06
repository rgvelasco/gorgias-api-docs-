import React from 'react'
import {fromJS} from 'immutable'
import data from '../../data/openapi.json'
const openapi = fromJS(data)

export const Response = ({response}) => {
    var props = null
    var res

    if (response.get('schema')) {
        res = response.get('schema')
    } else if (response.get('description')) {
        res = response.get('description')
    }

    if (typeof res === 'object') {    
        if (res.get('$ref')) {
            props = openapi.getIn(['definitions', res.get('$ref').replace('#/definitions/', ''), 'properties'])
        }
    }

    return (
        <div>
            {props ? <ResponseTable properties={props} /> : <ResponseMessage message={res} />}
        </div>
    )
}

export const ResponseTable = ({properties}) => {
    
    return (
        <table>
            <tbody>
                {properties.valueSeq().map((a, b) => (
                    <ResponseTableRow a={a} b={b} key={b}  />
                )).toArray()}
                
            </tbody>
        </table>
    )
}

export const ResponseTableRow = ({a,b}) => {
    return (
        <tr>
            <td>{b}</td>
            <td>{a.get('type')}</td>
        </tr>
    )
}

export const ResponseMessage = ({message}) => {
    return (
        <code className="code">{message}</code>
    )
}