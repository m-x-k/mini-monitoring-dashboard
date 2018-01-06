# Mini Monitoring Dashboard

## Requirements

* Python 2/3
* Pip
* Nodejs
* Npm
* Virtualenvwrapper


## Development Setup

From the root of the project run:

```sh
mkvirtualenv
pip install -r requirements.txt
pip install -r requirements_test.txt
```

### Javascript development

#### Dependencies

To install the javascript production dependencies (i.e. React, Axios) and development dependencies (i.e. webpack):

```sh
npm install
```

#### Transpile

The dashboard uses `ReactJS` and `Axios` to render the example services json.
To quickly rebuild/transpile the `app.jsx` file execute `webpack` on the command line.
If you want to use a watcher to detect changes and automatically rebuild you can run the command:

```sh
webpack -wd
```

## Run

To start the python application:
```sh
cd src/
python app.py
```

Then you should now be able to display the Mini Monitoring Dashboard using:
http://localhost:7001

---

[RETURN TO MAIN README](../README.md)
