import { Injectable } from '@angular/core';
import { Contato } from '../componentes/contato/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private contatos: Contato[] = [
    {"id": 1, "nome": "Ana", "telefone": "29 278869420", "email": "ana@example.com"},
  ]

  constructor() {
    // Carrega os contatos do localStorage, se existirem
    const contatosLocalStorageString = localStorage.getItem('contatos');
    // JSON.parse é necessário para converter a string em array
    const contatosLocalStorage = contatosLocalStorageString ? JSON.parse(contatosLocalStorageString) : null;
    this.contatos = contatosLocalStorage || this.contatos;

    // salvar contatos no localStorage
    // JSON.stringfy é necessário para converter o array em string
    localStorage.setItem('contatos', JSON.stringify(this.contatos));
  }

  obterContatos(): Contato[] {
    return this.contatos;
  }

  salvarContato(contato: Contato) {
    this.contatos.push(contato);
    // atualizar o localStorage
    localStorage.setItem('contatos', JSON.stringify(this.contatos));
  }

  
}
