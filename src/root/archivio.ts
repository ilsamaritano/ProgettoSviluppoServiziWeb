import { Volume } from './volume';

export class Archivio {
  constructor(public inventario: Volume[]) {}

  // Aggiorna l'inventario dell'archivio con i dati JSON forniti.
  aggiornaInventario(json: string): void {
    const datiDaAggiungere: any[] = JSON.parse(json);

    // Utilizza map (piuttosto che una funzione iterativa) per creare nuovi oggetti Volume e concatena l'array risultante all'inventario esistente.
    this.inventario = this.inventario.concat(
      datiDaAggiungere.map((item: any) =>
        new Volume(item.autore, item.titolo, item.posizione, item.nominativo)
      )
    );
  }

  // Aggiunge un nuovo libro all'inventario.
  aggiungiLibro(
    autore: string,
    titolo: string,
    posizione: string,
    nominativo: string
  ): void {
    this.inventario.push(new Volume(autore, titolo, posizione, nominativo));
  }

  // Trova i libri che corrispondono all'espressione regolare fornita.
  trovaLibri(regex: RegExp): Volume[] {
    return this.inventario.filter((libro) =>
      this.corrispondeRicerca(libro, regex)
    );
  }

  // Funzione interna per la ricerca.
  private corrispondeRicerca(libro: Volume, regex: RegExp): boolean {
    const stringaRicerca: string = `${libro.titolo} ${libro.autore} ${libro.posizione}`.toLowerCase();
    return regex.test(stringaRicerca);
  }

  // Rimuove un libro dall'inventario in base all'autore, al titolo e alla posizione.
  rimuoviLibro(autore: string, titolo: string, posizione: string): void {
    // Utilizza findIndex per trovare l'indice del libro da rimuovere.
    const index = this.inventario.findIndex(
      (item) =>
        item.autore === autore &&
        item.titolo === titolo &&
        item.posizione === posizione
    );

    // Rimuovi il libro utilizzando splice se l'indice è valido.
    if (index !== -1) {
      this.inventario.splice(index, 1);
    }
  }
}
