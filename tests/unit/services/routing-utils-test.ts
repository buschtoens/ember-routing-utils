import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

import type RoutingUtilsService from 'ember-routing-utils/services/routing-utils';

module('Unit | Service | routing-utils', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const service = this.owner.lookup(
      'service:routing-utils'
    ) as RoutingUtilsService;
    assert.ok(service);
  });
});
