import React from 'react'

import ScrollSpy from 'react-scrollspy'
import logo from '../static/img/logo.svg'
import {
    navigationSelector,
} from '../selectors'

export default class Navigation extends React.Component {
    state = {
        hash: window.location.hash
    }

    componentDidMount() {
        window.addEventListener("hashchange", this._onHashChange, false)


        // A simple hack that scroll to the hash location after the open api is downloaded
        const hash = window.location.hash
        window.location.hash = ''
        window.location.hash = hash
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this._onHashChange, false)
    }

    _onHashChange = () => {
        this.setState({hash: window.location.hash})
    }

    _onScrollSpyUpdate = (target) => {
        if (target && target.attributes['id']) {
            const targetId = target.attributes['id'].value
            if (window.location.hash !== `#${targetId}`) {
                window.history.pushState('', '', `#${targetId}`)
                this._onHashChange()
            }
        }
    }

    _renderMobileNavigation = () => {
        const navigation = navigationSelector()
        return (
            <div className="select-menu">
                <select className="fld select">
                    {navigation.map((topNav, name) => (
                        <optgroup key={name} label={topNav.get('name')}>
                            {topNav.get('items').map((item) => (
                                <option key={item.get('path')}>
                                    {item.get('name')}
                                </option>
                            )).toList()}
                        </optgroup>
                    )).toList()}
                </select>
            </div>
        )
    }

    _renderNavigation = () => {
        const navigation = navigationSelector()
        return (
            <div>
                {navigation.map((topNav, name) => (
                    <div key={name}>
                        <strong className="h-small light">{topNav.get('name')}</strong>
                        <ScrollSpy
                            currentClassName="active"
                            className="nav-menu"
                            rootEl=".main"
                            onUpdate={this._onScrollSpyUpdate}
                            items={topNav.get('items').map((i) => i.get('path')).toJS()}
                        >
                            {topNav.get('items').map((item) => (
                                <li key={item.get('path')}>
                                    <a href={`#${item.get('path')}`}>{item.get('name')}</a>

                                    {/* Sub navigation - only 2 levels are allowed */}
                                    {item.get('items') && window.location.hash.includes(`${item.get('path')}`) ? (
                                        <ScrollSpy
                                            currentClassName="active"
                                            className="nav-menu nested"
                                            rootEl=".main"
                                            onUpdate={this._onScrollSpyUpdate}
                                            items={item.get('items').map((i) => i.get('path')).toJS()}
                                        >
                                            {item.get('items').map((item) => (
                                                <li key={item.get('path')}>
                                                    <a href={`#${item.get('path')}`}>{item.get('name')}</a>
                                                </li>
                                            ))}
                                        </ScrollSpy>
                                    ) : null}
                                </li>
                            )).toList()}
                        </ScrollSpy>
                    </div>
                )).toList()}
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
