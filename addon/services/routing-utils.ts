import type RouteInfo from '@ember/routing/-private/route-info';
import type RouterService from '@ember/routing/router-service';
import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class RoutingUtilsService extends Service {
  @service router!: RouterService & { rootURL: string };

  /**
   * Retrieves all parameters for a `RouteInfo` object and its parents in
   * correct oder, so that you can pass them to e.g.
   * `transitionTo(routeName, ...params)`.
   *
   * @param routeInfo
   */
  getParameters(routeInfo: RouteInfo): string[] {
    let allParameters: string[] = [];
    let current: RouteInfo | null = routeInfo;
    do {
      const { params, paramNames } = current;
      const currentParameters = paramNames.map((n) => params[n] as string);
      allParameters = [...currentParameters, ...allParameters];
      // eslint-disable-next-line no-cond-assign
    } while ((current = current.parent));
    return allParameters;
  }

  /**
   * Same as `getParameters`, but also includes the final `{ queryParams }` for
   * convenience.
   *
   * Retrieves all parameters for a `RouteInfo` object and its parents in
   * correct oder, so that you can pass them to e.g.
   * `transitionTo(routeName, ...params)`.
   *
   * @param routeInfo
   */
  getParametersWithQueryParameters(
    routeInfo: RouteInfo,
  ): (string | { queryParams: Record<string, string | undefined> })[] {
    return [
      ...this.getParameters(routeInfo),
      { queryParams: routeInfo.queryParams },
    ];
  }

  /**
   * Builds the URL for a `RouteInfo` object and its parents.
   *
   * @param routeInfo
   *
   * {@link https://github.com/emberjs/rfcs/issues/658}
   */
  getURLFromRouteInfo(routeInfo: RouteInfo): string {
    const { name, queryParams } = routeInfo;
    const orderedParameters = this.getParameters(routeInfo);
    const url = this.router.urlFor(name, ...orderedParameters, { queryParams });
    return url;
  }

  /**
   * Removes the `rootURL` from a URL, so that it can be used with
   * `transitionTo()`, because Ember handles this inconsistently. 🤡
   *
   * If the URL does not start with the `rootURL` or the app has no `rootURL`,
   * this just returns the original `url`.
   *
   * {@link https://github.com/emberjs/ember.js/issues/18422#issuecomment-538668443}
   */
  removeRootURL(url: string): string {
    const { rootURL } = this.router;
    return rootURL && url.startsWith(rootURL)
      ? url.slice(rootURL.length - 1)
      : url;
  }

  /**
   * Prefixes the `rootURL` to a URL.
   *
   * If the URL already starts with the `rootURL` or the app has no `rootURL`,
   * this just returns the original `url`.
   *
   * {@link https://github.com/emberjs/ember.js/issues/18422#issuecomment-538668443}
   */
  prefixRootURL(url: string): string {
    const { rootURL } = this.router;
    return rootURL && !url.startsWith(rootURL) ? `${rootURL}${url}` : url;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'routing-utils': RoutingUtilsService;
  }
}
