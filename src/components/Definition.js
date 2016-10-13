import React from 'react'
import {fromJS} from 'immutable'
import data from '../../data/openapi.json'
import {Properties} from './Properties'

const openapi = fromJS(data)

// Definition
export const Definition = ({params}) => {
    const definitions = openapi.get('definitions')
    const definition = definitions.find((def, name) => {
        return name === params.definition
    })

    return (
        <div className="content">
            <div className="content-block">
                <div className="content-block-details">
                    <h1>{params.definition}</h1>
                    <p>{definition.get('description')}</p>
                </div>
            </div>

            <div className="content-block">
                <div className="content-block-details">
                    <Properties name={params.definition} definition={definition}/>
                </div>
            </div>
        </div>
    )
}
