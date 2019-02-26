[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.1488413.svg)](https://doi.org/10.5281/zenodo.1488413)

# Empirica

https://empirica.ly/

Open source project to tackle the problem of long development cycles required to
produce software to conduct multi-participant and real-time human experiments
online.

## We are in Beta

This is a REAL beta - this means that you will be using a version of Empirica
that is not yet ready for public release and still lacks proper documentation
and examples. You should be prepared to find things which don't work perfectly,
so please give us feedback on how to make them better. You can provide us with
feedback by sending an email to hello@empirica.ly or by
[creating an issue on GitHub](https://github.com/empiricaly/create-empirica-app/issues).
The more feedback you give us, the better!

---

# Create Empirica App

The easy way to create an Empirica app.

## Quick Start

You’ll need to have Node.js >= 8 on your local development machine. See
[Usage](#usage) bellow if you don't have it installed.

```sh
npx create-empirica-app my-experiment
cd my-experiment
meteor
```

Then open http://localhost:3000/ to see your experiment.

## Usage

`create-empirica-app` requires Node.js >= 8. If you don't already have Node.js
8+ setup, we recommend you use the official installer:
https://nodejs.org/en/download/.

Then you can simply run the following command, where `my-experiment` is the name
of the experiment you wish to create:

```sh
npx create-empirica-app my-experiment
```

It will create a directory called `my-experiment` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and
install the transitive dependencies:

```
my-experiment
├── .meteor
├── README.md
├── node_modules
├── package.json
├── package-lock.json
├── .gitignore
├── public
├── client
│   ├── main.html
│   ├── main.js
│   ├── main.css
│   ├── game
│   │   └── ...
│   ├── intro
│   │   └── ...
│   └── exit
│       └── ...
└── server
    ├── main.js
    ├── callbacks.js
    └── bots.js
```

No configuration or complicated folder structures, just the files you need to
build your app. Once the installation is done, you can open your project folder:

```sh
cd my-experiment
```

Inside the newly created project, you can run the standard `meteor` command to
start you app locally:

```sh
meteor
```

`meteor` runs the app in development mode.<br> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br> You will
see the build errors in the console.

## Updating Empirica Core

As new versions of Empirica become available, you might want to update the
version you are using in your app. To do so, simply run:

```sh
meteor update empirica:core
```

## Development

To run an Empirica app against a development version of `empirica:core`, you
will need to use the
[`METEOR_PACKAGE_DIRS` environment variable](https://docs.meteor.com/environment-variables.html#METEOR-PACKAGE-DIRS).
From an Empirica app, simply point to your copy of `empirica:core` as so (in
this example, your `meteor-empirica-core` dir would be a child of
`/usr/local/my_packages/`, .i.e `/usr/local/my_packages/meteor-empirica-core`):

```sh
METEOR_PACKAGE_DIRS="/usr/local/my_packages/" meteor
```

For more information on how to contribute please take a look at our
[contribution guide](./.github/CONTRIBUTING.md).


## Citing Empirica
If you use Empirica in a scientific publication, we would appreciate citing the following:

Nicolas Paton, & Abdullah Almaatouq. (2018, November 15). Empirica: Open-Source, Real-Time, Synchronous, Virtual Lab Framework (Version v0.0.5). Zenodo. http://doi.org/10.5281/zenodo.1488413

### Bibtex entry:
```
@misc{nicolas_paton_2018_1488413,
  author       = {Nicolas Paton and
                  Abdullah Almaatouq},
  title        = {Empirica: Open-Source, Real-Time, Synchronous, 
                   Virtual Lab Framework},
  month        = nov,
  year         = 2018,
  doi          = {10.5281/zenodo.1488413},
  url          = {https://doi.org/10.5281/zenodo.1488413}
}
```




