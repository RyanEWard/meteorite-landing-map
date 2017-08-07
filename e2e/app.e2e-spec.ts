import { MeteoriteLandingMapPage } from './app.po';

describe('meteorite-landing-map App', () => {
  let page: MeteoriteLandingMapPage;

  beforeEach(() => {
    page = new MeteoriteLandingMapPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
