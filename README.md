# Notify-Update

[![npm version](https://badge.fury.io/js/notify-update.svg)](https://www.npmjs.com/package/notify-update) [![downloads](https://img.shields.io/npm/dm/notify-update.svg)](https://www.npmjs.com/package/notify-update) [![README](https://img.shields.io/badge/README-English-blue.svg)](README.md) [![README](https://img.shields.io/badge/README-中文-blue.svg)](https://github.com/turbokai1998/notify-update/blob/main/README-zh_CN.md)


<img src="https://github.com/turbokai1998/notify-update/blob/main/assets/demo.gif" alt="效果" style="zoom: 25%;" />

Notify-Update is a library for comparing local and remote application versions and notifying users when a new version is available.

## Installation

```bash
npm install notify-update
```

## Usage

```typescript
import compareVersionLoop, { loopOptions } from "notify-update";
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
- `langDataObj`: An object containing translated message for each language.
- `appId`: A string used to identify the application. Useful when you have multiple applications on the same page.

## Note

Make sure to inject the latest version interception before building, use **npm script**'s **prebuild** to intercept. The interception command is `"prebuild": "xxx"`, generate a `release-version.json` file, and it's recommended to use `raiden-version`.

```json
"prebuild": "raiden version build --target './public'"
```

## License

This project is released under the MIT license - see the [LICENSE](https://chat.openai.com/LICENSE) file for details.
