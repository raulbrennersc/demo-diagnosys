import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, FeatureGroup, featureGroup, DrawEvents } from 'leaflet'
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent{drawnItems: FeatureGroup = featureGroup();
	options = {
		layers: [
      tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18, attribution: 'Open Street Map' }),
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map'})
		],
		zoom: 10,
		center: latLng({ lat: -21.228959, lng: -45.003086 })
	};

	drawOptions = {
		position: 'topright',
		draw: {
			marker: {
				icon: L.icon({
					iconSize: [ 25, 41 ],
					iconAnchor: [ 13, 41 ],
					iconUrl: '2b3e1faf89f94a4835397e7a43b4f77d.png',
					iconRetinaUrl: '680f69f3c2e6b90c1812a813edf67fd7.png',
					shadowUrl: 'a0c6cc1401c107b501efee6477816891.png'
				})
			}
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

	public onDrawCreated(e: any) {
		// tslint:disable-next-line:no-console
		console.log('Draw Created Event!');

		const layer = (e as DrawEvents.Created).layer;
		this.drawnItems.addLayer(layer);
	}

	public onDrawStart(e: any) {
		// tslint:disable-next-line:no-console
		console.log('Draw Started Event!');
	}

}
