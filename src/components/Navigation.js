import React from 'react'
import {withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../static/css/main.css'
import slug from 'slug'
import {fromJS} from 'immutable'

const Navigation = ({location}) => {
    const openapi = window.openapi
    const paths = openapi.get('paths')
    const orderedTags = openapi.get('tags').sort((v1, v2) => v1.get('name') > v2.get('name'))
    const orderedDefinitions = openapi.get('definitions').sortBy((v, k) => k)
    const orderedResources = orderedTags.map((tag) => {
        const subResources = []
        paths.forEach((verbs, path) => {
            if (!verbs.isEmpty()) {
                verbs.forEach((verb, method) => {
                    if (verb.get('tags').contains(tag.get('name'))) {
                        subResources.push({
                            name: verb.get('summary'),
                            title: verb.get('description'),
                            method,
                            path,
                        })
                    }
                })
            }
        })
        return tag.set('subResources', fromJS(subResources))
    })

    return (
        <div className="navigation">
            <NavLink to="/">
                <h1 className="brand">Gorgias API</h1>
            </NavLink>
            <p>Introduction</p>
            <ul>
                <li>
                    {/*<Link activeClassName="activeLink" to="/getting-started">Getting Started</Link>*/}
                    <NavLink activeClassName="activeLink" to="/authentication">Authentication</NavLink>
                    <NavLink activeClassName="activeLink" to="/pagination">Pagination</NavLink>
                    <NavLink activeClassName="activeLink" to="/querying-the-api">Querying the API</NavLink>
                    <NavLink activeClassName="activeLink" to="/errors">Errors</NavLink>
                </li>
            </ul>

            <p>Core resources</p>
            <ul>
                {
                    orderedResources.map(tag => (
                        <li key={tag.get('name')}>
                            <NavLink
                                activeClassName="activeLink"
                                to={`/api/${tag.get('name')}`}
                            >
                                {tag.get('name')}
                            </NavLink>
                            {
                                location.pathname.includes(`/api/${tag.get('name')}`) && (
                                    <ul className="subNav">
                                        <li>
                                            <a href={`#${tag.get('name')}-properties`}
                                               title={`${tag.get('name')} object properties`}
                                            >
                                                {tag.get('name')} object
                                            </a>
                                        </li>
                                        {
                                            tag.get('subResources').map((sub) => (
                                                <li key={sub.get('path') + sub.get('name')}>
                                                    <a href={`#${slug(`${sub.get('method')}-${sub.get('path')}`)}`}
                                                       title={sub.get('title')}
                                                    >
                                                        {sub.get('name')}
                                                    </a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                        </li>
                    )).toList().toJS()
                }
            </ul>

            <p>Object definitions</p>
            <ul>
                {
                    orderedDefinitions.map((def, name) => (
                        <li key={name}>
                            <NavLink
                                activeClassName="activeLink"
                                to={`/definitions/${name}`}
                            >
                                {name}
                            </NavLink>
                        </li>
                    )).toList().toJS()
                }
            </ul>
        </div>
    )
}

export default withRouter(Navigation)
