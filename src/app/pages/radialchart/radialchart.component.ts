import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-radialchart',
  templateUrl: './radialchart.component.html',
  styleUrls: ['./radialchart.component.scss']
})
export class RadialchartComponent implements OnInit {

  values = {
    "atual": {
      "ca1": 133.20000000000002,
      "k1": 102.12000000000002,
      "mg1": 118.54800000000002,
      "p1": 11.444664,
      "s1": 4
    },
    "ideal": {
      "ca1": 84.96,
      "k1": 238.518,
      "mg1": 32.762,
      "p1": 32.362100000000005,
      "s1": 20.314200000000003
    },
  }

  legends = ["Cálcio", "Potássio", "Magnésio", "Fósforo", "Enxofre"]

  constructor() { }

  ngOnInit(): void {
    let data = []
    let i = 0
    for (let k in this.values.atual) {
      data.push({
        "label": this.legends[i],
        "atual": this.values.atual[k],
        "ideal": this.values.ideal[k]
      })
      i++
    }
    this.initChart1(data)
    this.initChart2(data)
  }

  initChart1(data) {
    let chart = am4core.create("chartdiv1", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.legend = new am4charts.Legend();

    chart.data = data

    chart.innerRadius = 100;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "atual";
    series.dataFields.category = "label";
  }

  initChart2(data) {
    let chart = am4core.create("chartdiv2", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.legend = new am4charts.Legend();

    chart.data = data

    chart.innerRadius = 100;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "ideal";
    series.dataFields.category = "label";
  }

}
