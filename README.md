# Capital Projects Map

Front end for Application Engineering's capital projects map.

# Running the project locally

### Dev setup:

### Ensure you're using the correct version of Node
The `.nvmrc` file tells you which version of node you should be using to run the project. If you're using [nvm](https://github.com/nvm-sh/nvm) and already have the correct version installed, you can switch by running  
 ```
 nvm use
```
from the root of this repo.

### Install dependencies
Once you have cloned this repo, install the necessary dependencies:
```
npm i
```

### Set up your `.env` file to point to a running instance of the [Zoning API](https://github.com/NYCPlanning/ae-zoning-api)
This project relies on data from a companion API known as the "Zoning API". You will need to set up a `.env` file pointing to a URL where an instance of the Zoning API is hosted. The easiest way to do this is to clone that repo and run it locally. To do that, follow these steps:

1. Go to the [GitHub repo](https://github.com/NYCPlanning/ae-zoning-api) for Zoning API
2. Follow the steps there to clone the project, run the API, and run its database using docker compose
3. Leave that Zoning API and its database running in a separate terminal, and navigate back to where you cloned this repo.
4. Back in your cloned copy of this repo, create a file called `.env` in the root folder of the project and copy the contents of `sample.env` into that new file. The default value in `sample.env` should set the Zoning API URL variable to the correct value for your locally running instance of Zoning API

### Run the project
Finally, to run this project locally:
```
npm run dev
```

## Pulling data from [Zoning API](https://github.com/NYCPlanning/ae-zoning-api)
This app relies heavily on data from the Zoning API backend application. It makes use of some front end libraries to make pulling data and managing the state of that data easier:

* [Axios](https://axios-http.com/docs/intro) - A framework-agnostic HTTP client for javascript and typescript applications
* [Kubb](https://www.kubb.dev/introduction) - A code generation library that reads [OpenAPI specification](https://www.openapis.org/) documents and generates typescript "client" libraries (sometimes also referred to as "SDKs"). It features a set of plugins to generate code for various JS/TS libraries, including Axios. By pointing Kubb at the [OpenAPI document for Zoning API](https://github.com/NYCPlanning/ae-zoning-api/blob/main/openapi/openapi.yaml), we can avoid writing a lot of boilerplate code.

### Regenerating the Zoning API client code
When the OpenAPI spec file for Zoning API changes, we will need to regenerate the client code in this repo. To do that, simply run `npm run kubb:generate`. Kubb is configured to put all generated code in `/app/gen`. Note that even though that code is generated, we do want to commit it and includes updates in PRs as necessary. A developer should **never** make manually changes or additions to code in the `/app/gen` folder. It should be purely what is outputted by Kubb.


Unless you think the contents of the Zoning API OpenAPI spec file have changed since the last time the client code was generated, you can safely skip this step.


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
