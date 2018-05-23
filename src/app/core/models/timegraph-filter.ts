import { Alias, Model } from 'tsmodels';

export const TimeGraphTypes = {
  timeDoctor: {
    id: 1, title: 'TimeDoctor'
  },
  upWork: {
    id: 2, title: 'UpWork'
  },
};

interface Filter {
  source?: number;
  startDate?: Date;
  endDate?: Date;
}

export class TimeGraphFilter extends Model {
  @Alias() public id: number;
  @Alias() public source?: number;
  @Alias('start_date') public startDate?: string;
  @Alias('end_date') public endDate?: string;

  constructor(filter: Filter = {}) {
    super();

    const now = new Date();

    if (!filter.startDate) {
      this.startDate = new Date(
        now.getFullYear() - 1, now.getMonth(), now.getDate()
      ).toISOString().substr(0, 10);
    } else {
      this.startDate = filter.startDate.toISOString().substr(0, 10);
    }

    if (!filter.endDate) {
      this.endDate = now.toISOString().substr(0, 10);
    } else {
      this.endDate = filter.endDate.toISOString().substr(0, 10);
    }

    this.source = filter.source;
  }
}
