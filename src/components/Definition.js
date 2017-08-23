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
        <div className="Grid">
            {/*  first block  */}
            <div className="Grid-left ">
                <div className="Grid-inside">
                    <h1>{definitionName}</h1>
                    <p>{definition.get('description')}</p>
                    <Properties name={definitionName} definition={definition}/>
                </div>
            </div>
            <div className="Grid-right">
                <div className="Grid-inside">
                    <h3 className="text-right">Example object:</h3>
                    <Code>
                        <JSONTree data={examplify(definition)}/>
                    </Code>
                </div>
            </div>
        </div>
    )
}
