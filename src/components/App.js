import React from 'react'
// we don't need bootstrap
import '../static/css/main.css'
import Navigation from './Navigation'

export const App = ({children}) => {
    return (
        <div>
            <Navigation/>

            {/*   MAIN (everything except the Navigation SideColumn)   */}
            {/*  CONTENT (Tag or Definition)  */}
            <div className="main">
                {children}
            </div>
        </div>
    )
}
