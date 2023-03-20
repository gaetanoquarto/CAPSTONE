import { Campo } from "./campo.interface";
import { Provincia } from "./provincia.interface";

export interface CentroSportivo {
  id: number,
  nomeCentroSportivo: string,
  cittaCentroSportivo: Provincia,
  indirizzo: string,
  listaCampi: Campo[]
}
