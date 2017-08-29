import React from 'react'
import {Properties} from './Properties'
import {JSONTree} from './JsonTree'
import {examplify, Code} from './../utils'


// Definition
export const Definition = ({match}) => {
    const openapi = window.openapi
    const definitions = openapi.get('definitions')
    const definitionName = match.params.definition
    const definition = definitions.find((def, name) => {
        return name === definitionName
    })

    return (
        <div className="row">
          <div className="wrap">
            {/*  first block  */}
            <div className="col left ">
                <h1>{definitionName}</h1>
                <p>{definition.get('description')}</p>
                <Properties name={definitionName} definition={definition}/>
            </div>
            <div className="col right">
                <strong className="h-small dark">Example object:</strong>
                <Code>
                    <JSONTree data={examplify(definition)}/>
                </Code>
            </div>
          </div>
        </div>
    )
}
