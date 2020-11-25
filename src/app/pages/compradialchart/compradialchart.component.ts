import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);

@Component({
  selector: 'app-compradialchart',
  templateUrl: './compradialchart.component.html',
  styleUrls: ['./compradialchart.component.scss']
})
export class CompradialchartComponent implements OnInit {
  macro = {
    "deficit": {
      "ca1": 0,
      "k1": 57.185621210977786,
      "mg1": 0,
      "p1": 64.63559534146425,
      "s1": 80.30934026444557
    },
    "sitatual": {
      "ca1": 100,
      "k1": 42.814378789022214,
      "mg1": 100,
      "p1": 35.36440465853575,
      "s1": 19.690659735554437
    }
  }

  micro = {
    "deficit": {
      "b1": 30.554174913317183,
      "cu1": 94.4974760450987,
      "fe1": 0,
      "mn1": 0,
      "zn1": 93.26197578522547
    },
    "sitatual": {
      "b1": 69.44582508668282,
      "cu1": 5.502523954901311,
      "fe1": 100,
      "mn1": 100,
      "zn1": 6.738024214774524
    }
  }

  legends1 = ["Cálcio", "Potássio", "Magnésio", "Fósforo", "Enxofre"]
  legends2 = ["Boro", "Cobre", "Ferro", "Manganês", "Zinco"]


  constructor() { }

  ngOnInit(): void {
    let data1 = []
    let data2 = []
    let i = 0
    for (let k in this.macro.deficit) {
      data1.push({
        "label": this.legends1[i],
        "deficit": this.macro.deficit[k],
        "atual": this.macro.sitatual[k]
      })
      i++
    }
    i=0
    for (let k in this.micro.deficit) {
      data2.push({
        "label": this.legends2[i],
        "deficit": this.micro.deficit[k],
        "atual": this.micro.sitatual[k]
      })
      i++
    }
    this.initChart(data1,"chartdiv1")
    this.initChart(data2,"chartdiv2")
    // this.initChart2(data2)
  }

  initChart(data, id) {
    // Create chart instance
    let chart = am4core.create(id, am4charts.PieChart);

    // Let's cut a hole in our Pie chart the size of 40% the radius
    chart.innerRadius = am4core.percent(40);

    // Add data
    chart.data = data
    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "atual";
    pieSeries.dataFields.category = "label";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // Disabling labels and ticks on inner circle
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    pieSeries.slices.template.tooltipText = `[bold]{category}[/bold]\n Atual: {value}`;

    // Disable sliding out of slices
    pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
    pieSeries.slices.template.states.getKey("hover").properties.scale = 0.9;

    // Add second series
    let pieSeries2 = chart.series.push(new am4charts.PieSeries());
    pieSeries2.dataFields.value = "deficit";
    pieSeries2.dataFields.category = "label";
    pieSeries2.slices.template.stroke = am4core.color("#fff");
    pieSeries2.slices.template.strokeWidth = 2;
    pieSeries2.slices.template.strokeOpacity = 1;
    pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
    pieSeries2.slices.template.states.getKey("hover").properties.scale = 1.1;
    pieSeries2.slices.template.tooltipText = `[bold]{category}[/bold]\n Déficit: {value}`;

  }

}
