import React from 'react'
import {fromJS} from 'immutable'
import data from '../../data/openapi.json'
const openapi = fromJS(data)

const Verb = ({verb, method, uri}) => {
    var responses = verb.get('responses')

    // responses.map((response, statusCode) => {
        
        
    //     if (response.get('schema')) {
    //         console.log(response.get('schema').get('$ref'))
    //     } else {
    //         console.log(response.get('description'))
    //     }
        
    // })

    return (
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
                    {responses.map((response, status) => {
                        return (
                            <div key={status}>
                                <h3 className="text-right" >Example Response (status: {status}) </h3>
                                
                                    <Response response={response} />

                            </div>
                        )
                    }
                    ).toList()}
                    
                    
                </div>
            </div>
        </div>
    )
}

export const Response = ({response}) => {
    var props = null
    let res

    if (response.get('schema')) {
        res = response.get('schema')
    } else if (response.get('description')) {
        res = response.get('description')
    }

    if (typeof res === 'object') {    
        if (res.get('$ref')) {
            var jsonData = JSON.stringify(data.definitions[res.get('$ref').replace('#/definitions/', '')].properties, null, 2)
            // console.log(res.get('$ref').replace('#/definitions/', ''))
            // console.log(jsonData)
            props = openapi.getIn(['definitions', res.get('$ref').replace('#/definitions/', ''), 'properties'])

            var obj = {}
            props.map((desc, key) => {
                obj[key] = desc.get('type')
            })
            
        }
    }

    return (
        <div></div>
    )
}

export const Parameters = ({parameters}) => {
    if (!parameters) {
        return null
    }

    return (
        <table className="ui very basic collapsing celled table">
            
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
            <td>{param.get('type')}</td>
            <td>{param.get('description')}</td>
        </tr >
    )
}

export const Path = ({uri, verbs}) => {
    const parts = uri.split('/')
    const anchor = parts.slice(1, parts.length - 1).join('-')
    return (
        <div className="paths" id={anchor}>
            {verbs.map((verb, method) => (
                <Verb key={method} verb={verb} method={method} uri={uri}/>
            )).toList()}
        </div>
    )
}
