import * as angular from 'angular';
import { NameService } from '.';

export class NameServiceProvider implements angular.IServiceProvider  {
  private name: string;

  public setName(name: string): void {
    this.name = name;
  }

  public $get(): NameService {
    return new NameService(this.name);
  }
}
