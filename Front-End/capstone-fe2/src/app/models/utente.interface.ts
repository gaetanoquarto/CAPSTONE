import { Amico } from "./amico.interface"
import { Notifica } from "./notifica.interface"
import { Provincia } from "./provincia.interface"

export interface Utente {
  id: number,
  nome: string,
  cognome: string,
  residenzaId: number,
  residenza: Provincia,
  email: string,
  username: string,
  password: string,
  attivo: boolean,
  immagineProfilo: string,
  notifiche: Notifica[],
  listaAmici: Amico[]
}
