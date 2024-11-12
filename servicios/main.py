from fastapi import FastAPI
from images import router as router_images
from emails import router as email_router 

app = FastAPI(
    title='Servicios Wonder Clouds'
)

app.include_router(router_images.router)
app.include_router(email_router.router)
