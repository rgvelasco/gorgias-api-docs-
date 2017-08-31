import React from 'react'
import {Table} from 'reactstrap'

const Property = ({prop, name, required}) => {
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
        <tr>
            <td>{name} {required && required.includes(name) ? <span className="required">req.</span> : ''}</td>
            <td>{displayComp}</td>
            <td>{prop.get('description')}</td>
        </tr>
    )
}

export const Properties = ({name, definition}) => {
    if (!definition) {
        return null
    }
    const requiredProps = definition.get('required') || []
    const properties = definition
        .get('properties')
        .sortBy((p, name) => name)
        .sortBy((p, name) => !requiredProps.includes(name))
        .sortBy((p, name) => name.indexOf('_datetime') !== -1)
        .sortBy((p, name) => name !== 'id')

    return (
        <div className="attributes" id={`${name}-properties`}>
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
                            <Property key={name} prop={prop} name={name} required={requiredProps}/>
                        )).toList()
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
