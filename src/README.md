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

The dashboard uses `ReactJS` and `Axios` to render the example services json.
A small shell script has been provided to quickly rebuild/transpile the `app.jsx` file:

```sh
./rebuildJS.sh
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
