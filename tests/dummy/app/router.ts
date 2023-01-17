/* eslint-disable @typescript-eslint/no-invalid-this */
import EmberRouter from '@ember/routing/router';

import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('no-param', function () {
    this.route('no-param');
    this.route('single-param', { path: 'single-param/:single_param' });
    this.route('double-param', {
      path: 'double-param/:first_param/:second_param',
    });
  });
  this.route(
    'single-param',
    { path: 'single-param/:single_param' },
    function () {
      this.route('no-param');
      this.route('single-param', { path: 'single-param/:single_param' });
      this.route('double-param', {
        path: 'double-param/:first_param/:second_param',
      });
    },
  );
  this.route(
    'double-param',
    { path: 'double-param/:first_param/:second_param' },
    function () {
      this.route('no-param');
      this.route('single-param', { path: 'single-param/:single_param' });
      this.route('double-param', {
        path: 'double-param/:first_param/:second_param',
      });
    },
  );
});
