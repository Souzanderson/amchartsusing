import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarchartComponent } from './pages/barchart/barchart.component';
import { CompradialchartComponent } from './pages/compradialchart/compradialchart.component';
import { LinechartComponent } from './pages/linechart/linechart.component';
import { RadialchartComponent } from './pages/radialchart/radialchart.component';
import { SliceradialchartComponent } from './pages/sliceradialchart/sliceradialchart.component';


const routes: Routes = [
  {path: "", component: BarchartComponent},
  {path: "barchart", component: BarchartComponent},
  {path: "linechart", component: LinechartComponent},
  {path: "radialchart", component: RadialchartComponent},
  {path: "compradialchart", component: CompradialchartComponent},
  {path: "sliceradialchart", component: SliceradialchartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
