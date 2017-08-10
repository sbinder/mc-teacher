export class Student {
  STID: number;
  Org: number;
  Target: Date;
  LName: string;
  FName: string;
  Gender: string;
  Parent: number;
  Teacher: number;
  Email: string;
  Aux1: string;
  Aux2: string;
  Aux3: string;
  Aux4: string;
  Username: string;
  Password: string;
  Expires: Date;
  Trial: boolean;
  Group: number;
  selected: boolean;

  constructor(id: number, fname: string, lname: string, group: number) {
    this.STID = id;
    this.FName = fname;
    this.LName = lname;
    this.Group = group;
  }
}
