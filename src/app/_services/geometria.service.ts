import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeometriaService {

  constructor() { }

  public corFazenda = '#a9cf74';
  public corLavoura = '#f5a142';
  public corTalhao = 'lightblue';

  public montarGeometriaFazenda(geometria: any): GeoJSON.Geometry {
    geometria.style = { color: '#a9cf74' };
    return geometria as GeoJSON.Geometry;
  }

  public montarGeometriaLavoura(geometria: any): GeoJSON.Geometry {
    geometria.style = { color: '#f5a142' };
    return geometria as GeoJSON.Geometry;
  }

  public montarGeometriaTalhao(geometria: any): GeoJSON.Geometry {
    geometria.style = { color: 'lightblue' };
    return geometria as GeoJSON.Geometry;
  }
}
