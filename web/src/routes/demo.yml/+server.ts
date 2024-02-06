import { error } from '@sveltejs/kit';

export async function GET() {
    const schemaURL = "https://raw.githubusercontent.com/gttp-cli/gttp/main/_examples/demo.yml";

    try {
        const response = await fetch(schemaURL);
        if (!response.ok) {
            throw new Error('Failed to fetch schema');
        }
        const data = await response.text()

        return new Response(data, {
            headers: {
                'Content-Type': 'application/yaml'
            }
        });
    } catch (e: any) {
        // Handle errors or invalid responses
        throw error(500, `Error fetching schema: ${e.message}`);
    }
}
