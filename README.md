# qtikit

## for contributors
```sh
git clone git@github.com:riiid/qtikit.git
cd qtikit
yarn
yarn build
```

## how to release packages
for the detail, see [`atlassian/changesets` workflow document][changesets]

[changesets]: https://github.com/atlassian/changesets/tree/main/packages/cli#base-workflow

```sh
yarn changeset version # flush the change logs
git commit -m 'release 2021-11-16' # commit for release
yarn workspaces foreach -pt run prepublishOnly # clean build for each packages
yarn changeset publish # publish to npm
```
