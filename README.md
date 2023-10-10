[![Install & test frontend project](https://github.com/arf1e/fs16_6-frontend-project/actions/workflows/nodejs-test.yml/badge.svg)](https://github.com/arf1e/fs16_6-frontend-project/actions/workflows/nodejs-test.yml)

# Introduction

Frontend of a non-existent 2nd-hand platform.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

## Table of content

- [Architecture](#architecture)
- [Technologies](#technologies)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Deployment link](#deployment-link)

## Architecture

![Architecture image](https://i.ibb.co/xjbNcgc/README-md.png)

## Technologies

- Typescript
- React
- Redux (Toolkit)
- React Router
- styled-components
- Material UI
- Formik & Yup
- RTK-Query

## Project structure

```
.
├── public
└── src
    ├── apis
    ├── assets
    │   └── img
    ├── components
    ├── config
    ├── hooks
    ├── pages
    ├── slices
    ├── styles
    │   └── styled
    ├── test
    │   ├── __fixtures__
    │   ├── mocks
    │   └── slices
    ├── types
    └── utils
```

## Getting started

1. Clone this repo with `git clone https://github.com/arf1e/fs16_6-frontend-project.git` command.
1. Install project dependencies using `npm ci` or `npm install` command.
1. Run the app with `npm start`.

This project also has some `make` scripts, mostly for testing/dev purposes:

- `make lint` checks for ESLint errors & warnings in `src` directory;
- `make test` runs tests with `--verbose` and `--watchAll=false` flags;
- `make test-coverage` creates test coverage report (currently for the `slices` dir only).

## Deployment link

Visit [this link](https://fe-deploy-pearl.vercel.app/) to see this app live.
