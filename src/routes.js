import React from 'react'
import {IndexRoute, Route} from 'react-router'
import {App} from './components/App'
import {Index} from './components/Index'
import {Tag} from './components/Tag'
import {Definition} from './components/Definition'

export const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path="/api/:tag" component={Tag}/>
        <Route path="/definitions/:definition" component={Definition}/>
    </Route>
)

