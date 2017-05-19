import * as angular from 'angular';
import { NameService } from '../';

class HelloWorldController {
  public helloText: string = '';

  /** @ngInject */
  constructor(
    private nameService: NameService,
    private $translate: angular.translate.ITranslateService
  ) {}

  $onInit(): void {
    let name = this.nameService.getName();

    this.$translate('providerExample.hello', {name: name}).then(result => {
      this.helloText = result;
    });
  }
}


export const HelloWorldComponent: angular.IComponentOptions = {
  template: require('./helloWorld.component.html'),
  controller: HelloWorldController,
  controllerAs: 'vm'
};
