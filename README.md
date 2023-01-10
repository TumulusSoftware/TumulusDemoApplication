# Tumulus Demo Application

This demo is a user interface written in Javascript (Vue.js v3) to illustrate the use of the Tumulus API Service.

The demo application allows you to:
* Create New Accounts
* Upload New Asset Files
* List Existing Asset Files
* List Existing Agreements
* Create & Request New Agreements
* List Existing Authorizations
* Assign Authorizations To Assets
* List Owner States

_Note: This is purely for demonstration purposes and should not be used as-is in production_

## Prerequisites

* Node.js v16.0
* Vue.js v3
* Ionic 6
* The Tumulus API running on the Internet

## Environment files

The project requires an environment file to be setup. 

First, copy `.env.example` to `.env`

Edit `.env` and setup the following variables

* VUE_APP_API_BASE_URL=https://yourapiurl.com 

## I just want to run it quickly

1. Clone Repo

```https://github.com/TumulusSoftware/TumulusDemoApplication.git```

2. Build Application

```npm build```

3. Upload to Server

4. Install required packages on the server

```npm update```

5. Run the service

```ionic serve```

Application is now available: http://yourhost/

## Using the UI

The application requires you to create your own new account and once verified you are able to access the application.

The default role of the logged in user is "Owner"

As the Owner there are several operations that can be performed as per the list above.

If correctly configured, the application will interact with your running Tumulus API to encrypt and store your asset files to IPFS securely.

Once your account is created, you can:
* Upload asset files securely
* List your current asset files
* Request an agreement
* List and assign authorizations
Note: These operations involve blockchain activity and can take an unpredictable amount of time to complete. This application should be used on Testnets only.

## Owners

Owners are individuals who own a Tumulus account and use it to upload asset files, create agreements and authorizations with respect to the uploaded asset files.

## Announcers

Announcers are individuals who have an agreement with the owner to "announce" a particular state of the owner.

## Viewers

Viewers are individuals who are granted access to certain asset files uploaded by the owner under specific conditions of the owner state.

## Agreements

Agreements are between Owners and Announcers whereby the announcer agrees to confirm specific states of the owner when required.

## Authorizations

Authorizations are access permissions granted by the owner to the viewer for specific asset files under specific conditions of state.

## Owner States

Owner States represent different states of the owner. The possible owner states are configured inside the Tumulus API.

## Contributing

Contributions are welcome. Please see the [contributing](CONTRIBUTING.md) guide to see how you can get involved.

## Code of Conduct

This project is governed by the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are
expected to uphold this code of conduct. Please report unacceptable behavior to [abuse@tumulus.io](mailto:abuse@tumulus.io)

## License

[Apache License 2.0](LICENSE)