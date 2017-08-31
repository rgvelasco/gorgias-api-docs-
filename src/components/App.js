import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../static/css/main.css'
import Navigation from './Navigation'

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
            <div className="main">
                <Intro/>
                <Authentication/>
                <QueryingTheAPI/>
                <Errors/>
                <Pagination/>

                <Tags/>
                <Definitions/>
            </div>
        </div>
    )
}
