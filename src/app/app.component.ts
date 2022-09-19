import { Component } from '@angular/core';
import { Buffer }  from 'buffer';

declare const window: any;
window.Buffer = Buffer;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
}
