# jag-ecrc

Ministry of Attorney General - eCRC

[![Lifecycle:Retired](https://img.shields.io/badge/Lifecycle-Retired-d45500)]([<Redirect-URL>](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md))
[![Maintainability](https://api.codeclimate.com/v1/badges/d9e6b117e755e4e3fe7a/maintainability)](https://codeclimate.com/github/bcgov/jag-ecrc/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d9e6b117e755e4e3fe7a/test_coverage)](https://codeclimate.com/github/bcgov/jag-ecrc/test_coverage)

## Application Screenshots

### Homepage

<img width="755" alt="homepage" src="https://user-images.githubusercontent.com/55710226/80147946-23fc0280-8569-11ea-90fc-7864f92d3e0d.PNG">

### Organization Information

<img width="843" alt="orgverification" src="https://user-images.githubusercontent.com/55710226/80147955-26f6f300-8569-11ea-8a46-c586d9cc777f.PNG">

### Terms of Use

<img width="882" alt="tou" src="https://user-images.githubusercontent.com/55710226/80148189-848b3f80-8569-11ea-9f03-aaed01422e82.PNG">

### Login with your BC Services Card

![bcscredirect](https://user-images.githubusercontent.com/55457785/146273694-4c92aa33-12a6-4a20-b186-9ea5d2b946cc.PNG)

### BC Services Card Test Site

<img width="736" alt="bcsc" src="https://user-images.githubusercontent.com/55710226/80238945-2ebfa180-8614-11ea-9d86-7d8564daf13c.PNG">

### Application Form

<img width="810" alt="appform" src="https://user-images.githubusercontent.com/55710226/80238957-32532880-8614-11ea-8cbf-333f531b51e1.PNG">

### Information Review

<img width="816" alt="inforeview" src="https://user-images.githubusercontent.com/55710226/80238974-3717dc80-8614-11ea-80a4-d3790526f355.PNG">

### Consent

<img width="819" alt="consent" src="https://user-images.githubusercontent.com/55710226/80238981-3b43fa00-8614-11ea-984c-85d988d46bb7.PNG">

### Application Complete (Success/Failure)

<img width="607" alt="success" src="https://user-images.githubusercontent.com/55710226/80238985-3da65400-8614-11ea-862c-3e44908b377a.PNG">

## Frontend Folder Structure

The folder structure for the frontend react application will be as follows:

```
my-app
├── build
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
├── .gitignore
├── package.json
└── README.md
```

- `build` is the location of the final, production-ready build.
- `public` is where the static files will reside.
- `src` is where the dynamic files will reside.

`src` will look something like this:

```
src
├── components
│   └── app
│   │   ├── app.css
│   │   ├── app.js
│   │   └── app.test.js
│   └── index.js
├── images
│   └── logo.svg
├── index.css
├── index.js
└── service-worker.js
```

All the react components will be found in the `components` directory. The `components/index.js` file will serve as a barrel through which all sibling components are exported.

Since we are using storybook and CDD, each component will be its own directory with the component code, styling, tests, as well as `.stories.js` file.

This is pretty much what `create react app` provides out of the box, except slightly modified and adjusted to better suit CDD and focusing on component-first design and development.

## Backend Folder Structure

The backend API will follow the standard Java Spring Boot MVC model for folder structure breakdown where there are `models` and `controllers`. 

## Authors

- Taylor Clausen
- Siva Karunakaran
- Shaun Millar
- Brendan Beach
- Kevin Ji
- Shreyas Devalapurkar
- Alan Dodge
- Peggy Zhang
- Adam Kroon
- Ebenezer Muthiah
- Suresh Gajendran

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
