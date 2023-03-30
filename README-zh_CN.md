# Notify-Update

[![npm version](https://badge.fury.io/js/notify-update.svg)](https://www.npmjs.com/package/notify-update) [![downloads](https://img.shields.io/npm/dm/notify-update.svg)](https://www.npmjs.com/package/notify-update) [![README](https://img.shields.io/badge/README-English-blue.svg)](README.md) [![README](https://img.shields.io/badge/README-中文-blue.svg)](https://github.com/turbokai1998/notify-update/blob/main/README-zh_CN.md)


<img src="https://github.com/turbokai1998/notify-update/blob/main/assets/demo.gif" alt="效果" style="zoom: 25%;" />

Notify-Update 是一个用于比较本地和远程应用程序版本并在有新版本时通知用户的库。

## 安装

```bash
npm install notify-update
```

## 使用方法

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

## 选项

`compareVersionLoop` 接受以下选项：

- `version`：应用程序的当前版本。
- `remoteUrl`：获取最新版本信息的 URL。默认为 `"/release-version.json"`。
- `loopTime`：检查新版本的间隔时间（以毫秒为单位）。默认为 `2000`。
- `lang`：通知消息显示的语言。默认为 `"zh"`。
- `langDataObj`：包含每种语言的翻译消息的对象。
- `appId`：用于标识应用程序的字符串。当您在同一页上有多个应用程序时，这很有用。

## 注意

确保有打包前的最新版本的拦截注入，使用 **npm script** 的 **prebuild** 进行拦截，拦截命令`"prebuild": "xxx"`，生成一个`release-verson.json`文件，推荐使用`raiden-version`

```json
"prebuild": "raiden version build --target './public'"
```

## 许可证

该项目基于 MIT 许可证发布 - 请参阅 [LICENSE](https://chat.openai.com/LICENSE) 文件以获取详情