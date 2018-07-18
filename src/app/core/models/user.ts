import { Alias, Model } from 'tsmodels';
import { Image } from './image';
import { Role } from './role';
import { Timing } from './timing';

export interface IUsersIndex {
  users: User[];
  deletedUsers?: User[];
  roles: Role[];
}

export interface IUserEdit {
  user?: User;
  timings?: Timing[];
  roles?: Role[];
}

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
  @Alias('timing_id') public timingId: number;
  @Alias('timing', Timing) public timing: Timing;
  @Alias('role_id') public roleId: number;
  @Alias('role', Role) public role: Role;
  @Alias('avatar', Image) public avatar: Image;
  @Alias('slack_connected') public slackConnected: boolean;
  @Alias('timedoctor_connected') public timedoctorConnected: boolean;
  @Alias('upwork_connected') public upworkConnected: boolean;
  @Alias('agreement_accepted') public agreementAccepted: boolean;
  @Alias('registration_finished') public registrationFinished: boolean;
  @Alias('notify_update') public notifyUpdate: boolean;
  @Alias('invitation_token') public invitationToken: string;
  @Alias('slack_id') public slackID: string;

  constructor(user?) {
    super();

    if (user) {
      this._fromJSON(user);
    }
  }

  get fullName(): string {
    return `${this.name} ${this.surname}`;
  }

  public isRegistered(): boolean {
    return !this.invitationToken;
  }
}
