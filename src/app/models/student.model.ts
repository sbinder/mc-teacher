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

  constructor(STID: number, FName: string, LName: string, Group: number, Target: Date) {
    this.STID = STID;
    this.FName = FName;
    this.LName = LName;
    this.Group = Group;
    this.Target = Target;
  }
}
