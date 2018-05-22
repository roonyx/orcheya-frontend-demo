import { Alias, Model } from 'tsmodels';
import { Image } from './image';

/**
  This class describe of user model.
*/

export class User extends Model {
  @Alias() public id: number;
  @Alias() public email: string;
  @Alias() public name: string;
  @Alias() public surname: string;
  @Alias() public sex: string;
  @Alias() public birthday: string;
  @Alias() public phone: string;
  @Alias() public skype: string;
  @Alias() public github: string;
  @Alias() public bitbucket: string;
  @Alias() public timing: string;
  @Alias() public role: string;
  @Alias('avatar', Image) public avatar: Image;
  @Alias('slack_connected') public slackConnected: boolean;
  @Alias('timedoctor_connected') public timedoctorConnected: boolean;
  @Alias('upwork_connected') public upworkConnected: boolean;
  @Alias('agreement_accepted') public agreementAccepted: boolean;
  @Alias('registration_finished') public registrationFinished: boolean;
  @Alias('notify_update') public notifyUpdate: boolean;

  constructor(user?) {
    super();

    if (user) {
      this._fromJSON(user);
    }
  }

  get fullName(): string {
    return `${this.name} ${this.surname}`;
  }
}

export const positions = {
  developer: {
    title: 'Developer',
    id: 1,
  },
  hr: {
    title: 'HR',
    id: 2,
  },
  sales: {
    title: 'Sales',
    id: 3,
  },
  projectManager: {
    title: 'Project Manager',
    id: 4,
  },
  leadGeneration: {
    title: 'Lead Generation',
    id: 5,
  },
  ceo: {
    title: 'CEO',
    id: 6,
  },
  cto: {
    title: 'CTO',
    id: 7,
  },
  coo: {
    title: 'COO',
    id: 8,
  },
};
