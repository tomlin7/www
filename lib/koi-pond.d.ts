export interface PondStats {
  koi: number;
  pellets: number;
}
export class KoiPond {
  constructor(
    canvas: HTMLCanvasElement,
    light: boolean,
    onStats: (stats: PondStats) => void,
  );
  destroy(): void;
  setTheme(light: boolean): void;
  measureContent(): void;
}
