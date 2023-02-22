# React-admin Help Desk

This application is a fake a Help Desk for an imaginary refrigerator company with a few support agents. You can test it online at https://marmelab.com/react-admin-helpdesk. It is a demo of the [react-admin](https://github.com/marmelab/react-admin) library.

https://user-images.githubusercontent.com/99944/212743583-a4ee135f-f55b-4305-86c4-a3da1c49bb98.mov

React-admin usually requires a REST/GraphQL server to provide data. In this demo however, the API is simulated by the browser (using [FakeRest](https://github.com/marmelab/FakeRest)). The source data is generated at runtime using Faker.js, so the names and dates change each time you refresh your browser. This demo also simulates real-time activity using an in-memory store (it doesn't work across tabs).

To explore the source code, start with [src/App.tsx](https://github.com/marmelab/react-admin-helpdesk/blob/master/src/App.tsx).

## Running The Demo Locally

After cloning this repository, install the dependencies with:

```sh
yarn
```

**Note**: This application uses **React-admin Enterprise Edition** packages, so you'll need a valid subscription to run it. Check out the [Enterprise Edition documentation](https://marmelab.com/ra-enterprise/) for more information.

Then, run the application with:

```sh
yarn dev
```

## Publishing The Demo

The demo is published on [GitHub gh-pages](https://www.netlify.com/) at https://marmelab.com/react-admin-helpdesk.

To update the published demo, run:

```sh
yarn build
yarn deploy
```
