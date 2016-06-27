import React from 'react'

const Property = ({prop, name, required}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{prop.get('type')}</td>
            <td>{required.includes(name) ? 'required' : ''}</td>
            <td>{prop.get('description')}</td>
        </tr>
    )
}

export const Properties = ({name, definition}) => {
    if (!definition) {
        return null
    }

    console.log(definition)
    return (
        <div className="attributes">
            <h2>{name} object properties:</h2>
            <div className="tableCard">
                {/*  Table for the Attributes of the object  */}
                <table className="table" id="table" style={{ width: '100%', textAlign:'left' }}>
                    <thead>
                    <tr>
                        <th column="name" style={{ width: '25%' }}>
                            <strong>Name</strong>
                        </th>
                        <th column="type" style={{ width: '25%' }}>
                            <em>Type</em>
                        </th>
                        <th column="required" style={{ width: '15%' }}>
                            <em>Required</em>
                        </th>
                        <th column="description" style={{ width: '35%' }}>
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
