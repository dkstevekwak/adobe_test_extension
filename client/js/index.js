/*
  CSInterface
*/
var csInterface = new CSInterface();

/*
  UI Elements
*/
var opendocButton = document.querySelector("#opendoc-button");
var uploaddocButton = document.querySelector("#uploaddoc-button");
var downloaddocButton = document.querySelector("#downloaddoc-button");
var exportdocButton = document.querySelector("#exportdoc-button");

/*
  Event listeners
*/
opendocButton.addEventListener("click", openDoc);
uploaddocButton.addEventListener("click", uploadDoc);
downloaddocButton.addEventListener("click", downloadDoc);
exportdocButton.addEventListener("click", exportDoc);


/*
  Helper methods
*/
function openDoc() {
  csInterface.evalScript("openDoc()", function(data){
  	
  });
  csInterface.resizeContent(100,100)
  // window.cep.util.openURLInDefaultBrowser('https://naver.com')
}

function uploadDoc(path) {
  csInterface.evalScript("currFilePath()", function(path){
	  $.ajax({
	    type: "GET",
	    url: "https://5aae1e1f.ngrok.io/api/localupload",
	    data: {path:path},
	    contentType: "application/x-www-form-urlencoded",
	    // headers: {
	    //   "Authorization": imsToken
	    // },
	    success: res => {
	      alert("Submitted!");
	    },
	    error: (jqXHR, textStatus, errorThrown) => { alert(errorThrown, jqXHR.responseJSON) }
	  })
  });
}

function downloadDoc() {
  $.ajax({
    type: "GET",
    url: "https://5aae1e1f.ngrok.io/api/downloadRaw",
    // data: {path:path},
    contentType: "application/x-www-form-urlencoded",
    // headers: {
    //   "Authorization": imsToken
    // },
    success: res => {
    		// fs.write
    		let localPath = csInterface.getSystemPath(SystemPath.MY_DOCUMENTS)+"/"+res.name
    		window.cep.fs.writeFile(localPath, res.img, cep.encoding.Base64);
    		alert(`saved at ${localPath}`)
    	},
    error: (jqXHR, textStatus, errorThrown) => { alert(errorThrown, jqXHR.responseJSON) }
  })
  // csInterface.evalScript("currFilePath()", function(path){
  // });
}

function exportDoc() {
	csInterface.evalScript("exportFile()", function(path){
		var splitted = path.split("/")
		var base64 = window.cep.fs.readFile(path, cep.encoding.Base64);
		if (0 == base64.err) {
		//no error
		 var base64Data = base64.data;
		 var data = cep.encoding.convertion.b64_to_binary(base64Data);
			$.ajax({
			  type: "POST",
			  url: "https://5aae1e1f.ngrok.io/api/upload",
			  data: {
			  	"data":data,
			  	"filename": splitted[splitted.length-1]
			  },
			  success: res => {
			    alert("Submitted!");
			  },
			  error: (jqXHR, textStatus, errorThrown) => { alert(errorThrown, jqXHR.responseJSON) }
			})
		} else {
			alert(base64.err)
		}
	})
}
