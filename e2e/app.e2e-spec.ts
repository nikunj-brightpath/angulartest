import { SavvyPage } from './app.po';

describe('abp-zero-template App', function() {
  let page: SavvyPage;

  beforeEach(() => {
    page = new SavvyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getCopyright()).toEqual(new Date().getFullYear() + ' © Savvy.');
  });
});
