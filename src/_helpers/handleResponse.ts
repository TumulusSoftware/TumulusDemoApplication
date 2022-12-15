import { HttpResponse } from "@capacitor/core";

export function handleResponse(response:Response) {
  console.log("response = ", response);

  return response.text().then((text:string) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
