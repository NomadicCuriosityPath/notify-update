import axios from "axios";
import Notice from "./Notice.svelte";

export type langDataType = Record<"title" | "ignore" | "upgrade", string>;
export type langDataMapType = Record<string, langDataType>;
export type langType = keyof langDataMapType;

// 获取最新版本版本信息
function getReleaseVersion(url: string = "/release-version.json") {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}?t=${Date.now()}`)
      .then((res) => {
        if (
          res.request &&
          res.request.responseURL &&
          res.request.responseURL.includes("login")
        ) {
          window.location.href = res.request.responseURL;
        }

        if (res.status === 200) {
          resolve(res.data);
        }
      })
      .catch(reject);
  });
}

/**
 * 通知更新弹窗
 * @param info
 * @param ignoreCb
 * @param langDataObj 多语言数据
 * @param lang 语言 key，默认为 zh 即中文，若 langDataObj 中没有对应的语言，则为默认中文提示
 * @returns
 */
function noticeReleaseInfo(
  info: any,
  ignoreCb: () => void,
  langDataObj?: langDataMapType,
  lang?: langType
) {
  const releaseMsgInfo = Array.isArray(info) ? info : [info];
  const noticeComponent = new Notice({
    target: document.body,
    props: {
      info: releaseMsgInfo.filter((i) => i),
      langDataObj,
      lang,
    },
  });
  noticeComponent.$on("upgrade", () => {
    window.location.reload();
  });

  noticeComponent.$on("ignore", () => {
    noticeComponent.$destroy();
    typeof ignoreCb === "function" && ignoreCb();
  });
  return noticeComponent;
}

/** option配置
 * version: 版本
 * remoteUrl：获取最新版本的地址
 * loopTime: 轮询时间
 * lang: 当前的语言
 * langData: 多语言配置
 * appId: 区分不同系统
 */

let mounted = false;
let compareVersionInterval: number | undefined; // 版本比较轮询的计时器
let versionLock = true; // 修改version的锁

export type loopOptions = {
  version: number | string;
  appId?: string;
  loopTime?: number;
  langDataObj?: langDataMapType;
  lang?: langType;
  remoteUrl?: string;
};

function compareVersionLoop(option: loopOptions) {
  if (mounted) return;
  let releaseVersion = option.version; // 本地版本version
  let key = "releaseVersion";
  option.appId && (key = `releaseVersion_${option.appId}`);
  Object.defineProperty(window, key, {
    configurable: false,
    get() {
      return releaseVersion;
    },
    set(newVersion) {
      if (!versionLock) {
        // 禁止修改本地version
        releaseVersion = newVersion;
        versionLock = true;
      }
    },
  });

  if (compareVersionInterval) {
    clearInterval(compareVersionInterval);
    compareVersionInterval = 0;
  }

  let existNotice = false; // 是否已经存在通知
  compareVersionInterval = setInterval(() => {
    getReleaseVersion(option.remoteUrl).then((res: any = {}) => {
      if (res.version && !existNotice && res.version !== window[key]) {
        existNotice = true;

        let noticeInfo = res.info;
        if ({}.toString.call(res.info) === "[object Object]") {
          noticeInfo = option.lang && res.info[option.lang];
        }

        noticeReleaseInfo(
          noticeInfo || "",
          () => {
            existNotice = false;
            versionLock = false;
            window[key] = res.version;
          },
          option.langDataObj,
          option.lang
        );
      }
    });
  }, option.loopTime || 2000);
  mounted = true;
}

compareVersionLoop.setVersionLock = function (isLock: boolean = false) {
  versionLock = isLock;
};

export default compareVersionLoop;
