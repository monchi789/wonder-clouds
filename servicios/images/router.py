from fastapi import FastAPI, APIRouter, Depends, UploadFile, HTTPException, File
from fastapi.responses import JSONResponse
from auth.auth import get_current_user
from .schema import Image
from PIL import Image as PILImage
from io import BytesIO
import zipfile
import base64

app = FastAPI()

router = APIRouter(
    prefix='/images',
    tags=['Images'],
)

VALID_FORMATS = {"BMP", "DDS", "GIF", "ICO", "JPEG", "PNG", "WEBP", "JPG", "TIFF", "PCX"}

@router.post('/compress-images')
async def compress_images(
    current_user = Depends(get_current_user),
    files: list[UploadFile] = File(...),
    options: Image = Depends()
):
    if options.format.upper() not in VALID_FORMATS:
        raise HTTPException(status_code=400, detail="Formato no permitido")

    compressed_images = []
    
    for file in files:
        try:
            image = PILImage.open(file.file)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error al procesar la imagen: {file.filename}")
        
        if options.format.upper() == "JPEG" and image.mode in ("RGBA", "P"):
            image = image.convert("RGB")

        compressed_image = BytesIO()
        image.save(compressed_image, format=options.format, quality=options.quality, optimize=True)
        compressed_image.seek(0)
        
        compressed_images.append({
            "filename": file.filename,
            "content": base64.b64encode(compressed_image.getvalue()).decode('utf-8')
        })

    return JSONResponse(content={"compressed_images": compressed_images})

app.include_router(router)

