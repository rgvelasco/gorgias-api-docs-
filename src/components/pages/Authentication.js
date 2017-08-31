import React from 'react'
import {Code} from './../../utils'

export const Authentication = () => (
    <div id="authentication" className="section">
        <div className="wrap">
            <div className="column left">
                <h1>Authentication</h1>
                <p>
                    There are several ways to authenticate your requests to the Gorgias API. The recommended way is
                    using <a href="#api-key-auth">API Key authentication</a>.
                </p>

                <h3 id="api-key-auth">API Key authentication</h3>
                <p>
                    The recommended method of authentication for using the API is to use API keys. You can find your
                    account&#39;s API keys on your Gorgias helpdesk, in <Code light inline>Settings > API Keys</Code>.
                </p>

                <p>
                    Using an API Key for authentication is as easy as using Basic authentication: actually, it uses the
                    same process (HTTP Basic authentication), but with your email as username, and the API Key as
                    password:
                </p>
                <Code light>
                    Authorization: Basic YWRtaW5AZ29yZ2lhcy5pbzphZG1pbg==
                </Code>
                <p>
                    with <Code light inline>YWRtaW5AZ29yZ2lhcy5pbzphZG1pbg==</Code> being the string <Code light inline>email:apikey</Code>
                    encoded in base64.
                </p>
                <p>
                    In <Code light inline>Settings > API Keys</Code>, you can manage your API Keys,
                    e.g. create new API Keys or delete existing ones. We encourage you to delete any API Key
                    you think may have been compromised, and to replace them frequently.
                </p>

                <h3>Basic authentication</h3>
                <p>
                    You can also authenticate to Gorgias using regular HTTP Basic authentication, by including the
                    <Code light inline>Authorization</Code> header in your request:
                </p>
                <Code light>
                    Authorization: Basic YWRtaW5AZ29yZ2lhcy5pbzphZG1pbg==
                </Code>
                <p>
                    with <Code light inline>YWRtaW5AZ29yZ2lhcy5pbzphZG1pbg==</Code> being the string <Code light inline>username:password</Code>
                    encoded in base64. Though, this method is not recommended and should not be used, as when changing
                    your password you would need to update authentication in your applications as well.
                </p>
            </div>
            <div className="column right">
            </div>
        </div>
    </div>
)
