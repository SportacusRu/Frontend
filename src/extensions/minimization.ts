const minimization = async (file: File, { quality = 1, type = file.type, size = 512 }) => {
    // Get as image data
    const imageBitmap = await createImageBitmap(file);

    // Draw to canvas
    const canvas = document.createElement('canvas');

    let width = imageBitmap.width;
    let height = imageBitmap.height;

    if (width > height) {
        const ratio = width / size
        height = Math.floor(height / ratio)
        width = size
    } else {
        const ratio = height / size
        width = Math.floor(width / ratio)
        height = size;
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) 
        ctx.drawImage(imageBitmap, 0, 0, width, height);

    const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob(resolve, type, quality)
    );

    if (blob)
        return new File([blob], file.name, {
            type: blob.type,
        });
    return null;
};

export {
    minimization
}
