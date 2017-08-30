import React from 'react'
import {fromJS} from 'immutable'
import {JSONTree} from './../JsonTree'
import {Code} from './../../utils'

export const QueryingTheAPI = () => (
    <div id="querying-the-api" className="section">
      <div className="wrap">
        {/*  Left Column  */}
        <div className="column left">
            {/*  Description  */}
            <h1>Querying the API </h1>
            <h3>Domain URL</h3>
            <p>
                Before starting make sure that all your requests should go to your gorgias domain URL. For example: <Code inline light>https://my-company.gorgias.io/api/tickets/</Code> Make sure you replace <Code light inline>my-company</Code> with your own company domain.
            </p>

            <h3>Sending data in the body</h3>
            <p>
                When sending data in the body, you must send it as <Code light inline>JSON</Code> (with the header <Code light inline>Content-type</Code> set at <Code light inline>application/json</Code>). For now (and it probably won't change), we don't accept <Code light inline>text/xml</Code> nor <Code light inline>multipart/form-data</Code> content types.
            </p>

            <h3>Partial updates</h3>
            <p>
                When doing updates on objects (i.e. <Code light inline>PUT /api/tickets/{'{ticket_id}'}/</Code>),
                you don't have to send all the data; actually, it's better if you don&#39;t.
            </p>
            <p>
                Just send the fields you want to modify: it will avoid conflicts if other fields of the object has
                been modified
                since you last fetched it, in addition of reducing the size of the request, therefore improving the
                performances of the API.
            </p>

            <h3>Nested objects</h3>
            <p>
              If you work with nested object you should be extra careful. If you just want to reference an object (a user for example), only include its id like so:
            </p>

            <Code light>
                <JSONTree data={fromJS(
                    {
                        requester: {
                            id: 1234
                        }
                    }
                )}/>
            </Code>

            <p>
              If you include any other field, it will <strong>update the object</strong>. You can do it; however, don&#39;t do it by mistake: it may erase previous modifications made by other users, other scripts, or the rules of your account.
            </p>

            <p>
                When including a nested <Code light inline>User</Code> in an object, if you want to reference it but
                don't have it's <Code light inline>id</Code>, you can instead include it&#39;s email address. If the
                user is not found, a new user will be created with this email address, and it&#39;s
                <Code light inline>id</Code> will be returned with the response to your request.
            </p>

        </div>

        {/*  Right Column  */}
        <div className="column right">
        </div>
      </div>
    </div>
)
