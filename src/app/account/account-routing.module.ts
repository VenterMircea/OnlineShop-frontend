import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
      path: '', component: LayoutComponent,
      children: [
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule, FormsModule, ReactiveFormsModule]
})
export class AccountRoutingModule { }
