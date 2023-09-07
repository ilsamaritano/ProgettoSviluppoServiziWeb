import 'zone.js/dist/zone';
import { bootstrapApplication } from '@angular/platform-browser';
import { RootComponent } from './root/root.component';

bootstrapApplication(RootComponent).catch((err) => console.error(err));
