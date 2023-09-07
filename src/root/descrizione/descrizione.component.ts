import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxError, AjaxResponse } from 'rxjs/ajax';
import { ArchivioService } from '../database.service';
import { Archivio } from '../archivio';
import { Volume } from '../volume';

@Component({
  standalone: true,
  selector: 'descrizione',
  templateUrl: './descrizione.component.html',
  styleUrls: ['./descrizione.component.css'],
  imports: [CommonModule],
})
export class DescrizioneComponent {
  @Input() indiceVolume: any = null;
  @Input() volumeTrovato: Volume = new Volume('', '', '', '');
  @Input() archivio: Archivio = new Archivio([]);
  @Input() vista: string = '';
  @Output() cambioVista: EventEmitter<string> = new EventEmitter<string>();

  constructor(private as: ArchivioService) {}

  // Invia i dati dell'archivio al database.
  private inviaDati(): void {
    this.as.sendData(JSON.stringify(this.archivio.inventario)).subscribe({
      next: (res: AjaxResponse<any>) => console.log(res.response),
      error: (err: AjaxError) => console.error(err.response),
      complete: () => {
        console.log('Salvato');
      },
    });
  }

  gestisciAzione(restituisci: boolean, nome?: string): void {
    if (restituisci) {
      // Restituzione del libro.
      this.archivio.inventario[this.indiceVolume].nominativo = '';
    } else {
      // Prestito o rimozione del libro.
      if (nome) {
        // Se un nome è fornito, è un prestito.
        this.archivio.inventario[this.indiceVolume].nominativo = nome;
      } else {
        // Altrimenti, è una rimozione.
        const { autore, titolo, posizione } = this.volumeTrovato;
        this.archivio.rimuoviLibro(autore, titolo, posizione);
        this.vista = 'homepage';
        this.cambioVista.emit(this.vista);
      }
    }
    this.inviaDati();
  }
}
