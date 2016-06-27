import React from 'react'
import {fromJS} from 'immutable'
import data from '../../data/openapi.json'
const openapi = fromJS(data)

const Verb = ({verb, method, uri}) => (
    <div className="Grid">
        <div className="Grid-left">
            <div className="Grid-inside">
                {/*  description  */}
                <div>
                    <h1>{verb.get('summary')}</h1>
                    <p>{verb.get('description')}</p>
                </div>
                <Parameters parameters={verb.get('parameters')}/>
            </div>
        </div>
        <div className="Grid-right">
            <div className="Grid-inside">
                <h3 className="text-right">HTTP Request</h3>
                <code className="code">{method.toUpperCase()} {uri}</code>

                <h3 className="text-right">Example Response (status: {status}) </h3>
                <code className="code"></code>
            </div>
        </div>
    </div>
)

export const Parameters = ({parameters}) => {
    if (!parameters) {
        return null
    }

    return (
        <table className="tableCard">
            <caption>Parameters</caption>
            <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {parameters.map((paramRef, i) => (
                <Parameter key={i} paramRef={paramRef}/>
            )).toList()}
            </tbody>
        </table>
    )
}

export const Parameter = ({paramRef}) => {
    if (!paramRef.get('$ref')) {
        console.error('Invalid parameter reference', paramRef)
        return null
    }
    const param = openapi.getIn(['parameters', paramRef.get('$ref').replace('#/parameters/', '')])

    return (
        <tr>
            <td>{param.get('name')}</td>
            <td>{param.get('description')}</td>
            <td>{param.get('type')}</td>
        </tr >
    )
}

export const Path = ({uri, verbs}) => {
    const parts = uri.split('/')
    const anchor = parts.slice(1, parts.length - 1).join('-')
    return (
        <div className="paths" id={anchor}>
            <h2><a href={`#${anchor}`}>{uri}</a></h2>
            {verbs.map((verb, method) => (
                <Verb key={method} verb={verb} method={method} uri={uri}/>
            )).toList()}
        </div>
    )
}
