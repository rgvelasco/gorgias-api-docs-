import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
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
