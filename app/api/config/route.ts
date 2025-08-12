import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the config.yml file from public/admin/
    const configPath = path.join(process.cwd(), 'public', 'admin', 'config.yml');
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    console.log('📄 API: Serving config.yml, length:', configContent.length);
    
    return new NextResponse(configContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/yaml',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('❌ API: Error reading config.yml:', error);
    
    // Return a minimal fallback config
    const fallbackConfig = `# Fallback configuration
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

collections:
  - name: "fallback"
    label: "Fallback Loading..."
    folder: "content/fallback"
    create: false
    fields:
      - {label: "Loading", name: "loading", widget: "string"}`;

    return new NextResponse(fallbackConfig, {
      status: 200,
      headers: {
        'Content-Type': 'text/yaml',
      },
    });
  }
}