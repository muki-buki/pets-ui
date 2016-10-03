import './polyfills.browser';
import './rxjs.imports';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {bootloader} from '@angularclass/hmr';
import {AppModule} from './app/app.module';
import {ApplicationRef} from '@angular/core';
import {enableDebugTools} from '@angular/platform-browser';

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then((ngModule: any) => {
      const ngApp = ngModule.injector.get(ApplicationRef);
      const rootComponent = ngApp.components[0];

      let _ng = (<any>window).ng;
      enableDebugTools(rootComponent);
      (<any>window).ng.probe = _ng.probe;
      (<any>window).ng.coreTokens = _ng.coreTokens;
      return ngModule;
    })
    .catch(err => console.error(err));
}

bootloader(main);
