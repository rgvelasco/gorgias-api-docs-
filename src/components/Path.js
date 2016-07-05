import React from 'react'
import {fromJS} from 'immutable'
import data from '../../data/openapi.json'
import {Properties} from './Properties'
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
        <div className="content-block">
            <div className="content-block-details">
                {/*  description  */}
                <div>
                    <h1>{verb.get('summary')}</h1>
                    <p>{verb.get('description')}</p>
                </div>
                <Parameters parameters={verb.get('parameters')}/>
            </div>
            <div className="content-block-request">
                <h3 className="content-block-request-title">HTTP Request</h3>
                <code className="code">{method.toUpperCase()} {uri}</code>
                {responses.map((response, status) => {
                    return (
                        <div key={status}>
                            <h3 className="content-block-request-title">Example Response (status: {status}) </h3>

                                <Response response={response} />

                        </div>
                    )
                }
                ).toList()}
            </div>
        </div>
    )
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

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
            var jsonData = JSON.stringify(data.definitions[res.get('$ref').replace('#/definitions/', '')].properties, null, 2)
            // console.log(res.get('$ref').replace('#/definitions/', ''))
            // console.log(jsonData)
            props = openapi.getIn(['definitions', res.get('$ref').replace('#/definitions/', ''), 'properties'])

            var obj = {}
            props.map((desc, key) => {
                obj[key] = desc.get('type')
            })

            obj = syntaxHighlight(obj)            
        }
    }

    return (
        <pre dangerouslySetInnerHTML={{__html: obj}}></pre>
    )
}

export const Parameters = ({parameters}) => {
    if (!parameters) {
        return null
    }

    /* map the parameters to the same structure as the definition object,
     * so we can re-use the properties component.
     */
    var def = {
      properties: {}
    }

    parameters.map((paramRef, i) => {
       let param = openapi.getIn(['parameters', paramRef.get('$ref').replace('#/parameters/', '')])

       def.properties[param.get('name')] = param
    })

    def = fromJS(def)

    return (
      <Properties name="Request" definition={def}/>
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
