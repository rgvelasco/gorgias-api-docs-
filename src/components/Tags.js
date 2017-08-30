import React from 'react'
import {Properties} from './Properties'
import {Path} from './Path'

// A Tag groups a list of Paths
export const Tags = () => {
    const openapi = window.openapi
    const tags = openapi.get('tags')
    const definitions = openapi.get('definitions')
    const paths = openapi.get('paths')

    return (
        <div>
            {tags.map((tag) => (
                <div key={tag.get('name')} id={tag.get('name')}>
                    {
                        definitions.map((def, name) => {
                            if (name === tag.get('name')) {
                                return (
                                    <div className="section" key={name}>
                                        <div className="wrap">
                                            <div className="column left">
                                                <h1>{tag.get('name')}</h1>
                                                <p>{def.get('description')}</p>
                                                <p>{tag.get('description')}</p>
                                                <Properties name={tag.get('name')} definition={def}/>
                                            </div>
                                            <div className="column right">
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return null
                        }).toList()
                    }
                    {
                        paths.filter((verbs, uri) => {
                            // Ex: {'/api/user': ['get': {tags: ['User']}, 'post': ..]}
                            return !!verbs.find((v, name) => v.get('tags').includes(tag.get('name')))
                        }).map((verbs, uri) => (
                            <Path key={uri} verbs={verbs} uri={uri}/>
                        )).toList()
                    }
                </div>
            )).toList()}
        </div>
    )
}
