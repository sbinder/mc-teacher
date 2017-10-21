export class Student {
  stid: number;
  org: number;
  target: Date;
  lname: string;
  fname: string;
  male: boolean;
  parent: number;
  teacher: number;
  email: string;
  note: string;
  username: string;
  password: string;
  expires: Date;
  trial: boolean;
  group: number;
  torah: string;
  haftara: string;
  selected: boolean;
  present: boolean;

  constructor(stid: number = 0, fname: string = '', lname: string = '',
    group: number = 0, target: Date = new Date()) {
    this.stid = stid;
    this.fname = fname;
    this.lname = lname;
    this.group = group;
    this.target = target;
  }
}
