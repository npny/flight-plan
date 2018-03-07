// "Get VAC" helper
function getVac() {
	const code = prompt("Enter airfield ICAO code (4 letters)")
	window.open(`https://www.sia.aviation-civile.gouv.fr/dvd/eAIP_01_MAR_2018/Atlas-VAC/PDF_AIPparSSection/VAC/AD/AD-2.${code.toUpperCase()}.pdf`);
}

// "Closest point on path" marker
const cursor = new L.Marker(map.getCenter(), {icon: L.divIcon({className: "cpop-marker"})}).addTo(map);
map.on("mousemove", e => {
	if(polyline.getLatLngs().length < 2) return;
	const closest = L.GeometryUtil.closest(map, polyline, e.latlng);
	cursor.setLatLng(closest);
});

// Map scale
L.control.scale({maxWidth: 250, imperial: false, position: 'bottomright'}).addTo(map);