const polyline = new L.Polyline([], polylineStyle);

polyline.addTo(map);
polyline.enableEdit();




// Delete with right-click instead of left-click
polyline.editor.tools
.on('editable:vertex:rawclick', e => {e.cancel()})
.on('editable:vertex:contextmenu', e => {
	if (polyline.editor.vertexCanBeDeleted(e.vertex))
		e.vertex.delete();
})
// Refresh route on edition
.on('editable:editing', e => updateRoute(polyline.getLatLngs()))




function startEdition() {
	if(polyline.editor.drawing()) return;
	if(polyline.isEmpty())
		polyline.editor.startDrawingForward();
	else
		polyline.editor.continueForward();
}

function stopEdition() {
	polyline.editor.cancelDrawing();
}

function resetLine() {
	stopEdition();
	polyline.setLatLngs([]);
	polyline.editor.tools.fireAndForward("editable:editing");
	polyline.remove();
}




document.addEventListener("keydown", function(e) {

	if(e.keyCode == 16) // Shift key
		startEdition();

	if(e.keyCode == 27) // Escape key
		resetLine();

	if(e.keyCode == 32) // Space key
		exportRoute();
});

document.addEventListener("keyup", function(e) {
	if(e.keyCode == 16) // Shift key
		stopEdition();
});

document.addEventListener("contextmenu", function(e) {
	e.preventDefault();
});


