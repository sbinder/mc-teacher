export class Prayer {
  taskid: number;
  org: number;
  taskname: string;
  ordinal: number;
  groupa: boolean;
  groupb: boolean;
  groupx: boolean;
  active: boolean;

  constructor(taskid: number, org: number, taskname: string, ordinal: number,
      groupa: boolean = false, groupb: boolean = false,
      groupx: boolean = false, active: boolean = true) {
    this.org = org;
    this.taskid = taskid;
    this.taskname = taskname;
    this.ordinal = ordinal;
    this.active = active;
    this.groupa = groupa;
    this.groupb = groupb;
    this.groupx = groupx;
  }
}
