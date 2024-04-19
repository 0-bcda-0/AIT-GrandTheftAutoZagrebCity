import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { Vector } from 'ol/source';
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
            // url: 'http://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
            //? Tutorial:
            //? https://gis.stackexchange.com/questions/170437/adding-styled-openlayers-google-map-in-qgis
            url: 'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i689434445!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy5lOmx8cC52Om9mZixzLmU6bC50fHAudjpvZmYscy5lOmwuaXxwLnY6b24scy50OjV8cy5lOmd8cC52Om9ufHAuYzojMzg2OTJkLHMudDo4MXxzLmU6Z3xwLnY6b258cC5jOiM5ODk4OTgscy50OjgxfHMuZTpnLnN8cC5jOiMwMDAwMDAscy50OjgyfHMuZTpnfHAudjpvbnxwLmM6IzM4NmMyOCxzLnQ6MnxzLmU6Zy5mfHAudjpvbnxwLmM6I2ZmZmZmZixzLnQ6Mzd8cy5lOmcuZnxwLmM6I2ZmZmZmZnxwLnY6b24scy50OjMzfHMuZTpnLmZ8cC5jOiNmZmZmZmZ8cC52Om9uLHMudDozNHxzLmU6Zy5mfHAuYzojZmZmZmZmfHAudjpvbixzLnQ6MzZ8cy5lOmd8cC5jOiNmY2ZjZmN8cC52Om9uLHMudDozNnxzLmU6bHxwLnY6b2ZmLHMudDo0MHxzLmU6Zy5mfHAuYzojNzg4YzQwfHAudjpvbixzLnQ6Mzh8cy5lOmd8cC5pbDp0cnVlfHAudjpvbixzLnQ6MzV8cy5lOmcuZnxwLmM6I2ZmZmZmZnxwLnY6b24scy50OjM5fHMuZTpnfHAuYzojZmZmZmZmLHMudDo0OXxzLmU6Z3xwLmM6IzAwMDAwMCxzLnQ6NDl8cy5lOmx8cC52Om9mZixzLnQ6NTB8cy5lOmd8cC5jOiMwMDAwMDAscy50OjUxfHMuZTpnfHAuYzojMDAwMDAwLHMudDo0fHMuZTpnLmZ8cC53OjAuMDF8cC5zOi0zM3xwLnY6b258cC5oOiNmZjAwMDAscy50OjR8cy5lOmwuaXxwLnY6b2ZmLHMudDo2NXxzLmU6Z3xwLmM6IzAwMDAwMHxwLnc6MC4wMSxzLnQ6NjV8cy5lOmcuZnxwLnY6b258cC5jOiNmZjAwMDAscy50OjZ8cy5lOmcuZnxwLmM6IzcwODhiMA!4e0!5m1!5f2&key=AIzaSyAOqYYyBbtXQEtcHG7hwAwyCPQSYidG8yU&token=82159'
          }),
        }),
      ],
      target: 'map',
      view: new View({ 
        center: [1768687.3333925947, 5749030.256367761],
        zoom: 14.4,
        maxZoom: 15.5, 
        minZoom: 14.4,
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
            scale: 1.8
          }),
        })
      ]
      return styles;
    };

    const icons = new VectorImageLayer({
      source: new Vector({
        url: './assets/map.geojson',
        format: new GeoJSON()
      }),
      style: iconStyle
    });

    this.map.addLayer(icons);
  }

}
