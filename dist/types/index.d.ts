export type { TCallback, TCallLater, TCallLaters };
export { register, unregister };
declare const _default: {
    register: typeof register;
    unregister: typeof unregister;
};
export default _default;
declare type TCallback = (...args: any[]) => void;
declare type TCallLater<T extends TCallback = TCallback> = [T, Parameters<T>];
declare type TCallLaters = (TCallLater | void)[];
declare function register<T extends TCallback>(callback: T, ...args: Parameters<T>): void;
declare function unregister<T extends TCallback>(callback: T): void;
