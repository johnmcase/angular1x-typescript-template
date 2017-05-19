import * as angular from 'angular';
import 'angular-translate';
import 'angular-translate-interpolation-messageformat';
import 'angular-sanitize';
import 'angular-translate-loader-url';
import 'bootstrap';

import 'angular-ui-router';
import routesConfig from './routes';

import { providerExampleModuleName, NameServiceProvider } from './app/providerExampleModule';

angular
  .module('app', [
    'ui.router',
    'pascalprecht.translate',
    providerExampleModuleName
  ])

  /** @ngInject */
  .config((nameServiceProvider: NameServiceProvider) => {
    nameServiceProvider.setName('from config block!');
  })

  .config(routesConfig)

  /** @ngInject */
  .config(($translateProvider: angular.translate.ITranslateProvider) => {
    let navigator: any = window.navigator,
      userLang = navigator.languages ? navigator.languages[0].split('-')[0] : navigator.language.split('-')[0];
    userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';

    $translateProvider
      .useUrlLoader(`./${userLang}.json`)
      .preferredLanguage('en')
      .useSanitizeValueStrategy('escape')
      .addInterpolation('$translateMessageFormatInterpolation');
  });
