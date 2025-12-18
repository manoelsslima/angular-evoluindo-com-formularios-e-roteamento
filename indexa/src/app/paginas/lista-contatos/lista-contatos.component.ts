import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { ContainerComponent } from '../../componentes/container/container.component';
import { ContatoComponent } from '../../componentes/contato/contato.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { FormularioContatoComponent } from '../formulario-contato/formulario-contato.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../componentes/contato/contato';

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
export class ListaContatosComponent implements OnInit {
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz';
  contatos: Contato[] = [];
  // two way data binding
  filtroPorTexto: string = '';

  // private: faz com que a variável seja declarada como propriedade da classe
  constructor(private contatoService: ContatoService) { }

  ngOnInit() {
    this.contatos = this.contatoService.obterContatos();
  }

  // remove os acentos de uma string
  removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

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
