from fastapi import APIRouter, HTTPException
from bson import ObjectId

from models import Moto, UpdateMoto
from database import (
    get_one_moto_id,
    get_one_moto_placa,
    get_todas_motos,
    create_moto,
    update_moto,
    delete_moto,
)


router = APIRouter(prefix="/api/motos", tags=["Motos"])


def validar_id(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=404, detail="Moto no encontrada")


@router.get("")
async def listar_motos():
    return await get_todas_motos()


@router.get("/{id}")
async def obtener_moto(id: str):
    validar_id(id)
    moto = await get_one_moto_id(id)
    if not moto:
        raise HTTPException(status_code=404, detail="Moto no encontrada")
    return moto


@router.post("")
async def crear_moto(moto: Moto):
    if await get_one_moto_placa(moto.placa_moto):
        raise HTTPException(status_code=400, detail="Ya existe una moto con esa placa")

    return await create_moto(moto.model_dump())


@router.put("/{id}")
async def actualizar_moto(id: str, moto: UpdateMoto):
    validar_id(id)
    cambios = {k: v for k, v in moto.model_dump().items() if v is not None}

    if not cambios:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")

    if not await get_one_moto_id(id):
        raise HTTPException(status_code=404, detail="Moto no encontrada")

    return await update_moto(id, cambios)


@router.delete("/{id}")
async def eliminar_moto(id: str):
    validar_id(id)
    if await delete_moto(id):
        return {"mensaje": "Moto eliminada correctamente"}
    raise HTTPException(status_code=404, detail="Moto no encontrada")