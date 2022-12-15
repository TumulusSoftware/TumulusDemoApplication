import { authHeader } from "@/_helpers/authHeader";
import { handleResponse } from "@/_helpers/handleResponse";

function downloadBlob(blobData: Blob, fileName: string) {
	var objURL = window.URL.createObjectURL(blobData);
	var eleA = document.createElement("a");
	eleA.href = objURL;
	eleA.setAttribute("download", fileName);
	document.body.appendChild(eleA);
	eleA.click();
} 

export async function getAsset(assetId: number, fileName: string) {
	const requestOptions = {
		method: "GET",
		headers: authHeader(),
	};
	await fetch(`${process.env.VUE_APP_API_BASE_URL}/asset/${assetId}`, requestOptions)
		.then((response: Response) => {
			response.blob().then((blobData) => {
				downloadBlob(blobData, fileName);
			});
		});
}

export async function authJsonFetch(query: string, method: string = "GET") {
	const requestOptions = {
		method: method,
		headers: { ...authHeader(), "Content-Type": "application/json" },
	};
	const result = await fetch(`${process.env.VUE_APP_API_BASE_URL}${query}`, requestOptions)
		.then(handleResponse);

	console.log("authJsonFetch:");
	console.log(result);
	return result;
}
