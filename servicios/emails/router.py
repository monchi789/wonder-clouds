from fastapi import APIRouter
from .schema import ContactForm
from .services import EmailService


router = APIRouter(
    prefix='/email',
    tags=['Email']
)

@router.post('/contact')
async def contact(form_data: ContactForm):
    # Create an instance of EmailService
    email_service = EmailService()
    # Call the method on the instance
    return await email_service.process_contact_form(form_data)
