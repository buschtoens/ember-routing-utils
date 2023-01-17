import { type DIRegistry } from '@ember/owner';
import { type TestContext } from '@ember/test-helpers';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { register } from '../../helpers/test-context';

module('Unit | Service | routing-utils', function (hooks) {
  setupTest(hooks);

  type RouterService = DIRegistry['service']['router'];
  type RouterServiceMock = {
    -readonly [k in keyof RouterService]?: RouterService[k];
  };

  interface Ctx extends TestContext {
    router: RouterServiceMock;
    routingUtils: DIRegistry['service']['routing-utils'];
  }

  hooks.beforeEach<Ctx>(function () {
    this.router = register('service:router', { instantiate: false }, {
      rootURL: '/',
    } as RouterServiceMock as RouterService);

    this.routingUtils = this.owner.lookup('service:routing-utils');
  });

  module('rootURL', function () {
    test<Ctx>('removeRootURL', function (assert) {
      const scenarios = [
        { rootURL: '/foo/', url: '/foo/bar', expectation: '/bar' },
        { rootURL: '/foo', url: '/bar/qux', expectation: '/bar/qux' },
        { rootURL: '/', url: '/', expectation: '/' },
      ] satisfies { rootURL: string; url: string; expectation: string }[];

      assert.expect(scenarios.length);

      for (const { rootURL, url, expectation } of scenarios) {
        this.router.rootURL = rootURL;
        assert.strictEqual(
          this.routingUtils.removeRootURL(url),
          expectation,
          `rootURL = '${rootURL}'; removeRootURL('${url}') === '${expectation}'`,
        );
      }
    });

    test<Ctx>('prefixRootURL', function (assert) {
      const scenarios = [
        { rootURL: '/foo/', url: 'bar', expectation: '/foo/bar' },
        { rootURL: '/foo', url: 'bar', expectation: '/foo/bar' },
        { rootURL: '/foo/', url: '/bar', expectation: '/foo/bar' },
        { rootURL: '/foo', url: '/bar', expectation: '/foo/bar' },
        { rootURL: '/foo/', url: '/bar/', expectation: '/foo/bar/' },
        { rootURL: '/foo', url: '/bar/', expectation: '/foo/bar/' },
        { rootURL: '/', url: '/', expectation: '/' },
      ] satisfies { rootURL: string; url: string; expectation: string }[];

      assert.expect(scenarios.length);

      for (const { rootURL, url, expectation } of scenarios) {
        this.router.rootURL = rootURL;
        assert.strictEqual(
          this.routingUtils.prefixRootURL(url),
          expectation,
          `rootURL = '${rootURL}'; prefixRootURL('${url}') === '${expectation}'`,
        );
      }
    });
  });

  module.todo('RouteInfo', function () {
    test<Ctx>('getParameters', function (assert) {
      assert.ok(false);
    });
    test<Ctx>('getParametersWithQueryParameters', function (assert) {
      assert.ok(false);
    });
    test<Ctx>('getURLFromRouteInfo', function (assert) {
      assert.ok(false);
    });
  });
});
