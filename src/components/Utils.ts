// Esta foi gerada por Cursor IA ("Line 131 show the size in bytes, can you give me a function that would parse this number and show a kB, mB version?")
export function formatFileSize(bytes: number | undefined): string {
    if (bytes === 0 || !bytes) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatTimestamp(time: number): string {
    if (time === 0) return '';
    return new Date(time).toLocaleString('pt-br');
}
