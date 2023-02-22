import {
  trigger,
  state,
  style,
  transition,
  query,
  stagger,
  animate,
} from '@angular/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from 'src/app/types/config';
import { EVENTS } from 'src/app/types/const';
import { Event } from 'src/app/types/event';
import * as $ from 'jquery';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.scss'],
  animations: [
    trigger('allEventsAnimations', [
      state('enter', style({ height: '*', width: '*' })),
      transition('* => enter', [
        query('.text', [
          style({
            opacity: 0,
            transform: 'translateY(-100px)',
          }),
          stagger(-50, [
            animate(
              '400ms',
              style({ opacity: 0.39, transform: 'translateY(0)' })
            ),
          ]),
        ]),
        query('.slider', [
          style({
            opacity: 0,
            transform: 'translateY(100px)',
          }),
          stagger(-50, [
            animate('400ms', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class AllEventsComponent implements OnInit {
  @ViewChild('link') link!: HTMLElement;
  public options: Config = { multi: false };
  public config!: Config;
  public events: Event[] = EVENTS;
  public state = '';
  public animate: boolean = false;
  public tabletView: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.tabletView = true;
        } else {
          this.tabletView = false;
        }
      });
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this.animate = true;
    }, 800);
    this.state = 'enter';
    this.config = this.mergeConfig(this.options);

    $(function () {
      $('.hidden').hide();

      $('.accordion').on('click', '.accordion-trigger', function (e) {
        e.preventDefault();

        $('.accordion-content:visible').slideUp(300);
        $('.hidden:visible').slideUp(300);

        $(this).next('.accordion-content').not(':animated').slideToggle(300);
        $(this).next('.hidden').not(':animated').slideToggle(300);
      });
    });
  }

  public mergeConfig(options: Config) {
    const config = {
      multi: true,
    };

    return { ...config, ...options };
  }

  public toggle(
    index: number,
    active: boolean,
    $event: globalThis.Event
  ): void {
    if ($event && active) {
      $event.preventDefault();
      if (this.link) {
        this.openPage($event);
      }
    } else {
      if (!this.config.multi) {
        this.events
          .filter((event, i) => i !== index && event.active)
          .forEach((event) => (event.active = !event.active));
      }

      this.events[index].active = !this.events[index].active;
    }
  }

  public openPage($event: globalThis.Event) {
    if ($event) {
      $event.preventDefault();
      window.location.href = 'https://egorovagency.by/#main';
    }
  }
}
