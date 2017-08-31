import React from 'react'

export const Intro = () => (
    <div id="intro" className="section">
        <div className="wrap">
            {/*  Left Column  */}
            <div className="column left">
                {/*  Description  */}
                <h1>API Reference</h1>
                <p>
                    <a href="https://gorgias.io/">Gorgias</a> API is structured with <a
                    href="http://en.wikipedia.org/wiki/Representational_State_Transfer">REST</a> in mind.
                    REST means that our API is resource-oriented (unique URLs per resource), we use standard
                    HTTP response codes to indicate API errors and standard HTTP verbs (GET, POST, PUT and DELETE)
                    to perform operations on those resources.
                </p>
            </div>

            {/*  Right Column  */}
            <div className="column right">

            </div>
        </div>
    </div>
)
