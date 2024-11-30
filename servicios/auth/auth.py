from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from jose import JWTError, jwt
from .schema import TokenData
from .config import settings
from datetime import datetime, timezone

# Define the security
security = HTTPBearer()

# Set the security with HTTPBaerer
def verify_token(token: str) -> TokenData:
    try:
        payload = jwt.decode(token, settings.jwt_access_secret, algorithms=[settings.jwt_algorithm])
        
        # Validate the data on the payload
        email = payload.get("email")
        rol = payload.get("rol")
        user_id = payload.get("id")
        exp = payload.get("exp")
        
        if email is None or rol is None or user_id is None or exp is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido o faltan datos en el token"
            )
        
        # Verify the expiration date
        current_time = datetime.now(timezone.utc)
        expiration_time = datetime.fromtimestamp(exp, tz=timezone.utc)
        if current_time >= expiration_time:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expirado"
            )
        
        return TokenData(email=email, rol=rol, id=user_id)
    
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token no válido o expirado"
        )

async def get_current_user(token: str = Depends(security)) -> TokenData:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales no válidas",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token_data = verify_token(token.credentials)
        return token_data
    except JWTError:
        raise credentials_exception
