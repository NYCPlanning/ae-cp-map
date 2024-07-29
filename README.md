# Capital Projects Map

Front end for Application Engineering's capital projects map.

## Dev setup
- `nvm use`
- `npm i`
- `npm run dev`

## E2E Testing
This application is currently configured to use Playwright for end to end testing. 

Tests should be kept in the `./tests` folder and can be run with the `npm run test` command.

The `playwright.config` is used to configure tests and can be used to select which browsers we run our tests on, including mobile.

## Deploying to QA environment
This repo has a [Github Action workflow](.github/workflows/qa.yml) that allows DCP engineers to deploy feature branches to a QA environment hosted at https://qa-capitalplanning.nycplanningdigital.com/. This can be helpful for getting feedback from QA and Design staff on branches _before_ they are merged into `main`. Because this environment is shared by the team, it is recommended that you confirm with other engineers that they are not using it before deploying.

To deploy to this environment:
1. Click the "Actions" tab at the top of the page for this repo
2. Select the "Deploy to quality assurance" workflow from the list on the left side of the page
3. Click "Run workflow"
4. Select the branch you want to deploy and click "Run workflow"

Once the workflow runs successfully, your branch should be deployed at https://qa-capitalplanning.nycplanningdigital.com/. 
