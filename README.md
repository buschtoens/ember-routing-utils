# ember-routing-utils

[![CI](https://github.com/buschtoens/ember-routing-utils/workflows/CI/badge.svg)](https://github.com/buschtoens/ember-routing-utils/actions)
[![npm version](https://badge.fury.io/js/ember-routing-utils.svg)](http://badge.fury.io/js/ember-routing-utils)
[![Download Total](https://img.shields.io/npm/dt/ember-routing-utils.svg)](http://badge.fury.io/js/ember-routing-utils)
[![Ember Observer Score](https://emberobserver.com/badges/ember-routing-utils.svg)](https://emberobserver.com/addons/ember-routing-utils)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)  
[![Dependabot enabled](https://img.shields.io/badge/dependabot-enabled-blue.svg?logo=dependabot)](https://dependabot.com/)
[![dependencies Status](https://david-dm.org/buschtoens/ember-routing-utils/status.svg)](https://david-dm.org/buschtoens/ember-routing-utils)
[![devDependencies Status](https://david-dm.org/buschtoens/ember-routing-utils/dev-status.svg)](https://david-dm.org/buschtoens/ember-routing-utils?type=dev)

Some utils for working with the Ember `RouterService` more effectively.

## Installation

```
ember install ember-routing-utils
```

## Usage

### `routing-utils` Service

#### `getParameters(routeInfo: RouteInfo): string[]`

Retrieves all parameters for a `RouteInfo` object and its parents in correct
order, so that you can pass them to e.g. `transitionTo(routeName, ...params)`.

#### `getParametersWithQueryParameters(routeInfo: RouteInfo): string[]`

Same as `getParameters`, but also includes the final `{ queryParams }` for
convenience.

#### `getURLFromRouteInfo(routeInfo: RouteInfo): string`

Builds the URL for a `RouteInfo` object and its parents. Includes the `rootURL`.

#### `removeRootURL(url: string): string`

Removes the `rootURL` from a URL, so that it can be used with `transitionTo()`,
because Ember handles this inconsistently. 🤡

If the URL does not start with the `rootURL` or the app has no `rootURL`, this
just returns the original `url`.

#### `prefixRootURL(url: string): string`

Prefixes the `rootURL` to a URL.

If the URL already starts with the `rootURL` or the app has no `rootURL`, this
just returns the original `url`.
