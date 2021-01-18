const msal = require('@azure/msal-node');

const msalConfig = {
	auth: {
		clientId: process.env.CLIENT_ID,
		authority: process.env.AAD_ENDPOINT + process.env.TENANT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	}
};

// With client credentials flows permissions need to be granted in the portal by a tenant administrator. 
// The scope is always in the format '<resource>/.default'.
const tokenRequest = {
	scopes: [process.env.GRAPH_ENDPOINT + '.default'],
};

const apiConfig = {
	uri: process.env.GRAPH_ENDPOINT + 'v1.0/users',
};

// Create msal application object
const cca = new msal.ConfidentialClientApplication(msalConfig);

async function getToken(tokenRequest) {
	return await cca.acquireTokenByClientCredential(tokenRequest);
}

module.exports = {
	apiConfig: apiConfig,
	tokenRequest: tokenRequest,
	getToken: getToken
};
