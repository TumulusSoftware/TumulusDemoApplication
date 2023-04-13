# Tumulus Demo Application

This demo is a user interface written in JavaScript (Vue.js v3) to illustrate the use of the Tumulus API service.

The demo application allows you to:

* Create New Accounts
* Login
* Upload New Asset Files
* Download Existing Asset Files
* List Existing Asset Files
* List Existing Agreements
* Create & Request New Agreements
* List Existing Authorizations
* Assign Authorizations to Assets
* List Owner States

__Note:__ _This is purely for demonstration purposes and should not be used as-is in production._

## Prerequisites

* Node.js v16.0
* Vue.js v3
* Ionic 6
* The Tumulus API running on the Internet

## Environment files

The project requires an environment file to be set up. 

First, copy `.env.example` to `.env`

Edit `.env` and set up the following variables

* VUE_APP_API_BASE_URL=https://yourapiurl.com 

## I just want to run it quickly

The following instructions are for a Linux Desktop environment.
You may need to make adjustment accordingly.

1. Install the project locally

```
git clone https://github.com/TumulusSoftware/TumulusDemoApplication.git
cd TumulusDemoApplication
npm update
```

2. Start the development server

```ionic serve```

The SPA is available at http://localhost:8100

The web browser may be launched automatically.

## How it Works

Tumulus is an open-source API that makes it easy for web2 developers to deploy web3 data storage and sharing technologies.

Tumulus empowers users to store and share their important data securely via IPFS and smart contracts. While tumulus can support a myriad of distinct use cases, one of its more notable capabilities is its ability to enable posthumous transactions, i.e., actions you want to ensure will happen after your death. In fact, tumulus was conceived to address the need to be able to control the sharing of important personal files after death, since we all want to lighten the burden of those who survive us as they wind down our affairs after we are gone.

The demo application included here can be used to implement the basic use case of a posthumous transaction. However, we envision countless other uses for the tumulus API and encourage everyone to use the code to address these needs.

## Using the Demo Application

The application requires you to create your own new account and once verified you will be able to access the application.

The default role of the logged in user is "Owner". As the Owner there are several operations that can be performed. If correctly configured, the application will interact with your running Tumulus API to encrypt and store your asset files to IPFS securely.

Once your account is created, you can:
* Upload and download asset files securely
* List your current asset files
* Request an agreement
* List and assign authorizations

__Note:__ _These operations involve blockchain activity and can take an unpredictable amount of time to complete. This application should be used on Testnets only._

## Roles

### Owners

Owners are individuals who own a Tumulus account and use it to upload asset files, create agreements and authorizations with respect to the uploaded asset files.

### Announcers

Announcers are individuals who have an agreement with the owner to "announce" a particular state of the owner.

### Viewers

## Objects

Viewers are individuals who are granted access to certain asset files uploaded by the owner under specific conditions of the owner state.

### Agreements

Agreements are between Owners and Announcers whereby the announcer agrees to confirm specific states of the owner when required.

### Authorizations

Authorizations are access permissions granted by the owner to the viewer for specific asset files under specific conditions of state.

### Owner States

Owner States represent different states of the owner. The possible owner states are configured inside the Tumulus API. Examples of owner states could include "deceased", "incapacitated", "missing".

## Contributing

Contributions are welcome. Please see the [Contributing Guidelines](CONTRIBUTING.md) guide to see how you can get involved.

## Code of Conduct

This project is governed by the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are
expected to uphold this code of conduct. Please report unacceptable behavior to [abuse@tumulus.io](mailto:abuse@tumulus.io)

## License

[Apache License 2.0](LICENSE)
