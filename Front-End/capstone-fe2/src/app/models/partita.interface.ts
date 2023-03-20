import { CentroSportivo } from "./centro-sportivo.interface";
import { Utente } from "./utente.interface";

export interface Partita {
  id: number,
  centroSportivo: CentroSportivo,
  campo: string,
  organizzatore: Utente,
  nomePartita: string,
  listaPartecipanti: Utente[],
  tipoPartita: string,
  giornoPartita: Date,
  oraPartita: string,
  alCompleto: boolean,
  citta: string
}
