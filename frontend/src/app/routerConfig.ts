/** 
 * File: routerConfig.ts
 * Description: Arquivo reposnsavel pelas rotas de navegação do frontend
 * Author: Sérgio Peluzzi
 * Date: 2021-02-11
 */
import { Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { IndexComponent } from './components/index/index.component';

//Rotas com seus respectivos componentes
export const appRoutes: Routes = [
    { 
        path: 'create', 
        component: CreateComponent 
    },
    {
        path: 'edit/:id',
        component: EditComponent
    },
    { 
        path: 'index',
        component: IndexComponent
    }
];