export function getResponseSync(url: string): string {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return xhr.responseText;
}

export function shuffle(array: Array<any>): any[] {
    if (!array) return [];
    if (array.length < 1) return [];
    let currentIndex = array.length
    const arr = array.slice()

    while (currentIndex > 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }

    return arr;
}