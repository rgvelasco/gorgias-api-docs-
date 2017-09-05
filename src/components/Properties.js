import React from 'react'
import {Table} from 'reactstrap'
import ReactMarkdown from 'react-markdown'

const Property = ({definitionName, prop, name, required}) => {
    const displayName = prop.get('type') || prop.get('$ref').split('/')[2]
    let displayComp = displayName

    if (!prop.get('type') && prop.get('$ref')) {
        displayComp = (
            <span><a href={`#${displayName}-object`}><strong>{displayName}</strong></a> object</span>
        )
    } else if (prop.get('type') === 'array') {
        displayComp = `${prop.get('type')}`
    } else if (prop.get('type')) {
        displayComp = `${prop.get('type')}`
    }

    return (
        <tr className="object-property" id={`${definitionName}-object-${name}`}>
            <td className="name">
                {name}

            </td>
            <td className="type">
                {displayComp}
                {required && required.includes(name) ? (
                    <span className="required" title="This field is required">required</span>) : ''}
            </td>
            <td className="desc">
                <ReactMarkdown source={prop.get('description')}/>
            </td>
        </tr>
    )
}

export const Properties = ({name, definition}) => {
    if (!definition) {
        return null
    }
    const definitionName = name
    const requiredProps = definition.get('required') || []
    const properties = definition
        .get('properties')
        .sortBy((p, name) => name)
        .sortBy((p, name) => !requiredProps.includes(name))
        .sortBy((p, name) => name.indexOf('_datetime') !== -1)
        .sortBy((p, name) => name !== 'id')

    return (
        <div className="attributes" id={`${name}-object-properties`}>
            <h2>{name} object properties:</h2>
            <div className="tableCard">
                {/*  Table for the Attributes of the object  */}
                <Table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        properties.map((prop, name) => (
                            <Property
                                key={name}
                                prop={prop}
                                definitionName={definitionName}
                                name={name}
                                required={requiredProps}
                            />
                        )).toList()
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
