import React from 'react'
import {fromJS} from 'immutable'
import {Code} from './../../utils'
import {JSONTree} from './../JsonTree'

export const Errors = () => (
    <div id="errors" className="row">
      <div className="wrap">
        {/*  Left Column  */}
        <div className="col left">
            {/*  Description  */}
            <h1>Errors</h1>
            <h2><Code light inline>400 Bad Request</Code></h2>
            <p>
                Means one or more of your parameters had the wrong format, had a wrong key, or something like that. Check the <Code light inline>error</Code> field in the body.
            </p>

            <Code light>
                <JSONTree data={fromJS(
                    {
                        error: {
                            data: {
                                sender: [
                                    'Missing data for required field.'
                                ],
                                channel: [
                                    'Missing data for required field.'
                                ]
                            },
                            msg: 'Failed to create ticket'
                        }
                    }
                )}/>
            </Code>

            <h2><Code light inline>401 Unauthorized</Code></h2>
            <p>
                You&#39;re not logged in, or you are trying to access someone else&#39;s data.
            </p>

            <h2><Code light inline>404 Not Found</Code></h2>
            <p>
                Either the endpoint you sent a request to, or an object reference in the path (like the <Code light inline>user_id = 0</Code> in <Code light inline>/api/users/0/</Code>) references an object which doesn&#39;t exist.
            </p>

            <Code light>
                <JSONTree data={fromJS(
                    {
                        error: {
                            msg: 'Resource not found.'
                        }
                    }
                )}/>
            </Code>

            <h2><Code light inline>405 Method Not Allowed</Code></h2>
            <p>
                You tried using a method which is not allowed (like a <Code light inline>POST</Code> on a <Code light inline>detail</Code> endpoint).
            </p>

            <Code light>
                <JSONTree data={fromJS(
                    {
                        error: {
                            msg: 'The specified HTTP method is not allowed.'
                        }
                    }
                )}/>
            </Code>

            <h2><Code light inline>409 Conflict</Code></h2>
            <p>
                You tried creating/updating an object with an identifier already in use (like a user with an existing email address).
            </p>

            <Code light>
                <JSONTree data={fromJS(
                    {
                        error: {
                            msg: 'The resource already exists.'
                        }
                    }
                )}/>
            </Code>

            <h2><Code light inline>503 Service Unavailable</Code></h2>
            <p>
                Something is wrong with an external service provider.
            </p>

            <Code light>
                <JSONTree data={fromJS(
                    {
                        error: {
                            msg: 'An external service had an issue.'
                        }
                    }
                )}/>
            </Code>

        </div>

        {/*  Right Column  */}
        <div className="col right">

        </div>
      </div>
    </div>
)
