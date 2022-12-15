import { CapacitorHttp, HttpResponse } from '@capacitor/core';

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

// Example of a GET request
const doGet = async (path:string) => {
  const options = {
    url: 'https://example.com/my/api',
    headers: { 'X-Fake-Header': 'Fake-Value' },
    params: { size: 'XL' },
  };

  const response: HttpResponse = await CapacitorHttp.get(options);

  // or...
  // const response = await CapacitorHttp.request({ ...options, method: 'GET' })
};

// Example of a POST request. Note: data
// can be passed as a raw JS Object (must be JSON serializable)
const doPost = async () => {
  const options = {
    url: 'https://example.com/my/api',
    headers: { 'X-Fake-Header': 'Fake-Value' },
    data: { foo: 'bar' },
  };

  const response: HttpResponse = await CapacitorHttp.post(options);

  // or...
  // const response = await CapacitorHttp.request({ ...options, method: 'POST' })
};