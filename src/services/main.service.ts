import { IonButton, actionSheetController, alertController } from '@ionic/vue';
import { authHeader } from "@/_helpers/authHeader";
import { handleResponse } from "@/_helpers/handleResponse";
import {ChainResult} from "@/interfaces/chainResult";

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

export function getChainMessage(rtnObj: ChainResult) {
	return (rtnObj.status == "PENDING") ?
		"Pending blockchain update"
		: JSON.stringify(rtnObj);
}
export async function presentAlert(header: string, message: string, subHeader?: string)  {
	const alert = await alertController.create({
		header: header,
		subHeader: subHeader,
		message: message,
		buttons: ['OK'],
	});

	await alert.present();
};

export async function confirmOp(op:string) {
	const actionSheet = await actionSheetController.create({
		header: `Are you sure you want to ${op.toLowerCase()} this item?`,
		buttons: [
			{
				text: op,
				role: 'destructive',
				data: { action: 'go', },
			},
			{
				text: 'Cancel',
				role: 'cancel',
				data: { action: 'cancel', },
			},
		],
	});
	await actionSheet.present();
	const res = await actionSheet.onDidDismiss();
	return (res.data.action == "go");
}
