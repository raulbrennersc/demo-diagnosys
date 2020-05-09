import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, FeatureGroup, featureGroup, DrawEvents, Map } from 'leaflet';
import * as L from 'leaflet';
import { from } from 'rxjs';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	@Input() geometriasFixas: GeoJSON.Geometry[];
	@Input() geometriasCadastradas: GeoJSON.Geometry[];
	@Input() ferramentas: any;
	@Output() geometriasDesenhadas = new EventEmitter<GeoJSON.Geometry[]>();
	@Output() featuresDesenhadas = new EventEmitter<GeoJSON.FeatureCollection<GeoJSON.Geometry>>();

	geometries: any = [];
	drawnItems: FeatureGroup = featureGroup();

	options = {
		layers: [
			tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18, attribution: 'Open Street Map' }),
			//   tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map'})
		],
		zoom: 10,
		center: latLng({ lat: -21.228959, lng: -45.003086 })
	};

	drawOptions: any = {
		position: 'topright',
		draw: {
			polyline: false,
			rectangle: false,
			circle: false,
			marker: false,
			circlemarker: false,
			polygon: false,
			// marker: {
			// 	icon: L.icon({
			// 		iconSize: [ 25, 41 ],
			// 		iconAnchor: [ 13, 41 ],
			// 		iconUrl: 'assets/marker-icon.png',
			// 		iconRetinaUrl: '680f69f3c2e6b90c1812a813edf67fd7.png',
			// 		shadowUrl: 'assets/marker-shadow.png'
			// 	})
			// }
		},
		edit: {
			featureGroup: this.drawnItems,
			edit: {},
			remove: {}
		}
	};

	drawLocal: any = {
		draw: {
			toolbar: {
				buttons: {
					polygon: 'Draw an awesome polygon!'
				}
			}
		}
	};

	ngOnInit() {
		if (this.geometriasFixas && this.geometriasFixas.length > 0) {
			this.geometriasFixas.forEach(g => {
				if (!g) {
					return;
				}
				const layer = L.geoJSON(g);
				this.drawnItems.addLayer(layer);
				const center = layer.getBounds().getCenter();
				this.options.center = center;
			});
		}


		if (this.geometriasCadastradas && this.geometriasCadastradas.length > 0) {
			this.geometriasCadastradas.forEach(g => {
				if (!g) {
					return;
				}
				const layer = L.geoJSON(g);
				this.drawnItems.addLayer(layer);
				const center = layer.getBounds().getCenter();
				this.options.center = center;
			});
		}

		if (this.ferramentas) {
			this.drawOptions.draw.marker = this.ferramentas.marker;
			this.drawOptions.draw.polygon = this.ferramentas.polygon;
			this.drawOptions.draw.polyline = this.ferramentas.polyline;
			this.drawOptions.draw.rectangle = this.ferramentas.rectangle;
			this.drawOptions.draw.circle = this.ferramentas.circle;
			this.drawOptions.draw.circlemarker = this.ferramentas.circlemarker;
			this.drawOptions.edit.edit = this.ferramentas.edit || false;
			this.drawOptions.edit.remove = this.ferramentas.remove || false;
		}
		else {
			this.drawOptions.edit.edit = false;
			this.drawOptions.edit.remove = false;
		}
	}

	public onMapReady(map: Map) {

	}

	public onDrawCreated(e: any) {
		let geojson = (this.drawnItems.toGeoJSON() as GeoJSON.FeatureCollection);
		if (geojson.features.length == 2) {
			alert('ja tem geometria');
			return;
		}

		const layer = (e as DrawEvents.Created).layer;
		this.drawnItems.addLayer(layer);

		geojson = (this.drawnItems.toGeoJSON() as GeoJSON.FeatureCollection);

		var geometries = new Array<GeoJSON.Geometry>();
		geojson.features.forEach(f => {
			geometries.push(f.geometry)
		});

		this.geometriasDesenhadas.emit(geometries);
		this.featuresDesenhadas.emit(geojson);
	}

	public onDrawStart(e: any) {

	}

}
