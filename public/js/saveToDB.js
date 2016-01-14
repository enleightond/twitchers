function getUserSignUpInfo() {
	var query = window.location.search.substring(1).split('&');
	console.log(query);

	var email = query[0].substring(9);
	console.log(email);

	var password = query[1].substring(9);
	console.log(password);
}