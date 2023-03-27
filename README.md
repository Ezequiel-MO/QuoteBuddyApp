[![CI/CD](https://github.com/Ezequiel-MO/2022_june_cuttevents_backoffice/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Ezequiel-MO/2022_june_cuttevents_backoffice/actions/workflows/ci-cd.yml)

to be removed

## About the Project

This app will be a tool for agencies in the MICE Industry that will allow them to pitch for new business in a web-based format, replacing the traditional PowerPoint + Excel approach

## Getting Started

1. Clone the repo
2. Install dependencies
3. The only env variable you need to set is `VITE_BACKEND_URL=https://backendcuttevents.herokuapp.com/`
4. Run `npm run dev` to start the dev server

## Deployed Version

The app is deployed on Netlify at https://cuttevents-backoffice.netlify.app/

To temporarily login, use the following credentials:

```json
{
	"email": "minerva@cutt.events",
	"password": "minerva@cutt.events"
}
```

## Git Flow

1. When new features or fixes are required, we create a new issue
2. Issues are assigned to at least 1 collaborator
3. The number of the issue is created as a new branch name, following git branch naming conventions:
   [Git Branch Naming Conventions](https://deepsource.io/blog/git-branch-naming-conventions/)
4. I have already created a branch for each issue, so you can just fetch origin and checkout the branch
5. Once the issue is resolved, a new pull-request (PR) from your branch to develop is required
6. Please assign me as a reviewer to the PR, and I will review the code and merge it to develop if it's ok
7. Once the PR is merged, the issue is closed

---

## Very brief documentation on projects endpoint

To request a project, you need to send a GET request to the following endpoint:

`const response = await baseAPI.get(`/v1/projects?code=${password}`)`

where the baseAPI is [BackEnd URL](https://backendcuttevents.herokuapp.com)

### Request example

[Click here for an example of a response if you introduce BMMTEST2011 as a password in the login](https://backendcuttevents.herokuapp.com/v1/projects?code=BMMTEST2011)

- Here are a few more codes that you can use to see more examples

  1.  DKBCN2022MO022
  2.  ROBCN2022MS0007
  3.  SEBCN2022MM026
