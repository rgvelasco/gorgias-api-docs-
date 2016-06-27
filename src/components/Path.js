import React from 'react'

const Verb = ({verb, method}) => {
    return (
        <div className="Grid">
            <div className="Grid-left">
                <div className="Grid-inside">
                    {/*  description  */}
                    <div>
                        <h1>{verb.get('summary')}</h1>
                        <p>{verb.get('description')}</p>
                    </div>
                    {/*Parameters*/}
                </div>
            </div>
            <div className="Grid-right">
                <div className="Grid-inside">
                    <h3 className="text-right">HTTP Request</h3>
                    <code className="code">{method}</code>

                    <h3 className="text-right"> Example Response (status: {status}) </h3>
                    <code className="code"></code>
                </div>
            </div>
        </div>
    )
}

export const Path = ({uri, verbs}) => {
    return (
        <div className="paths">
            <h2>{uri}</h2>
            {verbs.map((verb, method) => (
                <Verb key={method} verb={verb} method={method}/>
            )).toList()}
        </div>
    )
}
