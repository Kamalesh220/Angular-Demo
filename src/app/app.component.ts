import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger("FadeInOut_navBar", [
      state('void' , style({ opacity:0 })),
      transition('* <=> *', [ style({ opacity:0, transform : 'translateY(-10px)' }) , animate('300ms ease-in') ])
    ])
  ]
})
export class AppComponent {
  title = 'echartdemo';
}
