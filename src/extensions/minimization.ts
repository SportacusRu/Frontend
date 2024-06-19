const minimization = async (file: File, { quality = 1, type = file.type }) => {
    // Get as image data
    const imageBitmap = await createImageBitmap(file);

    // Draw to canvas
    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext('2d');
    if (ctx) 
        ctx.drawImage(imageBitmap, 0, 0);

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
