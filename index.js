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
  let steep = false;

  let Δx = b.x - a.x;
  let Δy = b.y - a.y;

  if (Math.abs(Δx) < Math.abs(Δy)) {
    [Δx, Δy]   = [Δy, Δx];
    [a.x, a.y] = [a.y, a.x];
    [b.x, b.y] = [b.y, b.x];

    steep = true;
  }

  if (Δx < 0) {
    [a, b] = [b, a];

    Δy *= -1;
    Δx *= -1;
  }

  let error     = -Δx;
  let errorStep = 2 * Math.abs(Δy);
  let yStep     = Δy < 0 ? -1 : 1;

  let y = a.y;

  for (let x = a.x; x <= b.x; x++) {
    if (error >= 0) {
      error -= 2 * Δx;

      y += yStep;
    }

    error += errorStep;

    if (steep) {
      putPixel(image, y, x, color);
    } else {
      putPixel(image, x, y, color);
    }
  }
};

let context = canvasElement.getContext('2d');

context.imageSmoothingEnabled = false;

let image = context.createImageData(width, height);

for (let it = 0; it < width * height * 4; it += 4) {
  image.data[it + 3] = 255;
}

const lineColor = { r: 255, g: 255, b: 255 };

const lines = [
  {
    a: {
      x: 20,
      y: 20
    },

    b: {
      x: 200,
      y: 200
    }
  }, {
    a: {
      x: 200,
      y: 200
    },

    b: {
      x: 20,
      y: 20
    }
  }, {
    a: {
      x: 20,
      y: 200
    },

    b: {
      x: 200,
      y: 20
    }
  }, {
    a: {
      x: 200,
      y: 20
    },

    b: {
      x: 20,
      y: 200
    }
  }, {
    a: {
      x: 110,
      y: 20
    },

    b: {
      x: 110,
      y: 200
    }
  }, {
    a: {
      x: 200,
      y: 20
    },

    b: {
      x: 20,
      y: 200
    }
  }, {
    a: {
      x: 200,
      y: 30
    },

    b: {
      x: 20,
      y: 60
    }
  }, {
    a: {
      x: 200,
      y: 60
    },

    b: {
      x: 20,
      y: 30
    }
  }, {
    a: {
      x: 30,
      y: 200
    },

    b: {
      x: 60,
      y: 20
    }
  }, {
    a: {
      x: 60,
      y: 200
    },

    b: {
      x: 30,
      y: 20
    }
  }
];

lines.map(line => bresenham(image, line, lineColor));

context.putImageData(image, 0, 0);
