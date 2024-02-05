import { error } from '@sveltejs/kit';

export async function GET() {
    const schemaURL = "https://raw.githubusercontent.com/gttp-cli/gttp/main/schema.json?token=GHSAT0AAAAAAB66YRC4SYHM47DMR3CC4RXSZOBAY4A";

    try {
        const response = await fetch(schemaURL);
        if (!response.ok) {
            throw new Error('Failed to fetch schema');
        }
        const data = await response.json();

        return new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        // Handle errors or invalid responses
        throw error(500, `Error fetching schema: ${e.message}`);
    }
}
