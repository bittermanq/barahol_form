import axios from 'axios';

// &access_token={}
const ownerId = "-184189403";

export const suggestPost = () => {
    const message = "message";

    const url = `https://api.vk.com/method/wall.post?${ownerId}&${message}&v=5.103`;

    axios.get(url, {
	headers: {
	  'Access-Control-Allow-Origin': '*',
	},
	}).then(function (response) {
		console.log('response is : ' + response.data);
	}).catch(function (error) {
		if (error.response) {
		  console.log("1", error.response.headers);
		} 
		else if (error.request) {
	      console.log("2", error.request);
		} 
		else {
		  console.log("3", error.message);
		}
	console.log("error is", error.config);
});
}