from fastapi import HTTPException
from models import User

def create_user(user: User):
    # aqui você pode adicionar a lógica para criar um usuário no banco de dados
    # por exemplo, usando o SQLAlchemy ou outra biblioteca de ORM

    # caso ocorra algum erro, você pode levantar uma exceção com uma mensagem de erro
    raise HTTPException(status_code=400, detail="Erro ao criar usuário")
