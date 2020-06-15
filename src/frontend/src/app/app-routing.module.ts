import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './screens/list-users/list-users.component';
import { ConsultUserComponent } from './screens/consult-user/consult-user.component';
import { AddUserComponent } from './screens/add-user/add-user.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: ListUsersComponent
  },
  {
    path: 'usuario/novo',
    component: AddUserComponent
  },
  {
    path: 'consultar/:cpf',
    component: ConsultUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
