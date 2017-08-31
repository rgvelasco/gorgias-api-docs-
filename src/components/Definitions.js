import React from 'react'
import {Properties} from './Properties'
import {JSONTree} from './JsonTree'
import {examplify, Code} from './../utils'
import {orderedDefinitionsSelector} from '../selectors'


// Definition
export const Definitions = () => {
    const definitions = orderedDefinitionsSelector()
    return (
        <div>
            {definitions.map((def, name) => (
                <div key={name} className="section">
                    <div className="wrap">
                        <div className="column left">
                            <h1 id={`${name}-object`}>{name}</h1>
                            <p>{def.get('description')}</p>
                            <Properties name={name} definition={def}/>
                        </div>
                        <div className="column right">
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
