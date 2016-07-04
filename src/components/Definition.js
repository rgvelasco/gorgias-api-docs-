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
        <div className="main">
            <div className="Grid">
                {/*  first block  */}
                <div className="Grid-left ">
                    <div className="Grid-inside">
                        <h1>{params.definition}</h1>
                        <p>{definition.get('description')}</p>
                    </div>
                </div>
                <div className="Grid-right"></div>

                {/*  second block  */}
                <div className="Grid-left">
                    <div className="Grid-inside">
                        <Properties name={params.definition} definition={definition}/>
                    </div>
                </div>
                <div className="Grid-right">
                    <div className="Grid-inside">
                        {/* Example */}
                    </div>
                </div>
            </div>
        </div>
    )
}
