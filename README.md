# VaaniLink

Speak in your language. Connect in theirs.

## About
VaaniLink is a language translation and communication platform that breaks down language barriers, allowing users to converse seamlessly in their native languages. 

## Problem Statement
Language barriers often prevent effective communication in diverse environments, such as educational institutions, workplaces, and global communities. Existing tools lack seamless integration for real-time, context-aware translation in simple, accessible interfaces.

## Solution
VaaniLink provides a simple, accessible chat interface where users can send messages in their preferred language, and the receiver reads them in their own preferred language.

## Features
- Real-time message translation (mocked for demo)
- Simple, user-friendly interface
- Automatic database initialization
- Health check API endpoint
- Custom 404 and 500 error pages

## Technology Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python Flask
- **Database**: SQLite
- **Deployment**: Ready for Python-compatible cloud hosting (Gunicorn)

## System Architecture
```text
Client (Browser) <---> Flask Server <---> SQLite Database
                       |
               Translation Service
```

## Database
The project uses **SQLite** for local development and college demonstrations.
- **Table**: `messages`
- **Fields**: `id`, `sender_id`, `receiver_id`, `original_message`, `translated_message`, `source_language`, `target_language`, `timestamp`

*Note: SQLite is suitable for the college/demo version. For production deployment on platforms with ephemeral filesystems, a persistent database like PostgreSQL is recommended. The main project remains Flask + SQLite.*

## Project Structure
```text
VaaniLink/
│
├── app.py
├── database.py
├── translation_service.py
├── requirements.txt
├── README.md
├── .gitignore
├── .env.example
├── Procfile
│
├── templates/
│   ├── index.html
│   ├── 404.html
│   └── 500.html
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── database/
│   └── vaanilink.db (auto-generated)
└── models/
```

## Installation

1. Open the project folder (`VaaniLink`) in **Visual Studio Code (VS Code)**.
2. Open the VS Code terminal (`Terminal` -> `New Terminal`).
3. Create a Python virtual environment:
   ```bash
   python -m venv venv
   ```
4. Activate the environment on Windows:
   ```bash
   venv\Scripts\activate
   ```
5. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running in VS Code

1. Ensure your virtual environment is active.
2. Run the application:
   ```bash
   python app.py
   ```
3. Open your browser and go to:
   ```text
   http://127.0.0.1:5000
   ```

## Screenshots
*(Add screenshots of your application running here)*
- Chat Interface
- Mobile View

## Testing
1. Run the application locally.
2. Visit `http://127.0.0.1:5000` to verify the frontend.
3. Visit `http://127.0.0.1:5000/health` to verify the backend health check.
4. Try visiting a non-existent route like `http://127.0.0.1:5000/wrong` to see the custom 404 page.

## GitHub Setup

To upload this project to GitHub:

1. Initialize a Git repository:
   ```bash
   git init
   ```
2. Add all files:
   ```bash
   git add .
   ```
3. Commit the changes:
   ```bash
   git commit -m "Initial VaaniLink project"
   ```
4. Rename the default branch to main:
   ```bash
   git branch -M main
   ```
5. Connect your GitHub repository:
   ```bash
   git remote add origin YOUR_GITHUB_REPOSITORY_URL
   ```
6. Push the code:
   ```bash
   git push -u origin main
   ```

## Deployment
The project is configured for Python-compatible hosting services (like Render, Heroku, or PythonAnywhere).

1. Create GitHub repository.
2. Push VaaniLink project to GitHub.
3. Create an account on a Python-compatible hosting service.
4. Connect the GitHub repository.
5. Select the Flask/Python environment.
6. Install dependencies from requirements.txt.
7. Set the production start command (defined in `Procfile`):
   ```text
   web: gunicorn app:app
   ```
8. Add required environment variables (e.g., `SECRET_KEY`).
9. Deploy.
10. Open the generated website URL.

## Known Limitations
- **Database Persistence**: SQLite is used for simplicity. Some cloud hosts have non-persistent (ephemeral) storage, meaning the database may reset on restart. For full production, migrating to PostgreSQL is recommended.
- **Translation API**: The current translation service uses a mock implementation. A real API (e.g., Google Translate) needs to be integrated.

## Future Enhancements
- Integration with live translation APIs (Google Cloud Translation, DeepL).
- User authentication and persistent accounts.
- Voice-to-text and text-to-voice features.
- Migration to PostgreSQL for production readiness.

## Authors
- VaaniLink Team
