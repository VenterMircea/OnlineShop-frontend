import { UserDetailsComponent } from './user-details/user-details.component';
import { MaterialModule } from '../../modules/material/material.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    MaterialModule,
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    UserDetailsComponent,
  ],
})
export class AccountModule {}
