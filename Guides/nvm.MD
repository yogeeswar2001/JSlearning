# NODE VERSION MANAGER

## What is it ?

- Node version manager (NVM), is a tool for managing Node versions on the device. 
- NVM allows to install different versions of Node, and switch between these versions depending on the project requiremnt using command line.

## How is it usefull ?

- Different projects may require different Node versions, using only one version for different projects may not give accurate results of execution it may lead to errors.
- instead of using npm to install and uninstall Node versions for different projects, nvm can be used to manage different versions of Node effectively.
- NVM makes it easier to manage multiple versions of Node.js across different projects that require different versions.

## How to install ?

1. open [link](https://github.com/coreybutler/nvm-windows#readme) for windows and click download
2. install .exe file of the latest release
3. complete the installation wizard
4. check using
    nvm -v

## Commands for managing Node versions

Install latest version

    nvm install latest

Install a particular Node version X.Y.Z

    nvm install vX.Y.Z

To switch to particular version

    nvm use vA.B.C