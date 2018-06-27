import { Alias, Model } from 'tsmodels';
import { Worklog } from './worklog';

export class TimesheetRow extends Model {
  @Alias() public id: number;
  @Alias() public name: string;
  @Alias() public surname: string;
  @Alias() public worklogs: Worklog[];

  public get time(): number {
    return this.worklogs
      .map(e => e.time)
      .reduce((acc, time) => acc + time, 0);
  }
}