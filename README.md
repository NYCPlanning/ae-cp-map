# Capital Projects Map

Front end for Application Engineering's new capital projects map.

## Dev setup
- `nvm use`
- `npm i`
- `npm run dev`

## E2E Testing
This application is currently configured to use Playwright for end to end testing. 

Tests should be kept in the `./tests` folder and can be run with the `npm run test` command.

The `playwright.config` is used to configure tests and can be used to select which browsers we run our tests on, including mobile.
