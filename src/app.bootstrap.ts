import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
import './index.scss';

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
