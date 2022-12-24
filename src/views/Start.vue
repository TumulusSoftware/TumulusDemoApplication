<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Tumulus App Example</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-item>
				<ion-button router-link="/user/signIn">Sign In</ion-button>
			</ion-item>
			<ion-item>
				<ion-button router-link="/user/signUp">Sign Up</ion-button>
			</ion-item>
		</ion-content>
	</ion-page>
</template>
