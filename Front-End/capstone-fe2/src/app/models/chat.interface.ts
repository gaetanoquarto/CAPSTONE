import { Messaggio } from "./messaggio.interface";

export interface Chat {
  id: number,
  messaggi: Messaggio[]
}
