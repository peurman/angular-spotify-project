# SpotyBy Us

![main cover](/mainCover.png)

### - _Deploy_: **<a target="_blank" href="https://final-project-spotify-applaudo.vercel.app/" rel="noopener noreferrer">HERE</a>**

(created on February 2023)

## Angular Trainee Program - Final Project

This `Angular app` was created as the **`2-weeks Final Group Project`** of the **Angular Trainee Program** (we were a team of two)

It consumes the `Spotify REST API`, so you have to login with your **Spotify account** to use it, and also your email has to be included in our list of the developer dashboard.

The app is using `ngRx` (the library for Angular applications that is based on the popular Redux library) for global state management.

It also has an **_HTTP Interceptor_** to refresh the token that expires every 1 hour.

### Testing

The app also includes **unit tests** made with `Karma` and `Jasmine`.

You can run the tests with the command **_ng test_** and also get the overall coverage running **_ng test --code-coverage_**, and then opening the **index.html** file in the **coverage/final-project-spotify**.

### Next Steps

Soon I'll be **fixing the loaders**.

And I also will **refactor some components and styles**.

---

## Using this app

### Installing dependencies

First of all, you have to run the command `npm install` or `npm i` to install all the dependencies listed in the package.json file.

### Adding environment variables

You have to add the **`environment.development.ts` file** within the **_src/environments_** folder with these info:

    export const environment = {
      credentials: {
        clientId: 'your_client_ID',
        clientSecret: 'your_client_secret',
      },
      production: false,
      apiUrl: 'http://localhost:4200',
      isLocal: true,
    };

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Code scaffolding

Run `ng generate component component-name` to generate a new component (or **_ng g c component-name_** ).

You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
