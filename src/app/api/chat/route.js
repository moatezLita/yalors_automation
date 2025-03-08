export async function POST(request) {
    try {
      // Get the request body
      const body = await request.json();
      
      // Forward the request to your n8n webhook
      const response = await fetch('http://54.38.189.103:5678/webhook/a889d2ae-2159-402f-b326-5f61e90f602e/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      // Get the response from n8n
      const data = await response.json();
      
      // Return the response
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error proxying to n8n:', error);
      return new Response(JSON.stringify({ error: 'Failed to connect to service' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }