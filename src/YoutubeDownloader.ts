import { executeAsync } from "./Execute";

export async function download(url: string): Promise<string> {
    await executeAsync(`youtube-dl --extract-audio --audio-format mp3 -o "cache/%(title)s.%(ext)s" ${url}`);
    return await executeAsync(`youtube-dl --get-filename -o "cache/%(title)s.mp3" ${url}`);
}