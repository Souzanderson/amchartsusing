import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinechartComponent } from './pages/linechart/linechart.component';
import { BarchartComponent } from './pages/barchart/barchart.component';
import { RadialchartComponent } from './pages/radialchart/radialchart.component';
import { CompradialchartComponent } from './pages/compradialchart/compradialchart.component';
import { SliceradialchartComponent } from './pages/sliceradialchart/sliceradialchart.component';

@NgModule({
  declarations: [
    AppComponent,
    LinechartComponent,
    BarchartComponent,
    RadialchartComponent,
    CompradialchartComponent,
    SliceradialchartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
