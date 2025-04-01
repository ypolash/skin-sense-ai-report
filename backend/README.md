
# Dr Skin Backend

This is the backend API for Dr Skin, a skin analysis application using SkinGPT-4.

## Setup

1. Clone this repository
2. Clone SkinGPT-4 repository:
   ```
   git clone https://github.com/JoshuaChou2018/SkinGPT-4.git
   ```
3. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Install any additional dependencies required by SkinGPT-4

## Running the Server

```
python main.py
```

Or directly with uvicorn:

```
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

Once the server is running, visit:
- http://localhost:8000/docs for Swagger UI documentation
- http://localhost:8000/redoc for ReDoc documentation

## Important Notes

You'll need to update the following in main.py:
1. The import path for the SkinGPT-4 model
2. The model initialization code based on SkinGPT-4's requirements
3. The image preprocessing function to match SkinGPT-4's input format
4. The frontend origins in the CORS middleware
