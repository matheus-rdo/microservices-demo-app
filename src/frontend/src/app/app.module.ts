import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { ListUsersComponent } from './screens/list-users/list-users.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ConsultUserComponent } from './screens/consult-user/consult-user.component';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    ConsultUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzTableModule
  ],
  providers: [{ provide: NZ_I18N, useValue: pt_BR }],
  bootstrap: [AppComponent]
})
export class AppModule { }
