import React from 'react'
import slug from 'slug'
import ScrollSpy from 'react-scrollspy'
import logo from '../static/img/logo.svg'
import {
    orderedDefinitionsSelector,
    orderedResourcesSelector, scrollSpyDefinitionsSelector,
    scrollSpyResourcesSelector
} from '../selectors'

export default class Navigation extends React.Component {
    state = {
        hash: window.location.hash
    }

    componentDidMount() {
        window.addEventListener("hashchange", this._onHashChange, false)
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this._onHashChange, false)
    }

    _onHashChange = () => {
        this.setState({hash: window.location.hash})
    }

    _renderMobileNavigation = () => {
        return (
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
        )
    }


    _renderNavigation = () => {
        const orderedDefinitions = orderedDefinitionsSelector()
        const orderedResources = orderedResourcesSelector()

        return (
            <div>
                <strong className="h-small light">General</strong>
                <ScrollSpy
                    currentClassName="active"
                    className="nav-menu"
                    rootEl=".main"
                    items={['intro', 'authentication', 'querying-the-api', 'errors', 'pagination']}
                >
                    <li><a href="#intro">Introduction</a></li>
                    <li><a href="#authentication">Authentication</a></li>
                    <li><a href="#querying-the-api">Querying the API</a></li>
                    <li><a href="#errors">Errors</a></li>
                    <li><a href="#pagination">Pagination</a></li>
                </ScrollSpy>

                <strong className="h-small light">Core resources</strong>

                <ScrollSpy
                    currentClassName="active"
                    className="nav-menu"
                    rootEl=".main"
                    items={scrollSpyResourcesSelector().toJS()}
                >
                    {
                        orderedResources.map(tag => (
                            <li className="expandable" key={tag.get('name')}>
                                <a href={`#${tag.get('name')}`}>
                                    {tag.get('name')}
                                </a>
                                {
                                    this.state.hash.includes(`${tag.get('name')}`) && (
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
                </ScrollSpy>

                <strong className="h-small light">All Objects</strong>

                <ScrollSpy
                    currentClassName="active"
                    className="nav-menu"
                    rootEl=".main"
                    items={scrollSpyDefinitionsSelector().toJS()}
                >
                    {
                        orderedDefinitions.map((def, name) => (
                            <li key={name}>
                                <a href={`#${name}-object`}>
                                    {name}
                                </a>
                            </li>
                        )).toList().toJS()
                    }
                </ScrollSpy>
            </div>
        )
    }

    render() {
        return (
            <div className="navigation">
                <div className="navigation-wrap">
                    <a href="/" className="brand">
                        <img src={logo} id="logo" alt="Gorgias API"/>
                    </a>
                    {this._renderMobileNavigation()}
                    {this._renderNavigation()}
                </div>
            </div>
        )
    }
}
