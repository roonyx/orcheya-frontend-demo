import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../../services/timesheet.service';

import * as moment from 'moment';
import { Moment } from 'moment';

import { User } from '../../../core/models/user';
import {
  UsersListResponse, UsersListService
} from '../../../core/services/users-list.service';

import { TimesheetFilter } from '../../models/timesheet-filter';
import { TimesheetRow } from '../../models/timesheet';

@Component({
  templateUrl: './timesheet.page.html',
  styleUrls: ['./timesheet.page.scss']
})
export class TimesheetPage implements OnInit {
  public timesheetRows: TimesheetRow[];

  public users: User[];
  public days: Moment[];
  private filter = new TimesheetFilter();

  private getTimesheetDelay;

  constructor(
    private timesheetService: TimesheetService,
    private usersListService: UsersListService,
  ) {}

  ngOnInit() {
    this.filter.paid = false;

    this.setWeek();
    this.fetchUsers();
  }

  getTimesheet() {
    this.timesheetService.getTimesheet(this.filter)
      .subscribe(({timesheetRows}) => {
        this.timesheetRows = timesheetRows;
        this.days = this.daysRange();
      });
  }

  daysRange() {
    const first = moment(this.filter.dates[0]);
    const last = moment(this.filter.dates[1]);
    const res = [];

    for (let i = 0; i <= last.diff(first, 'days'); i++) {
      res.push(first.clone().add(i, 'day'));
    }

    return res;
  }

  findTime(user, day) {
    const worklog = user.worklogs.find(
      e => moment(e.date).isSame(moment(day), 'day')
    );
    return worklog ? worklog.time : 0;
  }

  setDates(startDate: Moment, endDate: Moment) {
    this.filter.dates = [
      moment(startDate).toDate(),
      moment(endDate).toDate()
    ];
  }

  setWeek() {
    this.setDates(moment().subtract(1, 'week'), moment().subtract(1, 'day'));
  }

  private fetchUsers() {
    this.usersListService.getUsersList()
      .subscribe((data: UsersListResponse) => {
        this.users = data.users;
      });
  }

  public FilterChanged() {
    clearTimeout(this.getTimesheetDelay);
    this.getTimesheetDelay = setTimeout(
      () => {
        console.log('aa');
        this.getTimesheet();
      }, 10
    );
  }

  public scrollbarWidth(user, day) {
    const eightHours = 28800;
    const width = this.findTime(user, day) * 100 / eightHours;
    return width > eightHours ? eightHours : width;
  }
}


