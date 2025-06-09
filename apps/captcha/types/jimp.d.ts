declare module 'jimp' {
  class Jimp {
    constructor(width: number, height: number, color: number)
    static loadFont(font: string): Promise<Font>
    print(font: Font, x: number, y: number, text: string): this
    getBufferAsync(mime: string): Promise<Buffer>
    static FONT_SANS_32_BLACK: string
    static MIME_PNG: string
  }

  interface Font {
    // Font interface properties
  }

  export = Jimp
} 