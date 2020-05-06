import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, FeatureGroup, featureGroup, DrawEvents, Map} from 'leaflet';
import * as L from 'leaflet';
import { from } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent{
	@Input() geometriaCadastrada: GeoJSON.Polygon;
	@Output() geometriaDesenhada = new EventEmitter<GeoJSON.Polygon>();

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

	drawOptions = {
		position: 'topright',
		draw: {
			polyline: false,
			rectangle: false,
			circle: false,
			marker: false,
			circlemarker: false,
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
			featureGroup: this.drawnItems
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

	onMapReady(map: Map) {
		this.drawnItems.addLayer(L.geoJSON(this.geometriaCadastrada))
	}

	public onDrawCreated(e: any) {
		let geojson = (this.drawnItems.toGeoJSON() as GeoJSON.FeatureCollection);
		if(geojson.features.length == 1){
			alert('ja tem geometria');
			return;
		}



		const layer = (e as DrawEvents.Created).layer;
		this.drawnItems.addLayer(layer);
		geojson = (this.drawnItems.toGeoJSON() as GeoJSON.FeatureCollection);

		this.geometriaDesenhada.emit(geojson.features[0].geometry as GeoJSON.Polygon)
	}

	public onDrawStart(e: any) {

	}

}
