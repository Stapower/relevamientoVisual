import { element } from 'protractor';
/*app.component.ts*/
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
//var CanvasJS = require('./canvasjs.min');
//const path = require('path');
import { Subject } from 'rxjs';
import { totalmem } from 'os';
import { FirebaseAuth } from './../../../class/firebase-auth';

import { ClientRequest } from 'http';
import { IfStmt } from '@angular/compiler';
import * as XLSX from 'xlsx';


@Component({
	selector: 'app-grafico',
	templateUrl: './grafico.component.html',
	styleUrls: ['./grafico.component.scss'],
})
export class GraficoComponent implements OnInit {

	constructor(private databaseConnection: FirebaseAuth) { }
	@Input() usuario;
	displayedColumns = ['position', 'name', 'weight', 'symbol'];
	filterStartDate;
	filterEndDate;
	encuestaSelected;

	columns = [];
	rows = [];
	encuesta = false;

	showGraphic(value) {
		this.columns.length = 0;
		this.rows.length = 0;
		this.urlFoto.length = 0;
		this.fotoUrl.length = 0;
		this.startSpinner = null;

		console.info("SHOW - ", value);

		switch (value) {
			case "fotosLindas":
				
				var obj = new Array();
				this.databaseConnection.bringEntityWithEventEmmiter(this.databaseConnection.image, obj).then(result => {
					console.log("Todas las fotos", result);
					var array = [];

					/*arrayCliente.push({
					  "y": ((value/total) * 100).toFixed(2),
					  "label": key + " "+((value/total) * 100).toFixed(2) + "%"
					});*/
					var totalVotes = 0;
					result.forEach(foto => {
						if (foto.type == "cosasLindas")
							totalVotes += foto.voto.length;
					});

					console.log(totalVotes);
					result.forEach(foto => {
						if (foto.type == "cosasLindas") {
							console.log("likes ", foto.voto.length);
							var percentage = ((foto.voto.length / totalVotes) * 100).toFixed(2);
							console.log(percentage);


							array.push({
								"y": percentage,
								"label": foto.id
							});
						}
					});

					this.generatePieChart("Fotos lindas me gusteadas", array, this.urlFoto);
				});

				break;

			case "fotosFeas":
				var obj = new Array();
				this.databaseConnection.bringEntityWithEventEmmiter(this.databaseConnection.image, obj).then(result => {
					console.log("Todas las fotos", result);
					var array = [];

					/*arrayCliente.push({
					  "y": ((value/total) * 100).toFixed(2),
					  "label": key + " "+((value/total) * 100).toFixed(2) + "%"
					});*/
					var totalVotes = 0;
					result.forEach(foto => {
						if (foto.type == "cosasFeas")
							totalVotes += foto.voto.length;
					});

					console.log(totalVotes);
					result.forEach(foto => {
						if (foto.type == "cosasFeas") {
							console.log("likes ", foto.voto.length);
							var percentage = ((foto.voto.length / totalVotes) * 100).toFixed(2);
							console.log(percentage);


							array.push({
								"y": foto.voto.length,
								"label": foto.id
							});
						}
					});

					this.generateChart("Fotos Feas me gusteadas", array, this.urlFoto);
				});

				break;
		}

	}

	generateChart(nombre, array, unArray) {
		let chart = new CanvasJS.Chart("chartContainer", {
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: nombre
			},
			data: [{
				type: "column",
				dataPoints: array,
				click: function (e) {
					console.log(e.dataPoint.label);
					unArray.length = 0;
					var id = e.dataPoint.label;
					unArray.push(id);
					console.log(unArray);
				},
				backgroundColor: "#5b39f17a"
			}]
		});

		chart.render();
	}

	generatePieChart(nombre, array, unArray) {
		let chart = new CanvasJS.Chart("chartContainer", {
			theme: "light2", // "light1", "light2", "dark1", "dark2"
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: nombre
			},
			data: [{
				type: "pie",
				dataPoints: array,
				click: function (e) {
					console.log(e.dataPoint.label);
					unArray.length = 0;
					var id = e.dataPoint.label;
					unArray.push(id);
					console.log(unArray);
				},
				backgroundColor: "#5b39f17a"
			}]
		});

	chart.render();
	}

	urlFoto = new Array();
	fotoUrl = new Array();

	startSpinner;
	clickedOnChart(event){
		console.log(event);
		var obj = new Array();
		this.startSpinner = true;
		if(this.urlFoto[0] != null && this.urlFoto[0] !== undefined)
			this.databaseConnection.bringEntityWithFilterString2(this.databaseConnection.image, this.fotoUrl, this.urlFoto[0]);
		else
		this.startSpinner = false;
	}



ngOnInit() {
	this.showGraphic("fotosLindas");
	/*let chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Seleccione un filtro"
		},
		data: [{
			type: "column",
			dataPoints: [
				/*{ y: 71, label: "Apple" },
				{ y: 55, label: "Mango" },
				{ y: 50, label: "Orange" },
				{ y: 65, label: "Banana" },
				{ y: 95, label: "Pineapple" },
				{ y: 68, label: "Pears" },
				{ y: 28, label: "Grapes" },
				{ y: 34, label: "Lychee" },
				{ y: 14, label: "Jackfruit" }
			]
		}]
	});

	chart.render();*/
}

/*exportToExcel() {
	const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
	const wb: XLSX.WorkBook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

	/* save to file */
	/*XLSX.writeFile(wb, 'SheetJS.xlsx');
}*/
}
