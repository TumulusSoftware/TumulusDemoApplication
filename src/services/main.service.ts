import {
	IonButton,
	pickerController,
	actionSheetController,
	alertController
} from '@ionic/vue';
import { authHeader } from "@/_helpers/authHeader";
import { handleResponse } from "@/_helpers/handleResponse";
import { ChainResult } from "@/interfaces/chainResult";

function downloadBlob(blobData: Blob, fileName: string) {
	var objURL = window.URL.createObjectURL(blobData);
	var eleA = document.createElement("a");
	eleA.href = objURL;
	eleA.setAttribute("download", fileName);
	document.body.appendChild(eleA);
	eleA.click();
}

export async function getAsset(assetId: number, fileName: string) {
	const requestInit = {
		method: "GET",
		headers: authHeader(),
	} as RequestInit;
	await fetch(`${process.env.VUE_APP_API_BASE_URL}/asset/${assetId}`, requestInit)
		.then((response: Response) => {
			response.blob().then((blobData) => {
				downloadBlob(blobData, fileName);
			});
		});
}

/**
 * 
 * @param query "/asset/upload"
 * @param formData (new FormData()).append("assetFile", assetFile).append("tags", tags)
 * @returns 
 */
export async function postFormData(query: string, formData: FormData) {
	// var data = new FormData();
	// data.append("assetFile", assetFile);
	// data.append("tags", tags);

	const requestInit = {
		method: "POST",
		headers: authHeader(),
		body: formData,
	} as RequestInit;

	const result = await fetch(`${process.env.VUE_APP_API_BASE_URL}${query}`, requestInit)
		.then(handleResponse);
	return result;
}

export async function authJsonFetch(query: string, method: string = "GET", bodyObject?: any) {
	const requestInit = {
		method: method,
		headers: { ...authHeader(), "Content-Type": "application/json" },
	} as RequestInit;
	if (bodyObject)
		requestInit.body = JSON.stringify(bodyObject);

	const result = await fetch(`${process.env.VUE_APP_API_BASE_URL}${query}`, requestInit)
		.then(handleResponse);

	// console.log("authJsonFetch:");
	// console.log(result);
	return result;
}

export function getChainMessage(rtnObj: ChainResult) {
	return (rtnObj.status == "PENDING") ?
		"Pending blockchain update"
		: JSON.stringify(rtnObj);
}
export async function presentAlert(header: string, message: string, subHeader?: string) {
	const alert = await alertController.create({
		header: header,
		subHeader: subHeader,
		message: message,
		buttons: ['OK']
	});
	await alert.present();
	await alert.onDidDismiss();
};

export async function confirmOp(op: string) {
	const actionSheet = await actionSheetController.create({
		header: `Are you sure you want to ${op.toLowerCase()} this item?`,
		buttons: [{ text: op, role: 'selected' }, { text: 'Cancel', role: 'cancel' }]
	});
	await actionSheet.present();
	const eventDetails = await actionSheet.onDidDismiss();
	return (eventDetails.role == 'selected');
}

export async function getAlertInputs(
	inputs: any,
	header: string, message: string, subHeader?: string) {
	const alert = await alertController.create({
		header: header,
		subHeader: subHeader,
		message: message,
		buttons: [{ text: 'Cancel', role: 'cancel' }, { text: 'OK', role: 'confirm' },],
		inputs: inputs,
	});

	await alert.present();
	const eventDetails = await alert.onDidDismiss() as any;
	if (eventDetails.role != 'confirm')
		return null;
	else
		return eventDetails.data.values;
};

export async function getPickerInput(options: any) {
	const picker = await pickerController.create({
		columns: [{ name: "picked", options: options }],
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
			},
			{
				text: 'Confirm',
				role: 'confirm',
			},
		],
	});
	await picker.present();
	const eventDetails = await picker.onDidDismiss() as any;
	// console.log(eventDetails);
	if (eventDetails.role != 'confirm')
		return null;
	else
		return eventDetails.data.picked;

}