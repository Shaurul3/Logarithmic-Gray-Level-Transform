var xhr = new XMLHttpRequest();
xhr.onload = function() {
  if (xhr.status === 200) {
    // Parse the response text as JSON
    var data = JSON.parse(xhr.responseText);

    // Extract the image URL from the JSON data
    var imageUrl = data.message;

    // Create a new image element
    var img = new Image();

    // Set the src attribute of the image element to the image URL
    img.src = imageUrl;

    // When the image has finished loading, set the size of the canvas to the natural size of the image
    img.onload = function() {
      var width = img.naturalWidth;
      var height = img.naturalHeight;

      // Get a reference to the canvas element
      var canvas = document.getElementById("myCanvas");

      // Set the width and height of the canvas to the natural size of the image
      canvas.width = width;
      canvas.height = height;

      // Get a 2D context for the canvas
      var ctx = canvas.getContext("2d");

      // Save the current canvas state
      ctx.save();

      // Flip the image horizontally
      ctx.scale(-1, 1);

      // Draw the image on the canvas
      ctx.drawImage(img, -width, 0);

      // Move the image back into the visible area of the canvas
      ctx.translate(width, 0);

      // Restore the canvas state
      ctx.restore();
    };
  }
};
xhr.open("GET", "data.json", true);
xhr.send(null);
