import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/types/config';
import { EVENTS } from 'src/app/types/const';
import { Event } from 'src/app/types/event';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.scss'],
})
export class AllEventsComponent implements OnInit {
  public options: Config = { multi: false };
  public config!: Config;
  public events: Event[] = EVENTS;

  public ngOnInit(): void {
    this.config = this.mergeConfig(this.options);
  }

  public mergeConfig(options: Config) {
    const config = {
      multi: true,
    };

    return { ...config, ...options };
  }

  public toggle(index: number): void {
    if (!this.config.multi) {
      this.events
        .filter((event, i) => i !== index && event.active)
        .forEach((event) => (event.active = !event.active));
    }

    this.events[index].active = !this.events[index].active;
  }
}
