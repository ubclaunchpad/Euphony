# SETUP

## Prerequisites
Install Python version >= 3.6.1.

https://www.python.org/downloads/


## Setting up the virtual environment
Instead of having a node_modules folder for each project like in node, in Python, we make virtual environments instead. Same functionality, just slightly different process.

Make the virtual env:

```
python3 -m venv /path/to/desired/save_location/name

E.g:
python3 -m venv ./sg_env
```

Then, activate the virtual_env to access dependencies.
On Mac/Linux:

```
source <venv_name>/bin/activate
```
On Windows: https://docs.python.org/3/library/venv.html

## Installing Dependencies
Activate the virtual env as above

run the following:

```
make install
```
pip is the python equivalent of npm, requirements.txt is the equivalent of package.json

# USING THE APP

## Running the server
Run the following commands

```
make server
```

Check that the server is working:
```
curl http://localhost:5000/
```

A POST request can be sent to the following address to get quote suggestions:

```
http://localhost:5000/recommend_playlist
```