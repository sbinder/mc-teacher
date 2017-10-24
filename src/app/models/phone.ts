export class Phone {
  digits = '';
  label = '';
  pid: number;

  public Format(): string {
    let prepre = '';
    const len = this.digits.length;
    const extra = 10 - len;
    if (this.digits.length < 10) { return this.digits; }
    const locale = this.digits.substr(len - 4, 4);
    const prefix = this.digits.substr(len - 7, 3);
    const area = this.digits.substr(len - 10, 3);
    if (extra > 0) {
      prepre = this.digits.substr(0, extra) + ' ';
    }
    return prepre + '(' + area + ') ' + prefix + '-' + locale;
  }
}
