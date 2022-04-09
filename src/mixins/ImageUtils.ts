export const getBase64ImageFromURL = (url: string): Promise<string> => {
  function onImageLoad(image: HTMLImageElement, resolve: (value: PromiseLike<string> | string) => void) {
    return () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(image, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
  }

  function onImageLoadError(reject: (reason?: unknown) => void) {
    return (error: Event | string) => {
      reject(error);
    };
  }

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = onImageLoad(image, resolve);
    image.onerror = onImageLoadError(reject);
    image.src = url;
  });
};
