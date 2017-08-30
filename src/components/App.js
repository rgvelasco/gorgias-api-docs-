import React from 'react'
import '../static/css/main.css'
import Navigation from './Navigation'

import {Intro} from './pages/Intro'
import {Authentication} from './pages/Authentication'
import {QueryingTheAPI} from './pages/QueryingTheAPI'
import {Errors} from './pages/Errors'
import {Pagination} from './pages/Pagination'
import {Tags} from './Tags'
import {Definitions} from './Definitions'

// https://www.npmjs.com/package/react-scroll
// --
// import 'react-scroll'
// var Scroll = require('react-scroll');
// var Events = Scroll.Events;
// Events.scrollEvent.register('begin', function(to, element) {
//   console.log("begin", to, element);
// });

export const App = () => {
    return (
        <div>
            <Navigation/>

            {/*   MAIN (everything except the Navigation SideColumn)   */}
            {/*  CONTENT (Tag or Definition)  */}
            <div>
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
