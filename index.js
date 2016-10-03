"use strict";

const width  = 500;
const height = 500;

const putPixel = (image, x, y, { r, g, b }) => {
  const pixelIndex = 4 * ((height - y) * width + x);

  image.data[pixelIndex]     = r;
  image.data[pixelIndex + 1] = g;
  image.data[pixelIndex + 2] = b;
};

const canvasElement = document.querySelector("canvas");

const bresenham = (image, { a, b }, color) => {
  let error = 0;
  let y     = a.y;

  const Δx = b.x - a.x;
  const Δy = b.y - a.y;

  let yStep = Δy / Δx;

  for (let it = 0; it < Δx; it++) {
    if (error >= 1) {
      error--;

      y++;
    }

    error += yStep;

    putPixel(image, a.x + it, y, color);
  }
};

let context = canvasElement.getContext('2d');

context.imageSmoothingEnabled = false;

let image = context.createImageData(width, height);

for (let it = 0; it < width * height * 4; it += 4) {
  image.data[it + 3] = 255;
}

const lineColor = { r: 255, g: 255, b: 255 };

const line = {
  a: {
    x: 20,
    y: 20
  },

  b: {
    x: 480,
    y: 40
  }
};

bresenham(image, line, lineColor);

context.putImageData(image, 0, 0);
