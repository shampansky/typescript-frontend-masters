export class Video {
  duration(): number {
    return 10
  }
}

declare module '../lib/registry' {
  export interface DataTypeRegistry {
    video: Video
  }
}
