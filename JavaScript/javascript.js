fetch("data.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Extract the image URL from the JSON data
    const imageUrl = data.message;

    // Get a reference to the canvas element
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Create a new image element
    const img = new Image();

    // Set the src property of the image element to the image URL
    img.src = imageUrl;

    // When the image has finished loading, draw it onto the canvas
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    };
  });