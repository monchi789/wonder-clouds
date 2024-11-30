import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from images import router as router_images
from emails import router as email_router
from dotenv import load_dotenv

# Cargar variables del archivo .env
load_dotenv()

app = FastAPI(
    title='Servicios Wonder Clouds'
)

# Obtener los orígenes permitidos desde las variables de entorno
origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

# Configuración del middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True, 
    allow_methods=["*"],    
    allow_headers=["*"],    
    expose_headers=["*"],   
    max_age=3600
)

# Incluir routers
app.include_router(router_images.router)
app.include_router(email_router.router)
