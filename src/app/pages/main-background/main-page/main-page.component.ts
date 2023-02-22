import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { PopUpComponent } from './pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { SubscribeService } from '../../../services/subscribe.service';
import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [
    trigger('routeAnimations', [
      state('enter', style({ height: '*', width: '*' })),
      transition('* => enter', [
        query('.logo', [
          style({
            opacity: 0,
            transform: 'translateY(-100px)',
          }),
          stagger(-50, [
            animate('400ms', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ]),
        query('.text', [
          style({
            opacity: 0,
            transform: 'translateY(-100px)',
          }),
          stagger(-50, [
            animate('600ms', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ]),
        query('.counter', [
          style({
            opacity: 0,
            transform: 'translateY(-100px)',
          }),
          stagger(-50, [
            animate('800ms', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ]),
        query('.event', [
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
export class MainPageComponent implements OnInit {
  public animate = false;
  public state = '';
  public finalDate: number = new Date(2023, 4, 31).getTime();
  public countDownDate!: string;
  public listNameOfCounter: string[] = [];
  public subscribeForm!: UntypedFormGroup;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: UntypedFormBuilder,
    private subscribeService: SubscribeService,
    public dialog: MatDialog,
    private router: Router
  ) {
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

  get email(): AbstractControl<any, any> | null {
    return this.subscribeForm.get('email');
  }

  public clearInput(): void {
    if (this.email) {
      this.email.reset();
    }
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this.animate = true;
    }, 2000);
    this.state = 'enter';
    this.subscribeForm = this.fb.group({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  public openAllEventsPage(): void {
    this.router.navigate(['/all-events']);
  }

  public async onSubmitted(): Promise<void> {
    if (this.subscribeForm.valid) {
      const { email } = this.subscribeForm.value;
      this.subscribeService.postEmail(email).subscribe({
        next: (data) => {
          this.dialog.open(PopUpComponent, {
            data: {
              isSuccess: true,
              isError: false,
            },
          });
          this.clearInput();
        },
        error: (error) => {
          console.warn(error.responseText);
          console.log({ error });
          this.dialog.open(PopUpComponent, {
            data: {
              isSuccess: false,
              isError: true,
            },
          });
          this.clearInput();
        },
      });
    }
  }
}
