import React from 'react'
import {Properties} from './Properties'
import {JSONTree} from './JsonTree'
import {examplify, Code} from './../utils'


// Definition
export const Definitions = () => {
    const openapi = window.openapi
    const definitions = openapi.get('definitions')
    return (
        <div>
            {definitions.map((def, name) => (
                <div key={name} id={`${name}-definition`} className="row">
                    <div className="wrap">
                        <div className="col left ">
                            <h1>{name}</h1>
                            <p>{def.get('description')}</p>
                            <Properties name={name} definition={def}/>
                        </div>
                        <div className="col right">
                            <strong className="h-small dark">Example object:</strong>
                            <Code>
                                <JSONTree data={examplify(def)}/>
                            </Code>
                        </div>
                    </div>
                </div>
            )).toList()}
        </div>
    )
}
