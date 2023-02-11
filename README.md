# CompactIgnore

> Single file configuration for your Code Exclusions.

<i>.gitignore - .dockerignore - .prettierignore - .npmignore - .eslintignore - .gcloudignore</i>

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/38acc200e45241d2b6437bb545bd32f4)](https://www.codacy.com/gh/confused-Techie/CompactIgnore/dashboard?utm_source=github.com&utm_medium=referral&utm_content=confused-Techie/CompactIgnore&utm_campaign=Badge_Grade)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![codecov](https://codecov.io/gh/confused-Techie/CompactIgnore/branch/main/graph/badge.svg?token=PVEXNNPOGJ)](https://codecov.io/gh/confused-Techie/CompactIgnore)
[![CI - Standards](https://github.com/confused-Techie/CompactIgnore/actions/workflows/ci-standards.yml/badge.svg)](https://github.com/confused-Techie/CompactIgnore/actions/workflows/ci-standards.yml)
[![CI - Tests](https://github.com/confused-Techie/CompactIgnore/actions/workflows/ci-tests.yml/badge.svg)](https://github.com/confused-Techie/CompactIgnore/actions/workflows/ci-tests.yml)

CompactIgnore is a single file configuration tool aimed at helping to reduce the overhead and allow easy consistency across ignore files.

By creating a `.compactignore` file, it will be able to generate any supported ignore file specified with their own custom entries or inheriting others.

# Installation

To start using CompactIgnore install the package, either Globally or as a Dev Dependency:

<b>Globally:</b>

```shell
npm install @confused-techie/compactignore -g
```

<b>Dev-Dependency:</b>

```shell
npm install @confused-techie/compactignore -D
```

Once installed you'll need to create you `.compactignore` file, [more on that below](#usage), now it's time to use CompactIgnore.

To generate your ignore files the command needed will depend on your installation.

<b>Globally:</b>

Just run `compactignore` in the same directory that includes your `.compactignore` file.

<b>Dev-Dependency:</b>

If you include CompactIgnore in your package, it's recommended to add the following snippet to your `package.json`s `scripts`.

```json
"scripts": {
  "ignore": "compactignore"
}
```

Then when needed you can run `npm run ignore` to regenerate your ignore files.

# Usage

When creating your `.compactignore` file it's good to know that generally all rules are based around the `.gitignore` file. With some notably exclusions.

CompactIgnore uses Profiles to determine what kind of ignore file to generate as well as using Profiles to separate what entries to include in each file.

The key values to remember:

- `>` is a profile declarator line. This character should be followed by the profile you plan to use for this file.
- `!` means to include this file in your ignore file, similar to how this will include the file when used in a gitignore
- `#` means this line is a comment. It will be included in the final ignore files
- Having no special character in front of a line will then go ahead and exclude that line from the ignore file.
- To escape any characters use `\`
- Each entry must be on it's one line

# Examples

To create the following files:

#### `.gitignore`

```text
/node_modules
/secrets.json
```

#### `.dockerignore`

```text
/node_modules
/secrets.json
.gitignore
.gitattributes
```

You just need to create the following `.compactignore` file to accomplish the same.

#### `.compactignore`

```text
> GLOBAL
/node_modules
/secrets.json
> dockerignore
.gitignore
.gitattributes
```

Remember if you ever want to generate an additional ignore that includes only the `GLOBAL` Profile entries you can add `> profile_name` with no special entries and it will be generated containing only the `GLOBAL` Profile entries.

If you'd like, [here's](https://github.com/confused-Techie/CompactIgnore/tree/main/examples) a more complicated example.

# Profiles

The following profiles are supported:

- `GLOBAL`|`global`: This profile will apply all entries globally to each other ignore file that is created.
- `dockerignore`: This profile will generate a `.dockerignore` file.
- `eslintignore`: This profile will generate a `.eslintignore` file.
- `gitignore`: This profile will generate a `.gitignore` file.
- `npmignore`: This profile will generate a `.npmignore` file.
- `prettierignore`: This profile will generate a `.prettierignore` file.
- `gcloudignore`: This profile will generate a `.gcloudignore` file.

# Why use CompactIgnore

CompactIgnore is made for those developers who end up having to maintain several ignore files in a single codebase.

Say for example your project is uploaded to a Git Repository, uses Prettier to make your code readable, uses ESLint to ensure your code meets your standards, and is published to NPM.JS

If all the above is true you need to manually keep track of `.gitignore`, `.eslintignore`, `.prettierignore`, and `.npmignore`

Which in most cases can be fine if their configuration is simple, or your project doesn't contain anything that shouldn't be uploaded. But say now in your repo you add `.env` or `secrets.json` or some other file that contains sensitive configuration details or private API keys you need to double or triple check that these are added to every single file, and ensure they all work properly. But with CompactIgnore it can now be as easy as adding it to your `GLOBAL` Profile, and generating all your ignore files right away.

# Documentation

- [Examples](examples/)
- [Structures.md](docs/structures.md)
- [Change Log](CHANGE_LOG.md)

# Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md).
