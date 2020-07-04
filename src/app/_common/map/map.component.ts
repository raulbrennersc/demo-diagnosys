import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, FeatureGroup, featureGroup, DrawEvents, Map } from 'leaflet';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
	@Input() geometriasFixas: GeoJSON.Geometry[];
	@Input() imgUrl: string;
	@Input() geometriasCadastradas: GeoJSON.Geometry[];
	@Input() ferramentas: any = {
		draw: {}
	};
	@Output() geometriasDesenhadas = new EventEmitter<GeoJSON.Geometry[]>();
	@Output() ultimoDesenho = new EventEmitter<GeoJSON.Geometry>();
	@Output() featuresDesenhadas = new EventEmitter<GeoJSON.FeatureCollection>();
	geometries: any = [];
	
	map: Map;
	drawnItems: FeatureGroup = featureGroup();
	fixItems: FeatureGroup = featureGroup();

	bound: any;

	options = {
		layers: [
			tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 17, attribution: 'Open Street Map' }),
			// tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
		],
		zoom: 17,
		center: latLng({ lat: -21.228959, lng: -45.003086 }),
		// scrollWheelZoom: false,
	};

	drawOptions: any = {
		position: 'topright',
		draw: {
			polyline: false,
			rectangle: false,
			circle: false,
			circlemarker: false,
			polygon: false,
			marker: false,
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

	constructor(private toastr: ToastrService) { }
	ngOnChanges(changes: SimpleChanges): void {
		if (changes.geometriasFixas && !changes.geometriasFixas.firstChange) {
			this.drawnItems.eachLayer(layer => {
				layer.remove();
			});
			this.fixItems.eachLayer(layer => {
				layer.remove();
			});
			this.insereGeometriasFixas();
		}
	}

	insereGeometriasFixas() {
		if (this.geometriasFixas && this.geometriasFixas.length > 0) {
			this.geometriasFixas.forEach(g => {
				const layer = this.montarLayer(g);
				this.fixItems.addLayer(layer);
				if (g.type != 'Point') {
					this.bound = layer.getBounds();
					const center = layer.getBounds().getCenter();
					this.options.center = center;
				}
			});
		}
	}

	ngOnInit() {
		this.insereGeometriasFixas();

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
						iconSize: [25, 41],
						iconAnchor: [13, 41],
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
		if(this.geometriasFixas.length > 0 && this.imgUrl){
			const bounds = this.montarLayer(this.geometriasFixas[0]).getBounds();
			L.imageOverlay(this.imgUrl, bounds).addTo(map);
		}
	}

	public onDrawCreated(e: DrawEvents.Created) {
		let geojson = (this.drawnItems.toGeoJSON() as GeoJSON.FeatureCollection);
		if (this.ferramentas.quantidadeGeometrias > 0 && geojson.features.length >= this.ferramentas.quantidadeGeometrias) {
			this.toastr.error('Quantidade máxima de geometrias atingida!');
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
		this.ultimoDesenho.emit(geo);
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
				layer = new L.Marker(latLng, {
					icon: L.icon({
						iconSize: [ 25, 41 ],
						iconAnchor: [ 13, 41 ],
						iconUrl: 'assets/marker-icon.png',
						iconRetinaUrl: '680f69f3c2e6b90c1812a813edf67fd7.png',
						shadowUrl: 'assets/marker-shadow.png'
					})
				});
				layer._latlng = new L.LatLng(y, x);
				break;

			default:
				break;
		}
		if (g.type != 'Point') {
			let style = (g as any).style;
			if (!style) {
				style = this.ferramentas.estiloDesenho;
			}
			style = { ...style, fillColor: 'transparent'}
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
