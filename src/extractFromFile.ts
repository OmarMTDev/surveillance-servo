export async function extractDataFromFile (path: string) {
    let data = Deno.readTextFileSync(path);

    return JSON.parse(data);
}



