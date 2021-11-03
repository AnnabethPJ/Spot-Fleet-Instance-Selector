import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InstanceSelectorComponent } from './components/instance-selector/instance-selector.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'instances', component: InstanceSelectorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
