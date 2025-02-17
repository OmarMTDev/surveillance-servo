export function extractDataFromFile (path: string) {
    const data = Deno.readTextFileSync(path);

    return JSON.parse(data);
}



