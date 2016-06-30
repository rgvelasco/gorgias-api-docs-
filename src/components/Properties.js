import React from 'react'

const Property = ({prop, name, required}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{prop.get('type')}</td>
            <td>{required && required.includes(name) ? 'required' : ''}</td>
            <td>{prop.get('description')}</td>
        </tr>
    )
}

export const Properties = ({name, definition}) => {
    if (!definition) {
        return null
    }

    return (
        <div className="attributes">
            <h2>{name} object properties:</h2>
            <div className="tableCard">
                {/*  Table for the Attributes of the object  */}
                <table className="ui celled striped table" id="table">
                    <thead>
                    <tr>
                        <th column="name">
                            <strong>Name</strong>
                        </th>
                        <th column="type">
                            <em>Type</em>
                        </th>
                        <th column="required">
                            <em>Required</em>
                        </th>
                        <th column="description">
                            <em>Description</em>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        definition.get('properties').map((prop, name) => (
                            <Property key={name} prop={prop} name={name} required={definition.get('required')}/>
                        )).toList()
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
