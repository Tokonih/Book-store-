declare module 'izitoast' {
  export interface IziToastSettings {
    title?: string;
    message?: string;
    position?: string;
    zindex?: number;
    progressBar?: boolean;
    timeout?: number;
    [key: string]: any;
  }

  export function error(settings: IziToastSettings): void;
  export function warning(settings: IziToastSettings): void;
  export function info(settings: IziToastSettings): void;
  export function success(settings: IziToastSettings): void;
}
