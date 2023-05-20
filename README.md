# Zowe Explorer Extender Sample

This extension is a sample to show how extenders can add a new tree to the Zowe Explorer View of VS Code.
It will load existing Zowe CLI SSH profile names into the new view, clicking the refresh button on the view will update the list of profiles.

## Prerequisites

- NPM 14+
- Yarn 1.22.0+
- VS Code 1.78.0+

## To Build

- Clone the repository
- run command `yarn && yarn build`

## To Package

- Build first
- run command `yarn package`, .vsix will be located in the packaged-apps directory.

## Install

- Right-click .vsix in the packaged-apps directory.
