const urlParams = new URLSearchParams(window.location.search);
const rule = urlParams.get('rule');
const rule_name = urlParams.get('rule_name');

if(rule && rule_name){

	const csrftoken= document.cookie
			.split( ';' )
			.map( pair => pair.split( '=' ) )
			.filter( pair => pair.length == 2 && pair[0].trim()=='sentinel_csrftoken' )
			.map( pair => [ pair[0].trim(), pair[1].trim() ] )
			.filter( pair => pair[0] != 'expires' )[0][1].trim()
		;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'https://sentinel.zerodha.com/api/triggers/new/advanced', true);

	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.setRequestHeader("accept", "application/json, text/plain, */*");
	xhr.setRequestHeader("x-csrftoken", csrftoken);
	xhr.setRequestHeader("content-transfer-encoding", "base64");

	xhr.onreadystatechange = function() {
	if(xhr.readyState === XMLHttpRequest.DONE) {
		var status = xhr.status;
		if (status === 0 || (status >= 200 && status < 400)) {
		  // The request has been completed successfully
		  alert(xhr.responseText);
		} else {
		  alert(JSON.parse(xhr.responseText).message);
		}
	  }

	}

	const payload={rule_name:rule_name,rule_string:rule,basket_id:null}
	xhr.send(JSON.stringify(payload));

}
