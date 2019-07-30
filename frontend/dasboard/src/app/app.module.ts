import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgentsComponent } from './components/agents/agents.component';
import { CallsComponent } from './components/calls/calls.component';
import { CallsSortPipe } from './components/calls/calls-sort.pipe';
import { GridComponent } from './components/grid/grid.component';
import { GridCellComponent } from './components/grid-cell/grid-cell.component';
import { DraggerDirective } from './directives/dragger/dragger.directive';

@NgModule({
  declarations: [
    AppComponent,
    AgentsComponent,
    CallsComponent,
    CallsSortPipe,
    GridComponent,
    GridCellComponent,
    DraggerDirective,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
