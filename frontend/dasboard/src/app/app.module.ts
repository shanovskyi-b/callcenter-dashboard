import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgentsComponent } from './components/agents/agents.component';
import { CallsComponent } from './components/calls/calls.component';
import { CallsSortPipe } from './components/calls/calls-sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AgentsComponent,
    CallsComponent,
    CallsSortPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
