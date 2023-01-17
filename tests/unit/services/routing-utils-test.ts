import { setupTest } from 'ember-qunit';
import type RoutingUtilsService from 'ember-routing-utils/services/routing-utils';
import { module, test } from 'qunit';

module('Unit | Service | routing-utils', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const service = this.owner.lookup(
      'service:routing-utils',
    ) as RoutingUtilsService;
    assert.ok(service);
  });
});
