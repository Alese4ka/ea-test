import {
  trigger,
  state,
  style,
  transition,
  query,
  stagger,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('backgroundAnimations', [
      state('enter', style({ height: '*', width: '*' })),
      transition('* => enter', [
        query('.appear', [
          style({
            opacity: 0,
            transform: 'translateY(-100px)',
          }),
          stagger(-50, [
            animate(
              '1000ms',
              style({ opacity: 1, transform: 'translateY(0)' })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  public title: string = 'ea-test';
  public state: string = '';

  public ngOnInit(): void {
    this.state = 'enter';
  }
}
