import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../shared/sidebar';
import { CurrentUserService } from './services/current-user.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './core.component.html',
  styleUrls: []
})
export class CoreComponent implements OnInit {

  constructor(private sideBarService: SidebarService,
              private _currentUser: CurrentUserService) {
  }

  ngOnInit() {
    this.sideBarService
      .add([
        { name: 'Members List', single: true, icon: 'fa-users', link: ['/'] },
        {
          name: 'Updates',
          single: true,
          icon: 'fa-telegram',
          link: ['/updates']
        },
        {
          name: 'Reports',
          single: false,
          icon: 'fa-file-text',
          items: [
            { name: 'Service load', link: ['/reports/service-load'] },
            { name: 'Timesheet', link: ['/reports/timesheet'] }
          ]
        }
      ]);
    if (this._currentUser.role.isAdmin) {
      this.sideBarService
        .add(
          {
            name: 'Administrate',
            icon: 'fa-wheelchair',
            single: false,
            items: [
              { name: 'Users', link: ['/admin', 'users'] },
              { name: 'Roles', link: ['/admin', 'roles'] }
            ]
          }
        );
    }
  }
}
