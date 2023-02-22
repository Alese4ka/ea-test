import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllEventsComponent } from './pages/all-events/all-events.component';
import { MainBackgroundComponent } from './pages/main-background/main-background.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-page',
    pathMatch: 'full',
  },
  { path: 'main-page', component: MainBackgroundComponent },
  { path: 'all-events', component: AllEventsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
