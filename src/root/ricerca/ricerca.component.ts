import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Archivio } from '../archivio';
import { ArchivioService } from '../database.service';
import { DescrizioneComponent } from '../descrizione/descrizione.component';
import { Volume } from '../volume';

@Component({
  selector: 'ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  standalone: true,
  imports: [CommonModule, DescrizioneComponent],
})
export class RicercaComponent {
  @Input() vista: string = '';
  @Input() archivio: Archivio = new Archivio([]);
  @Output() cambiaVista: EventEmitter<string> = new EventEmitter<string>();

  bloccoRicerca: boolean = true;
  risultati: number = 0;
  indiceVolume: any = null;
  volumeTrovato: Volume = new Volume('', '', '', '');

  constructor(private servizioArchivio: ArchivioService) {}

  // Gestisce l'input della ricerca
  RicercaSuInput(evento: any): void {
    const input = (evento.target as HTMLInputElement).value;
    const regex = new RegExp(input, 'i');
    const risultatiRicerca = this.archivio.trovaLibri(regex);

    if (input === '') {
      this.Pulisci();
    } else if (risultatiRicerca.length === 1) {
      this.gestisciRisultatoSingolo(risultatiRicerca);
    } else {
      this.risultati = risultatiRicerca.length;
    }
  }

  // Pulisce i risultati della ricerca e riporta alla home
  Pulisci(): void {
    this.vista = 'homepage';
    this.cambiaVista.emit('homepage');
    this.bloccoRicerca = true;
    this.risultati = 0;
  }

  gestisciRisultatoSingolo(risultati: Volume[]): void {
    this.volumeTrovato = risultati[0];
    this.indiceVolume = this.archivio.inventario.indexOf(this.volumeTrovato);
    this.bloccoRicerca = false;
  }
}
