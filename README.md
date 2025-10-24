# Senior Full-stack engineer Interview Solution

- Company name: Itransistion
- Position: Senior Full-stack engineer
- Location: Remote
- Type: Full-time
- Task start date: 23rd October 2025
- Deadline: 27th October 2025

This repo contains solution for the problem statement provided by itransition for senior full-stack interview.

## Problem Statement

### Drug Info

#### Description

Create a React application that allows users to view a table with drug information and filter it by company.

The table consists of 5 columns:
- unique drug id,
- drug code,
- combination of drug generic name and drug brand name,
- company name,
- launch date.

For example, this row

`{"code":"0006-0568","genericName":"vorinostat","company":"Merck Sharp & Dohme Corp.","brandName":"ZOLINZA","launchDate":"2004-02-14T23:01:10Z"}`

should be displayed as

|   Id  |   Code        |   Name                    |   Company                     |   Launch Date |
|-------|---------------|---------------------------|-------------------------------|---------------|
|   1   |   0006-0568   |   vorinostat (ZOLINZA)    |   Merck Sharp & Dohme Corp.   |   14.02.2004  |

Table columns are configurable and based on table configuration

The table configuration is fetched from the backend.

The data is ordered by descending launch date.

The company filter is a drop down list with all distinct company names present in drug data.
The company filter can also be applied by clicking on a company in the table.

Launch Dates should be formatted according to the user's locale settings.

#### Frontend

Add a unit test that checks the filtering.
Suggested tools are Material UI, jest, RTL, but feel free to use any other tools.

#### Backend

Create endpoints:
- for the table configuration,
- for the data.
  Suggested frameworks are Serverless or Express, but feel free to use any other Node.js frameworks.

#### Data

Drug data can be found in the attached file.
Upload it into a database of your choosing (postgres, mysql, MongoDB or any other).

#### Deployment

No need to deploy the frontend or the backend, unless you prefer to.
Otherwise it's enough to be able to run everything locally.

#### Version Control && Sharing Results

Upload your code to a public repository/repositories on GitHub and share the links.
Or share a git bundle.