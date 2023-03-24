import axios from "axios";
import Notice from "./Notice.svelte";

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

// 建议更新
function noticeReleaseInfo(info, ignoreCb, langData, lang) {
  const releaseMsgInfo = Array.isArray(info) ? info : [info];
  const noticeComponent = new Notice({
    target: document.body,
    props: {
      info: releaseMsgInfo.filter((i) => i),
      langData,
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
let compareVersionInterval = null; // 版本比较轮询的计时器
let versionLock = true; // 修改version的锁
let initialOption = {}; // 保存应用传入的option配置

export type loopOptions = {
  version: number | string;
  appId?: string;
  loopTime?: number;
  langData?: any;
  lang?: string;
  remoteUrl?: string;
}

function compareVersionLoop(option: loopOptions) {
  if (mounted) return;
  initialOption = option;
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
    compareVersionInterval = null;
  }

  let existNotice = false; // 是否已经存在通知
  compareVersionInterval = setInterval(() => {
    getReleaseVersion(option.remoteUrl).then((res: any = {}) => {
      console.log("最新版本：", res.version);
      console.log(`window.${key}`, window[key]);
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
          option.langData,
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