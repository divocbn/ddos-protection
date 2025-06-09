declare module 'sharp' {
  interface SharpOptions {
    create: {
      width: number;
      height: number;
      channels: number;
      background: { r: number; g: number; b: number; alpha: number };
    };
  }

  interface CompositeOptions {
    input: Buffer;
    top: number;
    left: number;
  }

  class Sharp {
    constructor(options: SharpOptions);
    composite(options: CompositeOptions[]): Sharp;
    png(): Sharp;
    toBuffer(): Promise<Buffer>;
  }

  export = Sharp;
} 