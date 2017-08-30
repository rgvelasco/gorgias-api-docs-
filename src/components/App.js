import React from 'react'
// we don't need bootstrap
import '../static/css/main.css'
import Navigation from './Navigation'
// import '../static/js/jquery-3.2.1.slim.min.js'
// import '../static/js/scrollspy.js'

import {Intro} from './pages/Intro'
import {Authentication} from './pages/Authentication'
import {QueryingTheAPI} from './pages/QueryingTheAPI'
import {Errors} from './pages/Errors'
import {Pagination} from './pages/Pagination'
import {Tags} from './Tags'
import {Definitions} from './Definitions'

export const App = () => {
    return (
        <div>
            <Navigation/>

            {/*   MAIN (everything except the Navigation SideColumn)   */}
            {/*  CONTENT (Tag or Definition)  */}
            <div data-spy="scroll" data-target="#navbar-example3" data-offset="0" className="main scrollspy-example-2">
                <Intro/>
                <Authentication />
                <QueryingTheAPI />
                <Errors />
                <Pagination />
                <Tags />
                <Definitions />
            </div>
        </div>
    )
}
