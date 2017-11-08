function currDoc(){
	var docRef = app.documents.add(2,4)
	var artLayerRef = docRef.artLayers.add()
	artLayerRef.kind = LayerKind.TEXT
	var textItemRef = artLayerRef.textItem
	textItemRef.contents = "Adobe test panel"
}

function openDoc(){
	var originalUnit = preferences.rulerUnits
	app.preferences.rulerUnits = Units.PIXELS
	var fileRef = new File("~/Downloads/kobeeee.jpg")
	var docRef = app.open(fileRef)
}

function currFilePath(){
	var docRef = app.activeDocument
	var sanitized = File(docRef.path).fsName
	return sanitized + ":" + docRef.name
}

function exportFile() {

    var exportOptions = new ExportOptionsSaveForWeb();
    exportOptions.quality = 60;
    exportOptions.format = SaveDocumentType.JPEG;
    exportOptions.includeProfile = true;
    var filePath = app.activeDocument.path + "/" + app.activeDocument.name.replace(/\s/g , "-");
    sanitizedFilePath = File(filePath).fsName;
    app.activeDocument.exportDocument(File(sanitizedFilePath), ExportType.SAVEFORWEB, exportOptions);
    return sanitizedFilePath;
}