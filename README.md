# MREN 318 Study App

An interactive study application for MREN 318 engineering course with AI-powered features.

## Features

### 🃏 Flashcard Mode
- Interactive flip cards with questions and answers
- 🔊 **Text-to-Speech**: Listen to questions and answers
- ✨ **AI Examples**: Get real-world engineering applications

### 📝 Quiz Mode
- Multiple-choice questions with instant feedback
- ✨ **AI Explanations**: Detailed explanations for each answer
- Score tracking

### ✍️ Test Mode
- Type your own answers
- ✅ **AI Grading**: Get evaluated as Correct, Partial, or Incorrect
- Detailed feedback on your understanding
- Score tracking with partial credit

## Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Quizlet
```

### 2. Configure API Key
1. Copy the example config file:
   ```bash
   cp config.example.js config.js
   ```

2. Edit `config.js` and add your Gemini API key:
   ```javascript
   const CONFIG = {
       GEMINI_API_KEY: "your-api-key-here"
   };
   ```

3. **Important**: Never commit `config.js` to version control! It's already in `.gitignore`.

### 3. Get a Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `config.js` file

### 4. Run the App Locally
Simply open `index.html` in your web browser:
```bash
# Windows
start index.html

# Mac/Linux
open index.html
```

## Deployment to Cloudflare Pages

This app is deployed at **[quizlet.keshavhq.com](https://quizlet.keshavhq.com/)**

### Setup Instructions
1. Push your code to GitHub
2. Connect repository to Cloudflare Pages
3. **Add environment variable** in Cloudflare Dashboard:
   - Go to: Workers & Pages → quizlet → Settings → Environment variables
   - Add: `GEMINI_API_KEY` = your Gemini API key
   - See [`CLOUDFLARE_SETUP.md`](./CLOUDFLARE_SETUP.md) for detailed instructions

The app uses a **Cloudflare Pages Function** (`/functions/api/gemini.js`) to securely proxy API calls, keeping your API key safe.

## File Structure
```
Quizlet/
├── index.html              # Main application file (deployed)
├── functions/
│   └── api/
│       └── gemini.js       # Serverless function for AI features
├── config.js               # API key for local dev (gitignored)
├── config.example.js       # Template for config.js
├── CLOUDFLARE_SETUP.md     # Deployment setup guide
├── .gitignore              # Prevents secrets from being committed
└── README.md               # This file
```

## Technologies Used
- **HTML/CSS/JavaScript**: Core web technologies
- **Google Gemini API**: AI-powered features
  - Text generation for examples and explanations
  - Text-to-speech for audio playback
  - Answer evaluation and grading

## Security Notes
- ⚠️ **Never commit your API key** to version control
- The `config.js` file is gitignored to protect your key
- Always use `config.example.js` as a template
- For production deployments, use environment variables

## Study Topics Covered
- Sensors (active/passive, proximity, ultrasonic, Hall effect, etc.)
- Pressure and flow measurement
- Strain gauges and accelerometers
- Magnetic circuits and B-H curves
- DC motors and generators
- And more!

## License
Educational use for MREN 318 students.
