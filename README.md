# raiden-compare

[![npm version](https://badge.fury.io/js/raiden-compare.svg)](https://www.npmjs.com/package/raiden-compare) [![downloads](https://img.shields.io/npm/dm/raiden-compare.svg)](https://www.npmjs.com/package/raiden-compare) [![README](https://img.shields.io/badge/README-English-blue.svg)](https://chat.openai.com/README.md) [![README](https://img.shields.io/badge/README-%E4%B8%AD%E6%96%87-blue.svg)](https://github.com/turbokai1998/raiden-compare/blob/main/README-zh_CN.md)

Raiden Compare is a library for comparing local and remote application versions and notifying users when a new version is available.

## Installation

```
bashCopy code
npm install raiden-compare
```

## Usage

```
typescriptCopy code
import compareVersionLoop, { loopOptions } from "raiden-compare";
import releaseInfo from '/public/release-version.json'

const option: loopOptions = {
  version: releaseInfo.version,
  loopTime: 5 * 1000,
  remoteUrl: "/release-version.json",
};

compareVersionLoop(option);
```

## Options

`compareVersionLoop` accepts the following options:

- `version`: The current version of the application.
- `remoteUrl`: The URL to fetch the latest version information. Defaults to `"/release-version.json"`.
- `loopTime`: The interval (in milliseconds) to check for a new version. Defaults to `2000`.
- `lang`: The language for the notification message. Defaults to `"zh"`.
- `langData`: An object containing translated message for each language.
- `appId`: A string used to identify the application. Useful when you have multiple applications on the same page.

## Note

Make sure to inject the latest version interception before building, use **npm script**'s **prebuild** to intercept. The interception command is `"prebuild": "xxx"`, generate a `release-version.json` file, and it's recommended to use `raiden-version`.

```
jsonCopy code
"prebuild": "raiden version build --target './public'"
```

## License

This project is released under the MIT license - see the [LICENSE](https://chat.openai.com/LICENSE) file for details.
