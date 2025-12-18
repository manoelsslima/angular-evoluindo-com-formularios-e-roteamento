import { Injectable } from '@angular/core';

interface Contato {
  id: number;
  nome: string;
  telefone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private contatos: Contato[] = [
    {"id": 1, "nome": "Ana", "telefone": "29 278869420"},
    {"id": 2, "nome": "Antônio", "telefone": "38 128451235"},
    {"id": 2, "nome": "Ágata", "telefone": "38 128451235"},
    {"id": 3, "nome": "Bruno", "telefone": "95 695521583"},
    {"id": 4, "nome": "Beatriz", "telefone": "25 854986459"},
  ]

  constructor() {
    // Carrega os contatos do localStorage, se existirem
    const contatosLocalStorageString = localStorage.getItem('contatos');
    // JSON.parse é necessário para converter a string de volta para array
    const contatosLocalStorage = contatosLocalStorageString ? JSON.parse(contatosLocalStorageString) : null;
    this.contatos = contatosLocalStorage || null;

    // salvar contatos no localStorage
    // JSON.stringfy é necessário para converter o array em string
    localStorage.setItem('contatos', JSON.stringify(this.contatos));
  }

  obterContatos(): Contato[] {
    return this.contatos;
  }

  
}
