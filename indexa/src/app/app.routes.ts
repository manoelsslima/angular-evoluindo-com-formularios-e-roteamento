import { Routes } from '@angular/router';
import { FormularioContatoComponent } from './paginas/formulario-contato/formulario-contato.component';
import { ListaContatosComponent } from './paginas/lista-contatos/lista-contatos.component';

export const routes: Routes = [
    // redirectTo: direciona para outra rota
    // pathMatch: 'full' significa que a rota deve ser exatamente igual
    // se usar prefix, qualquer rota que comece com '' (todas) vai redirecionar
    {
        path: '', redirectTo: 'lista-contatos', pathMatch: 'full'
    },
    {
        path: 'formulario', component: FormularioContatoComponent
    },
    {
        path: 'lista-contatos', component: ListaContatosComponent
    }
];
