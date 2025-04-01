
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import sys
import os
import logging
from typing import Dict, Any

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add the SkinGPT-4 directory to the path
# You'll need to clone the repository in the same directory as this file
sys.path.append("./SkinGPT-4")

# Initialize FastAPI app
app = FastAPI(title="Dr Skin API", description="API for skin analysis using SkinGPT-4")

# Configure CORS to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-production-domain.com"],  # Update with your actual frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model initialization
@app.on_event("startup")
async def startup_event():
    global model
    try:
        logger.info("Initializing SkinGPT-4 model...")
        # Import model modules from SkinGPT-4
        # Note: The actual import will depend on the SkinGPT-4 repository structure
        # This is a placeholder - you'll need to adjust based on the actual repo
        from model import SkinGPT4Model  # Adjust this import based on actual SkinGPT-4 structure
        
        # Initialize the model
        # The actual initialization will depend on the SkinGPT-4 model implementation
        model = SkinGPT4Model()  # Adjust based on actual implementation
        model.load_weights("path/to/weights")  # Update with actual path to model weights
        
        logger.info("SkinGPT-4 model loaded successfully")
    except Exception as e:
        logger.error(f"Failed to load SkinGPT-4 model: {str(e)}")
        # We'll log the error but allow the app to start
        # The endpoint will return an error if the model isn't loaded

@app.post("/analyze", response_model=Dict[str, Any])
async def analyze_skin(image: UploadFile = File(...)):
    """
    Analyze skin image using SkinGPT-4 model
    """
    try:
        # Check if model is loaded
        if 'model' not in globals():
            raise HTTPException(status_code=503, detail="Model not loaded. Please try again later.")
        
        # Validate file type
        content_type = image.content_type
        if not content_type or not content_type.startswith("image/"):
            raise HTTPException(
                status_code=400, 
                detail="Invalid file format. Please upload a valid image file (JPEG, PNG, etc.)"
            )
        
        # Read and process image
        contents = await image.read()
        try:
            img = Image.open(io.BytesIO(contents))
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Could not process image: {str(e)}")
        
        # Preprocess image for model
        # The actual preprocessing will depend on the SkinGPT-4 model requirements
        # This is a placeholder - you'll need to adjust based on the model's needs
        processed_img = preprocess_image(img)  # Implement this function based on model requirements
        
        # Run inference
        logger.info("Running skin analysis with SkinGPT-4 model")
        result = model.predict(processed_img)  # Adjust based on actual model interface
        
        # Process results to match frontend expectations
        processed_result = {
            "skinType": result.get("skin_type", "Unknown"),
            "skinAge": result.get("skin_age", 30),
            "hydration": result.get("hydration", 50),
            "sensitivity": result.get("sensitivity", 30),
            "concerns": [
                {
                    "name": concern["name"],
                    "emoji": get_emoji_for_concern(concern["name"]),  # Helper function to add emojis
                    "severity": concern["severity"],
                    "description": concern["description"]
                }
                for concern in result.get("concerns", [])
            ],
            "recommendations": result.get("recommendations", [])
        }
        
        return processed_result
    
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Log and return a generic error for other exceptions
        logger.error(f"Error analyzing image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error analyzing image: {str(e)}")

def preprocess_image(img: Image.Image):
    """
    Preprocess image for SkinGPT-4 model
    """
    # This preprocessing will depend on the SkinGPT-4 model requirements
    # Common preprocessing steps might include:
    # - Resizing to model's expected dimensions
    # - Converting to RGB if needed
    # - Normalizing pixel values
    # - Converting to tensor format
    
    # Example preprocessing (adjust based on actual model requirements):
    img = img.convert('RGB')  # Ensure RGB format
    img = img.resize((224, 224))  # Resize to model's expected input size
    
    # For PyTorch models, you might convert to tensor:
    # import torchvision.transforms as transforms
    # transform = transforms.Compose([
    #     transforms.ToTensor(),
    #     transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    # ])
    # img_tensor = transform(img)
    
    return img  # Return preprocessed image

def get_emoji_for_concern(concern_name: str) -> str:
    """
    Return an appropriate emoji for each skin concern
    """
    concern_emojis = {
        "Fine Lines": "👵",
        "Wrinkles": "👵",
        "Hyperpigmentation": "🟤",
        "Dark Spots": "🟤",
        "Dehydration": "💧",
        "Dryness": "💧",
        "Acne": "🔴",
        "Blemishes": "🔴",
        "Redness": "🔺",
        "Inflammation": "🔺",
        "Oiliness": "💦",
        "Large Pores": "⚫",
        "Uneven Texture": "📊",
        "Uneven Tone": "🔶",
    }
    
    # Default emoji if concern not in dictionary
    return concern_emojis.get(concern_name, "❓")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
