/**
 * Cloudflare Pages Function - Gemini API Proxy
 * This serverless function securely handles Gemini API calls
 * Environment variable required: GEMINI_API_KEY
 */

export async function onRequestPost(context) {
  const { request, env } = context;
  
  // Get API key from environment variable
  const apiKey = env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return new Response(JSON.stringify({ 
      error: 'API key not configured. Please set GEMINI_API_KEY in Cloudflare Pages settings.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Parse the request from the frontend
    const body = await request.json();
    const { prompt, isTTS = false } = body;
    
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Determine which Gemini model to use
    const model = isTTS 
      ? "gemini-2.5-flash-preview-tts" 
      : "gemini-2.5-flash-preview-09-2025";
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    // Build the payload for Gemini API
    let payload;
    if (isTTS) {
      payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Kore" }
            }
          }
        }
      };
    } else {
      payload = {
        contents: [{ parts: [{ text: prompt }] }]
      };
    }
    
    // Call Gemini API
    const geminiResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      return new Response(JSON.stringify({ 
        error: `Gemini API error: ${geminiResponse.status}`,
        details: errorText
      }), {
        status: geminiResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const data = await geminiResponse.json();
    
    // Return the Gemini response to the frontend
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle CORS preflight requests
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
