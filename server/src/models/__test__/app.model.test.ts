import { App } from '../app.model';

it("should convert app name to slug", () => {
  const appName1 = "My App 1";
  const formattedAppName1 = "my_app_1";

  const appName2 = "*1App";
  const formattedAppName2 = "1app";

  const appName3 = "This App Haş Weird Çharacterş";
  const formattedAppName3 = "this_app_has_weird_characters";

  const app1 = new App(appName1);
  const app2 = new App(appName2);
  const app3 = new App(appName3);

  expect(app1.name).toEqual(formattedAppName1);
  expect(app2.name).toEqual(formattedAppName2);
  expect(app3.name).toEqual(formattedAppName3);
});
