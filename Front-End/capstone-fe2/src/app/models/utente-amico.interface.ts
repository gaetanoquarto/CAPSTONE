import { Utente } from "src/app/models/utente.interface";
import { Amico } from "./amico.interface";

export interface UtenteAmico {
  id: number,
  idAmico: Amico,
  idUtente: Utente
}
