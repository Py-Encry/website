# Py-Encry Website

## Setup

This project requires Python 3.12 or higher.

### Install dependencies

```bash
cd frontend
npm install

cd ../backend
python3.12 -m pip install -r requirements.txt
```

### Run the project

You have to run the frontend and backend separately.
The frontend will be available at `localhost:3000` and the backend at `localhost:8000`.
The easiest is to have two terminals open, one for each.

```bash
# Terminal 1
cd frontend
npm start

# Terminal 2
cd backend
python3.12 -m manage.py runserver
```
