import React from 'react'
import {NavLink} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../static/css/main.css'

export const App = ({children}) => {
    const openapi = window.openapi

    const orderedTags = openapi.get('tags').sort((v1, v2) => v1.get('name') > v2.get('name'))
    const orderedDefinitions = openapi.get('definitions').sortBy((v, k) => k)

    return (
        <div>
            {/* Navigation SideColumn  */}
            <div className="navigation">
                <NavLink to="/">
                    <h1 className="brand">Gorgias API</h1>
                </NavLink>
                <p>INTRODUCTION</p>
                <ul>
                    <li>
                        {/*<Link activeClassName="activeLink" to="/getting-started">Getting Started</Link>*/}
                        <NavLink activeClassName="activeLink" to="/authentication">Authentication</NavLink>
                        <NavLink activeClassName="activeLink" to="/pagination">Pagination</NavLink>
                        <NavLink activeClassName="activeLink" to="/querying-the-api">Querying the API</NavLink>
                        <NavLink activeClassName="activeLink" to="/errors">Errors</NavLink>
                    </li>
                </ul>

                <p>API</p>
                <ul>
                    {
                        orderedTags.map(tag => (
                            <li key={tag.get('name')}>
                                <NavLink
                                    activeClassName="activeLink"
                                    to={`/api/${tag.get('name')}`}
                                >
                                    {tag.get('name')}
                                </NavLink>
                            </li>
                        )).toList().toJS()
                    }
                </ul>

                <p>OBJECTS</p>
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

            {/*   MAIN (everything except the Navigation SideColumn)   */}
            {/*  CONTENT (Tag or Definition)  */}
            <div className="main">
                <div className="left-background"/>
                <div className="right-background"/>
                {children}
            </div>
        </div>
    )
}
