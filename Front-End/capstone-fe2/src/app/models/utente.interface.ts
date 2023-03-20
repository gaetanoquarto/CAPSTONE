export interface Utente {
  id: number,
  nome: string,
  cognome: string,
  residenzaId: number,
  email: string,
  username: string,
  password: string,
  attivo: boolean,
  immagineProfilo: string
}
