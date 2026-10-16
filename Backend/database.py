
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from decouple import config

MONGO_URL = config("MONGO_URL", default="mongodb://localhost:27017")
cliente = AsyncIOMotorClient(MONGO_URL)


database = cliente.parqueaderodb
coleccion = database.motos


def serializar(moto):
    moto["_id"] = str(moto["_id"])
    return moto



async def get_one_moto_id(id: str):
    moto = await coleccion.find_one({"_id": ObjectId(id)})
    return serializar(moto) if moto else None


async def get_one_moto_placa(placa: str):
    moto = await coleccion.find_one({"placa_moto": placa})
    return serializar(moto) if moto else None



async def get_todas_motos():
    motos = []
    cursor = coleccion.find({})
    async for documento in cursor:
        motos.append(serializar(documento))
    return motos



async def create_moto(moto: dict):
    nueva = await coleccion.insert_one(moto)
    creada = await coleccion.find_one({"_id": nueva.inserted_id})
    return serializar(creada)



async def update_moto(id: str, datos: dict):
    await coleccion.update_one({"_id": ObjectId(id)}, {"$set": datos})
    return await get_one_moto_id(id)



async def delete_moto(id: str):
    resultado = await coleccion.delete_one({"_id": ObjectId(id)})
    return resultado.deleted_count == 1