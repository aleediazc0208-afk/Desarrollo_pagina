from pydantic import BaseModel
from typing import Optional


class Moto(BaseModel):
    placa_moto: str            
    cascos_guardados: int      
    tarifa_hora: float         
    liquidado: bool = False   



class UpdateMoto(BaseModel):
    placa_moto: Optional[str] = None
    cascos_guardados: Optional[int] = None
    tarifa_hora: Optional[float] = None
    liquidado: Optional[bool] = None