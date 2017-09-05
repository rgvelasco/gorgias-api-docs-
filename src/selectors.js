import {createSelector} from 'reselect'
import {fromJS} from 'immutable'
import slug from 'slug'

export const OpenAPISelector = () => fromJS(window.openapi)

export const definitionsSelector = createSelector(
    OpenAPISelector,
    openapi => openapi.get('definitions') || fromJS({})
)

export const tagsSelector = createSelector(
    OpenAPISelector,
    openapi => openapi.get('tags') || fromJS([])
)

export const pathsSelector = createSelector(
    OpenAPISelector,
    openapi => openapi.get('paths') || fromJS([])
)

export const orderedDefinitionsSelector = createSelector(
    definitionsSelector,
    definitions => definitions.sortBy((d, name) => name)
)

export const orderedTagsSelector = createSelector(
    tagsSelector,
    tags => tags.sortBy((t) => t.get('name'))
)

export const orderedResourcesSelector = createSelector(
    orderedTagsSelector, pathsSelector,
    (tags, paths) => tags.map((tag) => {
        const subResources = []
        paths.forEach((verbs, path) => {
            if (!verbs.isEmpty()) {
                verbs.forEach((verb, method) => {
                    if (verb.get('tags').contains(tag.get('name'))) {
                        subResources.push({
                            name: verb.get('summary'),
                            title: verb.get('description'),
                            path: `${tag.get('name')}-${slug(verb.get('summary').toLowerCase())}`,
                        })
                    }
                })
            }
        })
        return tag.set('items', fromJS(subResources))
    })
)

export const navigationSelector = createSelector(
    orderedResourcesSelector, orderedDefinitionsSelector,
    (resources, definitions) => fromJS({
        general: {
            name: 'General',
            items: [
                {path: 'intro', name: 'Introduction'},
                {path: 'authentication', name: 'Authentication'},
                {path: 'querying-the-api', name: 'Querying the API'},
                {path: 'errors', name: 'Errors'},
                {path: 'pagination', name: 'Pagination'},
            ]
        },
        resources: {
            name: 'Core resources',
            items: []
        },
        definitions: {
            name: 'All objects',
            items: []
        }
    }).setIn(['resources', 'items'], resources.map((r) => fromJS({
        path: r.get('name'),
        name: r.get('name'),
        items: r.get('items').unshift(fromJS({
            name: `The ${r.get('name')} object`,
            title: `${r.get('name')} object definition`,
            path: `${r.get('name')}-object-properties`,
        }))
    }))).setIn(['definitions', 'items'], definitions.keySeq().map((name) => fromJS({
        path: `${name}-object`,
        name
    })))
)
