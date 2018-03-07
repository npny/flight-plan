const remoteImageryTiles = "http://wxs.ign.fr/an7nvfzojv5wa96dsga5nk8w/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-OACI&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg";
const remoteOaciTiles = "http://wxs.ign.fr/an7nvfzojv5wa96dsga5nk8w/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-OACI&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg";
const localTiles = "data/{z}/{x}_{y}.jpg";

const polylineStyle = {
	color: "black",
	weight: 10,
	opacity: .75,
};

const lineguideStyle = {
	color: "black",
	weight: 10,
	opacity: .5,
	dashArray: "20,10",
	lineCap: "butt",
}

const map = L.map('map', {

	maxBounds: L.latLngBounds(L.latLng(41.0, -6.0), L.latLng(52.0, 11.0)),
	bounceAtZoomLimits: false,
	boxZoom: false,

	// Edition
	editable: true,
	editOptions: {lineGuideOptions: lineguideStyle},

	// Continuous zoom
	zoomSnap: 0,
	wheelDebounceTime: 0,
	zoomAnimation: false,
	wheelPxPerZoomLevel: 100,

}).setView([48.8567, 2.3508], 8);

//L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {opacity: 1.0}).addTo(map);

const imageryLayer = L.tileLayer(remoteImageryTiles);
const oaciLayer = L.tileLayer(remoteOaciTiles, {
    attribution: "Map data &copy; <a href=\"http://www.geoportail.gouv.fr/accueil\">Geoportail</a>",
    minZoom: 6,
    maxNativeZoom: 11
});


// Prevent flickering
imageryLayer._invalidateAll = () => {};
oaciLayer._invalidateAll = () => {};

//imageryLayer.addTo(map);
oaciLayer.addTo(map);