import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from "./componentes/container/container.component";
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { SeparadorComponent } from './componentes/separador/separador.component';
import { ContatoComponent } from './componentes/contato/contato.component';
import { FormsModule } from '@angular/forms';

import agenda from './agenda.json';

interface Contato {
  id: number;
  nome: string;
  telefone: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ContainerComponent,
    ContatoComponent,
    CabecalhoComponent,
    FormsModule,
    SeparadorComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz';
  contatos: Contato[] = agenda;

  // remove os acentos de uma string
  removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // two way data binding
  filtroPorTexto: string = '';

  filtrarContatosPorTexto(): Contato[] {
    if (!this.filtroPorTexto) {
      return this.contatos;
    }
    return this.contatos.filter(contato => this.removerAcentos(contato.nome.toLowerCase()).includes(this.removerAcentos(this.filtroPorTexto.toLocaleLowerCase())));
  }

  // one way data binding
  filtrarContatosPorLetraInicial(letra: string): Contato[] {
    //return this.contatos.filter(contato => contato.nome.toLocaleLowerCase().startsWith(letra.toLocaleLowerCase()));
    return this.filtrarContatosPorTexto().filter(contato => this.removerAcentos(contato.nome.toLocaleLowerCase()).startsWith(this.removerAcentos(letra.toLocaleLowerCase())));
  }
}
