import { NextResponse } from 'next/server';

// Configure for Edge Runtime (required for Cloudflare Pages)
export const runtime = 'edge';

export async function GET() {
  // Since Edge Runtime doesn't support fs operations,
  // return the configuration directly as a string
  const configContent = `# Minimal stub configuration for Decap CMS
# This prevents 404 errors while allowing manual JavaScript initialization
# The actual configuration is defined in index.html

backend:
  name: github
  repo: lukegiuff/ObsessedWithSuccess
  branch: main
  base_url: https://decap-proxy-obsessedwithsuccess.giuffa88.workers.dev
  auth_endpoint: /auth

local_backend: false
site_url: "https://owsconsultinggroup.com"
display_url: "https://owsconsultinggroup.com"
media_folder: "public/assets/images"
public_folder: "/assets/images"

# Minimal collections - these will be overridden by JavaScript config
collections:
  - name: "stub"
    label: "Loading..."
    folder: "content/stub"
    create: false
    fields:
      - {label: "Loading", name: "loading", widget: "string"}`;

  console.log('📄 API: Serving config.yml via Edge Runtime');
  
  return new NextResponse(configContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/yaml',
      'Cache-Control': 'no-cache',
    },
  });
}