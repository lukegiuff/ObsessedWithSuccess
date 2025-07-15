import { OAuthClient } from './oauth';

interface Env {
	OAUTH_CLIENT_ID: string;
	OAUTH_CLIENT_SECRET: string;
}

const generateRandomState = () => {
	const array = new Uint8Array(4);
	crypto.getRandomValues(array);
	return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

const createOAuth = (env: Env) => {
	return new OAuthClient({
		id: env.OAUTH_CLIENT_ID,
		secret: env.OAUTH_CLIENT_SECRET,
		target: {
			tokenHost: 'https://github.com',
			tokenPath: '/login/oauth/access_token',
			authorizePath: '/login/oauth/authorize',
		},
	});
};

const handleAuth = async (url: URL, env: Env) => {
	const provider = url.searchParams.get('provider');
	if (provider !== 'github') {
		return new Response('Invalid provider', { status: 400 });
	}

	if (!env.OAUTH_CLIENT_ID) {
		return new Response('Missing OAUTH_CLIENT_ID!', { status: 500 });
	}

	const oauth2 = createOAuth(env);
	const authorizationUri = oauth2.authorizeURL({
		redirect_uri: `https://${url.hostname}/callback?provider=github`,
		scope: 'public_repo,user',
		state: generateRandomState(),
	});

	return new Response(null, { headers: { location: authorizationUri }, status: 301 });
};

const callbackScriptResponse = (status: string, token: string) => {
	return new Response(`
<html>
<head>
	<script>
		const receiveMessage = (message) => {
			window.opener.postMessage(
				'authorization:github:${status}:${JSON.stringify({ token })}',
				'*'
			);
			window.removeEventListener("message", receiveMessage, false);
		}
		window.addEventListener("message", receiveMessage, false);
		window.opener.postMessage("authorizing:github", "*");
	</script>
	<body>
		<p>Authorizing Decap...</p>
	</body>
</head>
</html>`, { headers: { 'Content-Type': 'text/html' } });
};

const handleCallback = async (url: URL, env: Env) => {
	const provider = url.searchParams.get('provider');
	const code = url.searchParams.get('code');
	const error = url.searchParams.get('error');
	
	if (error) {
		return new Response(`OAuth Error: ${error}`, { status: 400 });
	}
	
	if (provider !== 'github' || !code) {
		return new Response('Invalid OAuth callback', { status: 400 });
	}

	const oauth2 = createOAuth(env);
	const accessToken = await oauth2.getToken({
		code,
		redirect_uri: `https://${url.hostname}/callback?provider=github`,
	});
	return callbackScriptResponse('success', accessToken);
};

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		try {
			let response;
			
			if (url.pathname === '/auth') {
				response = await handleAuth(url, env);
			} else if (url.pathname === '/callback') {
				response = await handleCallback(url, env);
			} else {
				response = new Response('Decap OAuth Proxy', { status: 200 });
			}

			Object.entries(corsHeaders).forEach(([key, value]) => {
				response.headers.set(key, value);
			});

			return response;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			return new Response(`Error: ${errorMessage}`, { 
				status: 500,
				headers: corsHeaders
			});
		}
	},
}; 