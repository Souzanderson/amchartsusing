import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {

  constructor() { }
  values = {
    "sitatual": {
      "ca1": 100,
      "k1": 4.423963133640553,
      "mg1": 60.12903225806452,
      "p1": 100
    },
    "deficit": {
      "ca1": 0,
      "k1": 95.57603686635944,
      "mg1": 39.87096774193548,
      "p1": 0
    },
  }
  legends = ["Cálcio", "Potássio", "Magnésio", "Fósforo"]
  ngOnInit() {
    let data = []
    let i = 0
    for (let k in this.values.deficit) {
      data.push({
        "label": this.legends[i],
        "sitatual": this.values.sitatual[k],
        "deficit": this.values.deficit[k]
      })
      i++
    }
    console.log(data);


    let chart = am4core.create("chartdiv", am4charts.XYChart3D);
    chart.data = data

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "label";
    categoryAxis.renderer.grid.template.opacity = 0;
    categoryAxis.renderer.grid.template.location = 25;
    categoryAxis.renderer.minGridDistance = 100;
    categoryAxis.renderer.inside = false;
    categoryAxis.renderer.padding(12, 45, 12, 12)

    chart.exporting.menu = new am4core.ExportMenu();
    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.grid.template.opacity = 0;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
    valueAxis.renderer.ticks.template.length = 20;
    valueAxis.renderer.line.strokeOpacity = 0.5;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.labels.template.disabled = false;
    valueAxis.renderer.minGridDistance = 25;
    valueAxis.renderer.inside = false;

    this.createSeries(chart, "sitatual", "Sit. Atual");
    this.createSeries(chart, "deficit", "Déficit");
  }

  createSeries(chart, field, name) {
    let series = chart.series.push(new am4charts.ConeSeries());
    series.dataFields.valueX = field;
    series.dataFields.categoryY = "label";
    series.sequencedInterpolation = true;
    series.stacked = true;
    series.name = name;

    series.columns.template.width = am4core.percent(60);
    series.columns.template.tooltipText = `[bold]{name}[/bold]\n[font-size:14px]{label}: {${field}}`;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.locationX = 0.5;
    // labelBullet.label.text = "{valueX}";
    labelBullet.label.fill = am4core.color("#fff");
  }


}
