# CODEFORGE

CODEFORGE is an intelligent coding ecosystem for learning programming, building logic, practicing coding, debugging, and visualizing execution.

## Stack
- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Python FastAPI
- Database: PostgreSQL (planned for production integration)

## Local setup

1. Install dependencies:
   npm install
2. Start the frontend:
   npm run dev
3. For the backend API:
   cd backend
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload

## Important note
The secure code execution API is intentionally unavailable until a trusted execution service is configured. The frontend warns users instead of faking outputs.
