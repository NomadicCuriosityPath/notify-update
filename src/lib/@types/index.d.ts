export {};
declare global {
  interface Window {
    localStorage?: any;
    [key: string]: any;
  }
}
