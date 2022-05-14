function getIRIParamVal(reqKey) {
	let pageIRI = window.location.search.substring(1);
	let pageIRIVariables = pageIRI.split('&');
	for(let i = 0; i < pageIRIVariables.length; i++){
		let data = pageIRIVariables[i].split('=');
		let key = data[0];
		let value = data[1];
		if (key === reqKey){
			return value;
		}
	}
}

let username = getIRIParamVal('username');

if((typeof username == 'undefined') || (username === null)){
	username = "Seo Dal-Mi_"+Math.floor(Math.random()*1000);
}

$('#messages').prepend('<b>'+username+':</b>')