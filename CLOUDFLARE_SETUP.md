# Setting Up Gemini API Key in Cloudflare Pages

## Why This Is Needed

Your Quizlet app uses the Gemini API for AI features (TTS, explanations, grading). The API key **cannot** be stored in client-side code for security reasons. Instead, it must be stored as an environment variable in Cloudflare Pages.

## How It Works Now

1. **Local Development**: Reads API key from `config.js` (gitignored)
2. **Production**: Uses Cloudflare Pages Function at `/api/gemini` which accesses the environment variable

## Setup Instructions

### Step 1: Get Your Gemini API Key
If you don't have one already:
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key (starts with `AIza...`)

### Step 2: Add Environment Variable to Cloudflare Pages

1. **Go to Cloudflare Dashboard**
   - Navigate to: Workers & Pages → Your project (`quizlet`)

2. **Open Settings**
   - Click the **Settings** tab
   - Scroll to **Environment variables**

3. **Add the Variable**
   - Click **Add variable**
   - **Variable name**: `GEMINI_API_KEY`
   - **Value**: Paste your API key (e.g., `AIzaSyC...`)
   - **Environment**: Select **Production** (and **Preview** if you want it to work on preview deployments too)
   - Click **Save**

4. **Redeploy**
   - Go to the **Deployments** tab
   - Click **Retry deployment** on the latest deployment
   - OR just push a new commit to trigger automatic redeployment

### Step 3: Verify It Works

1. Visit `https://quizlet.keshavhq.com/`
2. Go to a flashcard and flip it
3. Click **"✨ Real World Example"** or **"🔊 Listen"**
4. If it works, you'll see AI-generated content!

## Troubleshooting

### "AI features are currently unavailable"
- Check that the environment variable is named exactly `GEMINI_API_KEY`
- Verify the API key is valid in [Google AI Studio](https://aistudio.google.com/app/apikey)
- Make sure you redeployed after adding the environment variable

### Check the Browser Console
1. Press F12 to open Developer Tools
2. Go to the **Console** tab
3. Look for errors like:
   - `API key not configured` → Environment variable not set
   - `HTTP Error: 400` → Invalid API key
   - `HTTP Error: 429` → Rate limit exceeded

### Still Not Working?
Check the Cloudflare Pages deployment logs:
1. Go to Cloudflare Dashboard → Workers & Pages → quizlet
2. Click on the latest deployment
3. Check the **Functions** tab to see if `/api/gemini` is deployed

## File Structure

```
d:/Programming/Quizlet/
├── functions/
│   └── api/
│       └── gemini.js          ← Serverless function (has access to env vars)
├── index.html                 ← Main app (calls /api/gemini in production)
├── Main.html                  ← Source file (same as index.html)
├── config.js                  ← Local API key (gitignored, not deployed)
└── .pages.toml                ← Cloudflare Pages config
```

## Security Notes

✅ **Secure**: API key stored as environment variable on Cloudflare  
✅ **Secure**: API calls go through your serverless function  
✅ **Secure**: `config.js` is gitignored and never deployed  
❌ **Insecure**: Never commit API keys to Git  
❌ **Insecure**: Never put API keys directly in HTML/JavaScript
