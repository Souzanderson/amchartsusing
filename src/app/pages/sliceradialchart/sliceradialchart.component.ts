import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-sliceradialchart',
  templateUrl: './sliceradialchart.component.html',
  styleUrls: ['./sliceradialchart.component.scss']
})
export class SliceradialchartComponent implements OnInit {
  values = {
    "deficit": {
      "ca1": 0,
      "k1": 95.57603686635944,
      "mg1": 39.87096774193548,
      "p1": 50
    },
    "sitatual": {
      "ca1": 100,
      "k1": 4.423963133640553,
      "mg1": 60.12903225806452,
      "p1": 50
    }
  }
  legends = ["Cálcio", "Potássio", "Magnésio", "Fósforo"]

  constructor() { }

  ngOnInit(): void {
    let data = {}
    for (let k in this.values.deficit) {
      data[k] = [
        { "category": "Déficit", "value": this.values.deficit[k], "full": 100 },
        { "category": "Sit. Atual", "value": this.values.sitatual[k], "full": 100 },
      ]
    }
    console.log(data);
    let i = 0

    for (let k in data) {
      this.initGraph(data, k, this.legends[i])
      i++
    }
  }

  initGraph(data, key,label) {
    let dv = document.createElement('div')
    let el = document.createElement('div')
    dv.innerHTML=`<h3>${label}</h3>`
    el.className = "minig"
    el.id = key
    dv.appendChild(el)
    document.getElementById('chartdiv3').appendChild(dv)

    // Create chart instance
    let chart = am4core.create(key, am4charts.RadarChart);

    // Add data
    chart.data = data[key]
    // [{
    //   "category": "Research",
    //   "value": 80,
    //   "full": 100
    // }, {
    //   "category": "Marketing",
    //   "value": 35,
    //   "full": 100
    // }
    //   // , {
    //   //   "category": "Distribution",
    //   //   "value": 92,
    //   //   "full": 100
    //   // }, {
    //   //   "category": "Human Resources",
    //   //   "value": 68,
    //   //   "full": 100
    //   // }
    // ];

    // Make chart not full circle
    chart.startAngle = -90;
    chart.endAngle = 180;
    chart.innerRadius = am4core.percent(50);

    // Set number format
    chart.numberFormatter.numberFormat = "#.#'%'";

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis<am4charts.AxisRendererRadial>());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
      return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
    });
    categoryAxis.renderer.minGridDistance = 10;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;

    // Create series
    let series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueX = "full";
    series1.dataFields.categoryY = "category";
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    series1.columns.template.fillOpacity = 0.08;
    // series1.columns.template.cornerRadiusTopLeft = 20;
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 20;

    let series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = "value";
    series2.dataFields.categoryY = "category";
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
    series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
    series2.columns.template.radarColumn.cornerRadius = 20;

    series2.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Add cursor
    chart.cursor = new am4charts.RadarCursor();
  }

}
