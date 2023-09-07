import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ArchivioService } from './database.service';
import { InserimentoComponent } from './inserimento/inserimento.component';
import { Archivio } from './archivio';
import { RicercaComponent } from './ricerca/ricerca.component';

@Component({
  selector: 'root',
  standalone: true,
  imports: [CommonModule, InserimentoComponent, RicercaComponent],
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
})
export class RootComponent implements OnInit {
  vista = 'homepage';
  archivio = new Archivio([]);

  constructor(private as: ArchivioService) {}

  ngOnInit() {
    this.as.getData().subscribe({
      next: (x: string) => this.archivio.aggiornaInventario(x),
      error: (err: string) => console.error('Errore: ' + err),
      complete: () => {
        console.log(this.archivio);
      },
    });
  }

  CambiaVista(value: string): void {
    this.vista = value;
  }
}
