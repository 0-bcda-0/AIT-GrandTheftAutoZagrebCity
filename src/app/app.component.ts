import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { OSM, Vector } from 'ol/source';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import VectorImageLayer from 'ol/layer/VectorImage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'GrandTheftAutoZagrebCity';

  map!: Map;

  ngOnInit() {
    this.initMap();

    this.map.on('click', function (evt) {
      var coordinate = evt.coordinate;
      console.log(coordinate);
    });

    this.initIcons();
  }

  initMap() {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'http://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
          }),
        }),
      ],
      target: 'map',
      view: new View({ 
        center: [1738687.3333925947, 5749030.256367761],
        zoom: 14.5,
        maxZoom: 15.5, 
        minZoom: 14.5,
        extent: [1762487.693591883, 5741008.714568317, 1796069.3338692044, 5763937.770888929]
      }),
    });
  }

  initIcons() {
    const iconStyle = function (feature: any) {
      const iconName = feature.get('icon');
      const iconNameString = iconName.toString();
      
      const styles = [
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: `assets/icons/${iconNameString}.png`,
            // src: `assets/icons/Mod garage.png`,
            scale: 1.8
          }),
        })
      ]
      return styles;
    };

    // const iconStyle = new Icon({
    //   src: '/assets/icons/home.png',
    // })

    const icons = new VectorImageLayer({
      source: new Vector({
        url: './assets/map.geojson',
        format: new GeoJSON()
      }),
      style: iconStyle // Change the type of iconStyle from `(feature: any) => Style[]` to `Style`
    });

    this.map.addLayer(icons);
  }

}
