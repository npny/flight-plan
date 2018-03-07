const cruise = 185; // km/h
const meterToNauticalMile = 0.000539957;
const printHeading = heading => padLeft(Math.round(heading), '0', 3) + '°';
const printDistance = meters => Math.round( meters * meterToNauticalMile );
const printDuration = meters => Math.round( meters / cruise / 1000 * 60 );
const padLeft = (string, char, length) => {
	string = string.toString();
	while(string.length < length) string = char + string;
	return string;
}

function updateRoute(points) {
	let output = "";
	let total = 0;

	for(let i = 0; i < points.length-1; i++) {
		const heading = L.GeometryUtil.bearing(points[i], points[i+1]);
		const distance = L.GeometryUtil.length([points[i], points[i+1]]);
		output += `${printHeading(heading)} / ${padLeft(printDuration(distance), ' ', 2)}'   (${padLeft(printDistance(distance), ' ', 2)}nm)\n`;
		total += distance;
	}

	output += `\nTotal: ${printDistance(total)}nm (${printDuration(total)}min)`;

	if(points.length < 2) output = "No route defined";
	document.getElementById("steps").innerText = output;
}

updateRoute([])