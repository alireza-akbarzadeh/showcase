declare module "*.vert" {
  const source: string;
  export default source;
}

declare module "*.frag" {
  const source: string;
  export default source;
}

declare module "*.glsl" {
  const source: string;
  export default source;
}

declare module "*.vs" {
  const source: string;
  export default source;
}

declare module "*.fs" {
  const source: string;
  export default source;
}

interface RequestIdleCallbackOptions {
  timeout?: number;
}

interface RequestIdleCallbackDeadline {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
}

type RequestIdleCallbackHandle = number;

interface Window {
  requestIdleCallback: (
    callback: (deadline: RequestIdleCallbackDeadline) => void,
    options?: RequestIdleCallbackOptions,
  ) => RequestIdleCallbackHandle;
  cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
}

declare function requestIdleCallback(
  callback: (deadline: RequestIdleCallbackDeadline) => void,
  options?: RequestIdleCallbackOptions,
): RequestIdleCallbackHandle;

declare function cancelIdleCallback(handle: RequestIdleCallbackHandle): void;
