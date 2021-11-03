import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule, NbLayoutModule, NbOptionModule, NbSelectModule, NbThemeModule } from '@nebular/theme';

import { AppComponent } from './app.component';
import { InstanceSelectorComponent } from './components/instance-selector/instance-selector.component';


// this will enable the default theme, you can change this by passing `{ name: 'dark' }` to enable the dark theme
// NbThemeModule.forRoot(),

@NgModule({
  declarations: [
    AppComponent,
    InstanceSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // this will enable the default theme, you can change this by passing `{ name: 'dark' }` to enable the dark theme
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule, NbCardModule, NbInputModule, NbSelectModule, NbOptionModule, NbButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
