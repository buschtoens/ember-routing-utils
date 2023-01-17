# ember-routing-utils

[![CI](https://github.com/buschtoens/ember-routing-utils/workflows/CI/badge.svg)](https://github.com/buschtoens/ember-routing-utils/actions)
[![npm version](https://badge.fury.io/js/ember-routing-utils.svg)](http://badge.fury.io/js/ember-routing-utils)
[![Download Total](https://img.shields.io/npm/dt/ember-routing-utils.svg)](http://badge.fury.io/js/ember-routing-utils)
[![Ember Observer Score](https://emberobserver.com/badges/ember-routing-utils.svg)](https://emberobserver.com/addons/ember-routing-utils)

Some utils for working with the Ember `RouterService` more effectively.

## Installation

```sh
ember install ember-routing-utils
```

## Usage

### `routing-utils` Service

```ts
import { service, type DIRegistry } from '@ember/owner';

class {
  @service router: DIRegistry['service']['router'];
  @service routingUtils: DIRegistry['service']['routing-utils'];

  // ...
}
```

#### `getParameters`

```ts
getParameters(routeInfo: RouteInfo): string[]
```

Retrieves all parameters for a `RouteInfo` object and its parents in correct
order, so that you can pass them to e.g. `transitionTo(routeName, ...params)`.

```ts
const { currentRoute, currentRouteName } = this.router;
const params = this.routingUtils.getParameters(currentRoute);
this.router.transitionTo(currentRouteName, ...params, currentRoute.queryParams);
```

#### `getParametersWithQueryParameters`

```ts
getParametersWithQueryParameters(routeInfo: RouteInfo): string[]
```

Same as `getParameters`, but also includes the final `{ queryParams }` for
convenience.

```ts
const { currentRoute, currentRouteName } = this.router;
const params = this.routingUtils.getParametersWithQueryParameters(currentRoute);
this.router.transitionTo(currentRouteName, ...params);
```

#### `getURLFromRouteInfo`

```ts
getURLFromRouteInfo(routeInfo: RouteInfo): string
```

Builds the URL for a `RouteInfo` object and its parents. Includes the `rootURL`.

```ts
const { currentRoute, currentRouteName } = this.router;
const url = this.routingUtils.getURLFromRouteInfo(currentRoute);
```

#### `removeRootURL`

```ts
removeRootURL(url: string): string
```

Removes the `rootURL` from a URL, so that it can be used with `transitionTo()`,
because Ember handles this inconsistently. 🤡

If the URL does not start with the `rootURL` or the app has no `rootURL`, this
just returns the original `url`.

#### `prefixRootURL`

```ts
prefixRootURL(url: string): string
```

Prefixes the `rootURL` to a URL.

If the URL already starts with the `rootURL` or the app has no `rootURL`, this
just returns the original `url`.
