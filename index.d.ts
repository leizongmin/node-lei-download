/**
 * 下载文件，仅指定源文件地址，自动生成目标文件地址
 */
declare function download(source: string, callback: (err: Error | null, filename?: string) => void): void;

/**
 * 下载文件，指定源文件地址和目标文件地址
 */
declare function download(source: string, target: string, callback: (err: Error | null, filename?: string) => void): void;

/**
 * 下载文件，仅指定源文件地址，并获取下载进度
 */
declare function download(source: string, progress: (size: number, total: number) => void, callback: (err: Error | null, filename?: string) => void): void;

/**
 * 下载文件，指定源文件地址和目标地址，并获取下载进度
 */
declare function download(source: string, target: string, progress: (size: number, total: number) => void, callback: (err: Error | null, filename?: string) => void): void;

/**
 * 下载文件
 */
declare namespace download {

}

export = download;
