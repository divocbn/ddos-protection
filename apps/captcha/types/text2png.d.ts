declare module 'text2png' {
  interface Text2PngOptions {
    font?: string;
    color?: string;
    backgroundColor?: string;
    padding?: number;
    output?: 'buffer' | 'dataURL';
  }

  function text2png(text: string, options?: Text2PngOptions): Buffer | string;
  export = text2png;
} 