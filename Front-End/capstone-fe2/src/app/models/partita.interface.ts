import { CentroSportivo } from "./centro-sportivo.interface";
import { Chat } from "./chat.interface";
import { Utente } from "./utente.interface";

export interface Partita {
  id: number,
  centroSportivo: CentroSportivo,
  campo: string,
  organizzatore: string,
  nomePartita: string,
  listaPartecipanti: Utente[],
  tipoPartita: string,
  giornoPartita: Date,
  oraPartita: string,
  citta: string,
  chat: Chat
}
