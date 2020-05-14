# Heading Numbers

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

Google Docs add-on for adding any custom heading number.
Development using [clasp](https://developers.google.com/apps-script/guides/clasp).

# Getting Started

* `npm install`
* `npm run clasp login`
* Enable API access at https://script.google.com/home/usersettings
* `npm run clasp create --title "Heading Numbers"` and choose docs.
* `npm run clasp push` and confirm manifest overwrite
* `npm run deploy` to create a first deployment

Now you can test it as a Docs Add-On. You should find a document named "Heading Numbers" in your personal Google Drive where you can test it.

# Publishing to your domain

* Go to https://console.cloud.google.com/home/dashboard and create a new project named "Heading Numbers" and note the numerical project number.
* Go to the Apps Script Projekt editor and set the project number in the Ressources → GCP Project menu and confirm. You'll have to configure an OAuth consent screen on the way, use the offered link to do so. Select **internal** as User Type for domain-only deployments without Google approval. Put "Heading Numbers" as app name and set some user or group as support contact. The GCP project switch might not work as it checks for the existance of the OAuth consent screen.
* Repeat this step to finally switch the GCP project.
* Go to Publish → As Docs Add-On to publish the project, accepting everything. Follow the link to the G Suite Marketplace SDK.
* If you get an access error then select the GCP project in the top and you should be able to activate the [G Suite Marketplace SDK API](https://console.cloud.google.com/apis/api/appsmarket-component.googleapis.com/googleapps_sdk) for this project.
* Go to Configure to configure the app:
  * Add app name and description for at least one language
  * add the 128px and 32px app symbols from the PNG files here
  * Set the URL for terms (e.g. your home page)
  * add the following OAuth scopes: `https://www.googleapis.com/auth/documents` and `https://www.googleapis.com/auth/script.container.ui`
  * Select Extension for Docs-Add-On and insert there the project script ID (found in `.clasp.json`) and deployment ID (e.g. `1`) from your first deployment
  * Set the visibility to your domain only
  * Save the changes
  * Click "Integrate with Google" at the top of the Configure page to start the domain-wide installation

Now the add-on should be available in every Docs document. If it doesn't work and the Add-On Menu only shows the help menu, then create a new version and set the Marketplace app to the new version.

# Releases

* _2020-05-13_ - Added installation instructions and images for G Suite Marketplace
* _2018-06-10_ - Open sourced and moved to GitHub
	* Makes previously premium features available for anyone