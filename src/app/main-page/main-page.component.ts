import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public finalDate: number = new Date(2023, 4, 31).getTime();
  public countDownDate!: string;
  public listNameOfCounter: string[] = [];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.listNameOfCounter = ['DD', 'HH', 'MM', 'SS'];
        } else {
          this.listNameOfCounter = ['Days', 'Hours', 'Minutes', 'Seconds'];
        }
      });
  }

  dateInterval = setInterval(() => {
    const now: number = new Date().getTime();
    const diff: number = this.finalDate - now;
    const days: number = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours: number | string = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes: number | string = Math.floor(
      (diff % (1000 * 60 * 60)) / (1000 * 60)
    );
    let sec: number | string = Math.floor((diff % (1000 * 60)) / 1000);

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (sec < 10) {
      sec = '0' + sec;
    }

    this.countDownDate = days + ' : ' + hours + ' : ' + minutes + ' : ' + sec;

    if (diff < 0) {
      clearInterval(this.dateInterval);
      this.countDownDate = 'Expired';
    }
  });

  public ngOnInit(): void {}
}
