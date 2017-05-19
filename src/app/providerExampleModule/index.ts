import * as angular from 'angular';
import { NameServiceProvider } from './name.service.provider';
import { NameService } from './name.service';
import { HelloWorldComponent } from './components/helloWorld.component';

export const providerExampleModuleName = 'providerExample';
export { NameServiceProvider, NameService };

angular
  .module(providerExampleModuleName, [])
  .provider('nameService', NameServiceProvider)
  .component('helloWorld', HelloWorldComponent);
