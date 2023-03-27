export type loopOptions = {
    version: number | string;
    appId?: string;
    loopTime?: number;
    langData?: any;
    lang?: string;
    remoteUrl?: string;
};
declare function compareVersionLoop(option: loopOptions): void;
declare namespace compareVersionLoop {
    var setVersionLock: (isLock?: boolean) => void;
}
export default compareVersionLoop;
