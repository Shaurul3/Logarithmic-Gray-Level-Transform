var xhr = new XMLHttpRequest();
xhr.onload = function () {
  if (xhr.status === 200) {
    // Parse the response text as JSON
    var data = JSON.parse(xhr.responseText);

    // Extract the image URL from the JSON data
    var imageUrl = data.message;

    // Create a new image element
    var img = new Image();

    //img.crossOrigin = "Anonymous";
    // Set the src attribute of the image element to the image URL
    img.src = 'n02102177_4294.jpg';

    //When the image has finished loading, set the size of the canvas to the natural size of the image
    img.onload = async function () {
      var width = img.naturalWidth;
      var height = img.naturalHeight;

      // Get a reference to the canvas element
      var canvas = document.getElementById("myCanvas");

      // Set the width and height of the canvas to the natural size of the image
      canvas.width = width;
      canvas.height = height;

      // Get a 2D context for the canvas
      var ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);

      // Get the image data
      var imgData = ctx.getImageData(0, 0, width, height);
      var data = imgData.data;

      // Loop through each pixel of the image
      // Traverse every row and flip the pixels
      await mirror();

      // Now you can display the mirrored image by setting the canvas display style to "block"
      canvas.style.display = 'block';

      await transformare();

      async function mirror() {
        return Promise1 = new Promise(function (resolve) {
          setTimeout(function () {
            for (i = 0; i < height; i++) {
              // We only need to do half of every row since we're flipping the halves
              for (j = 0; j < width / 2; j++) {
                var index = (i * 4) * width + (j * 4);
                var mirrorIndex = ((i + 1) * 4) * width - ((j + 1) * 4);
                for (p = 0; p < 4; p++) {
                  var temp = data[index + p];
                  data[index + p] = data[mirrorIndex + p];
                  data[mirrorIndex + p] = temp;
                }
              }
            }
            ctx.putImageData(imgData, 0, 0, 0, 0, width, height);
            resolve();  }
            , 3000);
        }
        )
      }

      async function transformare() {
        return Promise2 = new Promise(function (resolve) {
          setTimeout(function () {
            for (let i = 0; i < width; i++) {
              for (let j = 0; j < height; j++) {
                // Get the pixel at the current position
                let pixel = ctx.getImageData(i, j, 1, 1);

                // Get the color values of the pixel
                let r = pixel.data[0];
                let g = pixel.data[1];
                let b = pixel.data[2];
                let a = pixel.data[3];

                // Apply the logarithmic transform to the color values
                r = 255 * Math.log(1 + r) / Math.log(256);
                g = 255 * Math.log(1 + g) / Math.log(256);
                b = 255 * Math.log(1 + b) / Math.log(256);

                // Set the transformed color values back to the pixel
                pixel.data[0] = r;
                pixel.data[1] = g;
                pixel.data[2] = b;
                pixel.data[3] = a;

                // Set the pixel back to the canvas
                ctx.putImageData(pixel, i, j);
              }
            }
            resolve(); } 
            , 3000);
        }
        )
      }

    };

  }
};



xhr.open("GET", "data.json", true);
xhr.send(null);