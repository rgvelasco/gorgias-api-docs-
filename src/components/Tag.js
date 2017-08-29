import React from 'react'
import {Properties} from './Properties'
import {Path} from './Path'

// A Tag groups a list of Paths
export const Tag = ({match}) => {
    const openapi = window.openapi
    const tags = openapi.get('tags')
    const tag = tags.find((tag) => tag.get('name') === match.params.tag)

    const definitions = openapi.get('definitions')
    const definition = definitions.find((def, name) => name === tag.get('name'))

    // Find all paths that match our tag
    const paths = openapi.get('paths').filter((verbs, uri) => {
        // Ex: {'/api/user': ['get': {tags: ['User']}, 'post': ..]}
        return !!verbs.find((v, name) => v.get('tags').includes(tag.get('name')))
    })

    return (
        <div>
            {/* the parrent div shouldn't be there if you can get rid of it ! ; first block  */}
            <div className="row">
              <div className="wrap">
                <div className="col left">
                    <h1>{tag.get('name')}</h1>
                    {
                        !!definition && (
                            <p>{definition.get('description')}</p>
                        )
                    }
                    <p>{tag.get('description')}</p>
                    <Properties name={tag.get('name')} definition={definition}/>
                </div>

                <div className="col right">
                </div>

              </div>
            </div>

            {
              paths.map((verbs, uri) => (
                <Path key={uri} verbs={verbs} uri={uri}/>
              )).toList()
            }
        </div>
    )
}
