from fastapi import APIRouter, Depends, UploadFile, HTTPException, File
from auth.auth import get_current_user
from .schema import Image
from PIL import Image as PILImage
from io import BytesIO
from fastapi.responses import StreamingResponse

router = APIRouter(
    prefix='/images',
    tags=['Images'],
)

VALID_FORMATS = {"BMP", "DDS", "GIF", "ICO", "JPEG", "PNG", "WEBP", "JPG", "TIFF", "PCX"}

@router.post('/compress-images')
async def compres_images(current_user = Depends(get_current_user), 
                         file: UploadFile = File(...), options: Image = Depends()):
    if options.format.upper() not in VALID_FORMATS:
        raise HTTPException(status_code=400, detail="Formato no permitido")
    try:
        image = PILImage.open(file.file)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error al procesar la imagen")
    
    if options.format.upper() == "JPEG" and image.mode in ("RGBA", "P"):
        image = image.convert("RGB")

    compressed_image = BytesIO()
    image.save(compressed_image, format=options.format, quality=options.quality, optimize=True)
    compressed_image.seek(0)

    return StreamingResponse(compressed_image, media_type=f"image/{options.format.lower()}")
