import { TeacherPage } from './app.po';

describe('teacher App', () => {
  let page: TeacherPage;

  beforeEach(() => {
    page = new TeacherPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
