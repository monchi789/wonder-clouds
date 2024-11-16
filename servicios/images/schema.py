from pydantic import BaseModel, Field, constr
from typing import Literal


# List of valids format of image
VALID_FORMATS = {"BMP", "DDS", "GIF", "ICO", "JPEG", "PNG", "WEBP", "TIFF", "PCX"}

class Image(BaseModel):
    format: Literal["BMP", "DDS", "GIF", "ICO", "JPEG", "PNG", "WEBP", "TIFF", "PCX"] = Field("JPEG", description="Formato de la imagen de salida")
    quality: int = Field(85, ge=1, le=100, description="Nivel de calidad de la imagen de salida (1-100)")
