import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";


am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dataviz);


@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {

  value = {
    "atual": {
      "0": 14.671223982040715,
      "30": 203.64889174123172,
      "60": 1645.8063620097835,
      "90": 2576.236537578254,
      "120": 8575.621055504269
    },
    "ideal": {
      "0": 50,
      "30": 644,
      "60": 5198,
      "90": 10887,
      "120": 14473
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.create()
  }

  create() {
    let chart = am4core.create("chartdiv", am4charts.XYChart3D);

    let data = [];
    // let value = 50;
    // for (var i = 0; i < 300; i++) {
    //   let date = new Date();
    //   date.setHours(0, 0, 0, 0);
    //   date.setDate(i);
    //   value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    //   data.push({ date: date, value: value });
    // }

    for (let k in this.value.atual) {
      data.push({ x: k, y1: this.value.atual[k], y2: this.value.ideal[k] })
    }

    chart.data = data;

    // Create axes
    let xAxis = chart.xAxes.push(new am4charts.ValueAxis());
    xAxis.renderer.minGridDistance = 30;

    // Create value axis
    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series1 = chart.series.push(new am4charts.LineSeries());
    series1.name = "Ideal";
    series1.dataFields.valueX = "x";
    series1.dataFields.valueY = "y2";

    series1.strokeWidth = 2;
    series1.fillOpacity = 0.6;
    series1.stacked = true;

    let bullet1 = series1.bullets.push(new am4charts.CircleBullet());
    series1.heatRules.push({
      target: bullet1.circle,
      min: 1,
      max: 1,
      property: "radius"
    });

    bullet1.tooltipText = "Índice: {valueX} => {valueY}";

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = "Atual";
    series2.dataFields.valueX = "x";
    series2.dataFields.valueY = "y1";
    series2.strokeWidth = 2;
    series2.fillOpacity = 0.6;
    series2.stacked = true;

    let bullet2 = series2.bullets.push(new am4charts.CircleBullet());
    series2.heatRules.push({
      target: bullet2.circle,
      min: 1,
      max: 1,
      property: "radius"
    });

    bullet2.tooltipText = "Índice: {valueX} => {valueY}";

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = series1.xAxis;

    //scrollbars
    chart.scrollbarY = new am4core.Scrollbar();
  }

}
