import { Partita } from "./partita.interface";

export interface Notifica {
  id: number,
  tipoNotifica: string,
  idMittente: number,
  idDestinatario: number,
  partita: Partita,
  accettato: boolean
}
