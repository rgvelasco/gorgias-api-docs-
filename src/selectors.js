import {createSelector} from 'reselect'
import {fromJS} from 'immutable'

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
                            method,
                            path,
                        })
                    }
                })
            }
        })
        return tag.set('subResources', fromJS(subResources))
    })
)

export const scrollSpyResourcesSelector = createSelector(
    orderedResourcesSelector,
    (resources) => resources.map((r) => r.get('name'))
)

export const scrollSpyDefinitionsSelector = createSelector(
    orderedDefinitionsSelector,
    (definitions) => definitions.keySeq().map((name) => `${name}-object`)
)
