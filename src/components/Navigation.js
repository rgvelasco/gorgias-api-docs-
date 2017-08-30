import React from 'react'
import slug from 'slug'
import {fromJS} from 'immutable'
import logo from '../static/img/logo.svg'

const Navigation = () => {
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
            <div className="navigation-wrap">
                <div>
                    <a href="/" className="brand">
                      <img src={logo} id="logo" alt="Gorgias API" />
                    </a>
                    <div className="select-menu">
                      <select className="fld select">
                        <optgroup label="GENERAL">
                          <option value="#intro">Introduction</option>
                          <option value="#authentication">Authentication</option>
                          {/* did you can nest another <optgroup> here if you want to */}
                          <option value="#pagination">Pagination</option>
                          <option value="#querying-the-api" selected>Querying the API</option>
                          <option value="#errors">Errors</option>
                        </optgroup>

                        <optgroup label="CORE RESOURCES">
                          {/*
                            orderedResources.map(tag => (
                                <li key={tag.get('name')}>
                                    <a href={`#${tag.get('name')}`}>
                                        {tag.get('name')}
                                    </a>
                                    {
                                        window.location.hash.includes(`${tag.get('name')}`) && (
                                            <ul className="nav-menu nested">
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
                          */}
                           <option>Event</option>
                           <option>Integration</option>
                           <option>Rule</option>
                           <option>Ticket</option>
                           <option>User</option>
                           <option>View</option>
                        </optgroup>
                        <optgroup label="ALL OBJECTS">
                          <option value="#intro">Introduction</option>
                          <option value="#authentication">Authentication</option>
                          <option value="#pagination">Pagination</option>
                          <option value="#querying-the-api">Querying the API</option>
                          <option value="#errors">Errors</option>
                        </optgroup>
                      </select>
                    </div>
                    <strong className="h-small light">General</strong>
                    <ul className="nav-menu">
                        <li><a className="active" href="#intro">Introduction</a></li>
                        <li><a href="#authentication">Authentication</a></li>
                        <li><a href="#pagination">Pagination</a></li>
                        <li><a href="#querying-the-api">Querying the API</a></li>
                        <li><a href="#errors">Errors</a></li>
                    </ul>

                    <strong className="h-small light">Core resources</strong>
                    <ul className="nav-menu">
                        {
                            orderedResources.map(tag => (
                                <li className="expandable" key={tag.get('name')}>
                                    <a href={`#${tag.get('name')}`}>
                                        {tag.get('name')}
                                    </a>
                                    {
                                        window.location.hash.includes(`${tag.get('name')}`) && (
                                            <ul className="nav-menu nested">
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

                    <strong className="h-small light">All Objects</strong>
                    <ul className="nav-menu">
                        {
                            orderedDefinitions.map((def, name) => (
                                <li key={name}>
                                    <a href={`#${name}-definition`}>
                                        {name}
                                    </a>
                                </li>
                            )).toList().toJS()
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navigation
