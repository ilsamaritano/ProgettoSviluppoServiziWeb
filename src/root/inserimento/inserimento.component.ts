import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AjaxError, AjaxResponse } from 'rxjs/ajax';
import { ArchivioService } from '../database.service';
import { Archivio } from '../archivio';

@Component({
  selector: 'inserimento',
  templateUrl: './inserimento.component.html',
  styleUrls: ['./inserimento.component.css'],
  standalone: true,
})
export class InserimentoComponent {
  // Input per il tipo di vista predefinito e l'oggetto Archivio.
  @Input() vista = '';
  @Input() archivio: Archivio = new Archivio([]);

  // Output per notificare il cambio di vista.
  @Output() cambiaVista: EventEmitter<string> = new EventEmitter<string>();

  // Messaggio da mostrare all'utente.
  messaggio = '';

  constructor(private as: ArchivioService) {}

  // Pulisce il messaggio e emette un evento di cambio vista.
  Pulisci(): void {
    this.messaggio = '';
    this.cambiaVista.emit(this.vista);
  }

  // Gestisce l'inserimento di un nuovo libro nell'archivio.
  Inserisci(autore: string, titolo: string, posizione: string): void {
    // Verifica se autore, titolo e posizione sono vuoti.
    if (!autore.trim() || !titolo.trim() || !posizione.trim()) {
      this.messaggio = 'Riempi tutti i campi!';
      return;
    }
    // Verifica se la posizione è già occupata da un altro libro.
    else if (
      this.archivio.inventario.some((item) => item.posizione === posizione)
    ) {
      this.messaggio = 'Posizione già occupata';
      return;
    }

    // Aggiunge il nuovo libro all'archivio.
    this.archivio.aggiungiLibro(autore, titolo, posizione, '');

    // Invia i dati aggiornati al database e gestisce le risposte.
    this.as.sendData(JSON.stringify(this.archivio.inventario)).subscribe({
      next: (res: AjaxResponse<any>) => console.log(res.response),
      error: (err: AjaxError) => console.error(err.response),
      complete: () => {
        console.log('Libro inserito');
      },
    });

    // Pulisce il messaggio e completa l'operazione di inserimento.
    this.Pulisci();
  }
}
