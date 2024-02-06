import { error } from '@sveltejs/kit';

export async function GET() {
    const schemaURL = "https://raw.githubusercontent.com/gttp-cli/gttp/main/schema.json";

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
    } catch (e: any) {
        // Handle errors or invalid responses
        throw error(500, `Error fetching schema: ${e.message}`);
    }
}
