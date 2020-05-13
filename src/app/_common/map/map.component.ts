import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, FeatureGroup, featureGroup, DrawEvents, Map } from 'leaflet';
import * as L from 'leaflet';
import { from } from 'rxjs';
import { AlertifyService } from 'src/app/_services/alertify.service';
declare var GeoRaster: any;
declare var GeoRasterLayer: any;

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	@Input() geometriasFixas: GeoJSON.Geometry[];
	@Input() geometriasCadastradas: GeoJSON.Geometry[];
	@Input() ferramentas: any = {
		draw: {}
	};
	@Output() geometriasDesenhadas = new EventEmitter<GeoJSON.Geometry[]>();
	@Output() featuresDesenhadas = new EventEmitter<GeoJSON.FeatureCollection>();
	map: any;
	geometries: any = [];
	drawnItems: FeatureGroup = featureGroup();
	fixItems: FeatureGroup = featureGroup();
	// imgUrl = 'https://fazendas.s3.us-east-2.amazonaws.com/aeroporto_23KNS_2020-03-12_0_ndvi.tif';
	imgUrl = 'http://localhost/SInterface/Arquivos/img.png';
	bound: any;

	options = {
		layers: [
			tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 17, attribution: 'Open Street Map' }),
			// tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
		],
		zoom: 17,
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

	constructor(private alertify: AlertifyService) { }

	ngOnInit() {
		if (this.geometriasFixas && this.geometriasFixas.length > 0) {
			this.geometriasFixas.forEach(g => {
				if (!g) {
					return;
				}
				const layer = this.montarLayer(g);
				this.fixItems.addLayer(layer);
				this.bound = layer.getBounds();
				const center = layer.getBounds().getCenter();
				this.options.center = center;
			});
		}

		if (this.geometriasCadastradas && this.geometriasCadastradas.length > 0) {
			this.geometriasCadastradas.forEach(g => {
				if (!g) {
					return;
				}
				const layer = this.montarLayer(g);
				this.drawnItems.addLayer(layer);
				this.bound = layer.getBounds();
				const center = layer.getBounds().getCenter();
				this.options.center = center;
			});
		}

		if (this.ferramentas) {
			this.drawOptions.draw.marker = this.ferramentas.marker;
			if (this.ferramentas.polygon) {
				this.drawOptions.draw.polygon = { shapeOptions: this.ferramentas.estiloDesenho };
			}

			if (this.ferramentas.marker) {
				this.drawOptions.draw.marker = {
					icon: L.icon({
						iconSize: [ 25, 41 ],
						iconAnchor: [ 13, 41 ],
						iconUrl: 'assets/marker-icon.png',
						iconRetinaUrl: '680f69f3c2e6b90c1812a813edf67fd7.png',
						shadowUrl: 'assets/marker-shadow.png'
					})
				};
			}
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
		this.map = map;
		// L.imageOverlay(this.imgUrl, this.bound).addTo(map);
		// fetch(this.imgUrl)
		// 	.then(response => response.arrayBuffer())
		// 	.then(arrayBuffer => {
		// 		GeoRaster(arrayBuffer).then(georaster => {
		// 			// let x = new GeoRasterLayer({ georaster: georaster });
		// 			// x.addTo(map);
		// 			// map.fitBounds(x.getBounds());
		// 		})
		// 	});

	}

	public onDrawCreated(e: DrawEvents.Created) {
		let geojson = (this.drawnItems.toGeoJSON() as GeoJSON.FeatureCollection);
		if (this.ferramentas.quantidadeGeometrias > 0 && geojson.features.length >= this.ferramentas.quantidadeGeometrias) {
			this.alertify.error('Quantidade máxima de geometrias atingida!');
			return;
		}
		const geo = e.layer.toGeoJSON().geometry;
		const layer = this.montarLayer(geo);
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

	private montarLayer(g: GeoJSON.Geometry) {
		let layer; 
		switch (g.type) {
			case 'Polygon':
				layer = new L.Polygon((g as GeoJSON.Polygon).coordinates[0].map(z => new L.LatLng(z[1], z[0])));
				break;
			case 'Point':
				const geo = g as GeoJSON.Point;
				const x = geo.coordinates[0];
				const y = geo.coordinates[1];
				const latLng = new L.LatLng(y, x);
				layer = new L.Marker(latLng, this.drawOptions.draw.marker);
				layer._latlng = new L.LatLng(y, x);
				break;
		
			default:
				break;
		}
		if (g.type != 'Point') {
			let style = (g as any).style;
			if(!style){
				style = this.ferramentas.estiloDesenho;
			}
			layer.setStyle(style);
		}
		return layer;
	}

	public onDeleted(e: DrawEvents.Deleted) {
		e.layers.eachLayer(layer => {
			layer.remove();
		});
	}

	public onTest(e) {
		console.log(e);
	}

}
