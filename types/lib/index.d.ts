export type langDataType = Record<"title" | "ignore" | "upgrade", string>;
export type langDataMapType = Record<string, langDataType>;
export type langType = keyof langDataMapType;
export type loopOptions = {
    version: number | string;
    appId?: string;
    loopTime?: number;
    langDataObj?: langDataMapType;
    lang?: langType;
    remoteUrl?: string;
};
declare function compareVersionLoop(option: loopOptions): void;
declare namespace compareVersionLoop {
    var setVersionLock: (isLock?: boolean) => void;
}
export default compareVersionLoop;
