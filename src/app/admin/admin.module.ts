import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AdminComponent } from './admin.component';
import {
  CanActivateAdminGuard,
  UsersService,
  RolesService,
  TimingsService
} from './services';

import {
  UsersPage,
  LibsPage,
} from './pages';

import {
  UserEditComponent,
  RoleEditComponent,
  RoleDeleteComponent,
  RolesComponent,
  TimingsComponent,
  TimingDeleteComponent,
  ProjectsComponent,
  UserDeleteComponent
} from './components';
import { HumanizeDatePipe } from '../core/pipes/humanizeDate.pipe';
import { MapComponent } from '../core/components';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    SharedModule,
    AdminRoutingModule
  ],
  providers: [
    CanActivateAdminGuard,
    UsersService,
    RolesService,
    TimingsService
  ],
  declarations: [
    AdminComponent,
    UsersPage,
    RolesComponent,
    TimingsComponent,
    TimingDeleteComponent,
    ProjectsComponent,
    UserEditComponent,
    RoleEditComponent,
    RoleDeleteComponent,
    TimingsComponent,
    LibsPage,
    UserDeleteComponent,
    HumanizeDatePipe,
    MapComponent,
  ],
  entryComponents: [
    UserEditComponent,
    RoleEditComponent,
    RoleDeleteComponent,
    TimingDeleteComponent,
    UserDeleteComponent
  ]
})
export class AdminModule { }
