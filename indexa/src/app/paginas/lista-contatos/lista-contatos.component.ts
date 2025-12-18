import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { ContainerComponent } from '../../componentes/container/container.component';
import { ContatoComponent } from '../../componentes/contato/contato.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { FormularioContatoComponent } from '../formulario-contato/formulario-contato.component';
import agenda from '../../agenda.json';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Contato {
  id: number;
  nome: string;
  telefone: string;
}

@Component({
  selector: 'app-lista-contatos',
  standalone: true,
  imports: [
    FormularioContatoComponent,
    ListaContatosComponent,
    ContainerComponent,
    ContatoComponent,
    CabecalhoComponent,
    FormsModule,
    SeparadorComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './lista-contatos.component.html',
  styleUrl: './lista-contatos.component.css'
})
export class ListaContatosComponent {
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
