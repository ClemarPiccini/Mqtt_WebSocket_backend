from fastapi import APIRouter
from controllers import create_user
from models import User

router = APIRouter()

@router.post("/users")
def create_user_route(user: User):
    return create_user(user)

