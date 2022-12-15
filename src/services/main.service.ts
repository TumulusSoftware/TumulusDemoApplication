import { authHeader } from "@/_helpers/authHeader";
import { handleResponse } from "@/_helpers/handleResponse";
// import { Asset } from "@/interfaces/asset";

export async function getAssetList() {
	// mode: "no-cors" as  RequestMode,
	const requestOptions = {
		method: "GET",
		headers: { ...authHeader(), "Content-Type": "application/json" },
	};
	const assetArr = await fetch(`${process.env.VUE_APP_API_BASE_URL}/asset/list`, requestOptions)
		.then(handleResponse);

	console.log(assetArr);
	return assetArr;
}

function downloadBlob(myBlob:Blob, fileName:string) {
	var FILE = window.URL.createObjectURL(myBlob);

	var docUrl = document.createElement("a");
	docUrl.href = FILE;
	docUrl.setAttribute("download", fileName);
	document.body.appendChild(docUrl);
	docUrl.click();
}

export async function getAsset(assetId:number, fileName:string) {
	const requestOptions = {
		method: "GET",
		headers: authHeader(),
	};
	await fetch(`${process.env.VUE_APP_API_BASE_URL}/asset/${assetId}`, requestOptions)
		.then((response:Response) => {
			response.blob().then((myBlob) => {
				downloadBlob(myBlob, fileName);
				// var FILE = window.URL.createObjectURL(myBlob);
				// var docUrl = document.createElement("a");
				// docUrl.href = FILE;
				// docUrl.setAttribute("download", fileName);
				// document.body.appendChild(docUrl);
				// docUrl.click();
			 });
		});
}


 