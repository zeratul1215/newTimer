# link-frontend

## Init repo from template

1. change dev port from `3300` to unique port.
2. change package.json name field.

## Commit lint

```
# Activate hooks
npx husky install
```

Real world examples can look like this:

```
chore: run tests on travis ci
```

```
fix(server): send cors headers
```

```
feat(blog): add comment section
```

Common types according to [commitlint-config-conventional (based on the Angular convention)](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) can be:

- build
- chore
- ci
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

## Branch

`master` branch for production environment.

`develop` branch for develop environment.

## Code Style Guide

- [javascript](./docs/javascript.md)
- [css](./docs/css.md)
- [react](./docs/react.md)
