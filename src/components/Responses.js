import React from 'react'
import {Table} from 'reactstrap'

export const Responses = ({responses}) => {
    return (
        <div className="responses">
            {
                responses.map((response, status) => (
                    <Response key={status} response={response} status={status}/>
                )).toList()
            }
        </div>
    )
}

const Response = ({response, status}) => {
    const openapi = window.openapi
    const schema = response.get('schema')
    let props = null

    if (!schema) {
        return null
    }

    if (schema.get('$ref')) {
        props = openapi.getIn(['definitions', schema.get('$ref').replace('#/definitions/', ''), 'properties'])
    }

    return (
        <div className="response-item">
            <h3 className="content-block-request-title">
                Response object <strong>({status})</strong>
            </h3>

            {props ? <ResponseTable properties={props}/> : null}
        </div>
    )
}

const ResponseTable = ({properties}) => {
    return (
        <Table>
            <tbody>
            {
                properties.map((property, name) => (
                    <ResponseTableRow property={property} name={name} key={name}/>
                )).toList()
            }
            </tbody>
        </Table>
    )
}

const ResponseTableRow = ({property, name}) => {
    return (
        <tr>
            <td>
                <code className="response-table-name">
                    {name}
                </code>
            </td>
            <td>
                <span className="response-table-type">
                    {property.get('type')}
                </span>
                {property.get('description') ? (
                    <p>
                        {property.get('description')}
                    </p>
                ) : null}
            </td>
        </tr>
    )
}
