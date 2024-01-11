# fms-db

This repository hosts the file-system-management database.

## Prerequires
Ensure Docker is installed to build images and run containers. 
Additionally, install make:
On linux:
```
sudo apt-get install make
```

On Windows(using powershell as admin):
```
winget install -e --id GnuWin32.Make
# or
choco install make
```
Finally, install sqlfluff and pre-commit to lint the project:
```
pip install sqlfluff
pip install pre-commit
```
## Getting started
After cloning the project, enable the pre-commit hook by running:
```
pre-commit install
```
To lint the project:
```
make lint
```
To fix potential lint issues
```
make fix
```
Refer to the Makefile for additional targets and functionalities.
