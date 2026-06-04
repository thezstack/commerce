type GtagEventParams = Record<string, string | number | boolean | undefined>;

interface Window {
  gtag?: (command: 'event', eventName: string, params?: GtagEventParams) => void;
}
