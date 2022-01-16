import { executeAsync } from "./Execute";

export async function download(url: string): Promise<string> {
    await executeAsync(`yt-dlp -f 'ba' -x --audio-format mp3 ${url} -o 'cache/%(title)s.mp3'`);
    return await executeAsync(`youtube-dl --get-filename -o "cache/%(title)s.mp3" ${url}`);
}