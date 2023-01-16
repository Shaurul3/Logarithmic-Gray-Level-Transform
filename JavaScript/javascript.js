var xhr = new XMLHttpRequest();
xhr.onload = function () {
  if (xhr.status === 200) {
    // Parse the response text as JSON
    var data = JSON.parse(xhr.responseText);

    //Extract link from JSON file
    var imageUrl = data.message;

    //Creez un element imagine
    var img = new Image();

    //Setați atributul src al elementului imagine la adresa URL a imaginii
    img.src = 'n02102177_4294.jpg';

    //Când imaginea s-a terminat de încărcat, setați dimensiunea canvasului la dimensiunea naturală a imaginii
    img.onload = async function () {
      //Incep sa verific timpul de performanta
      var start = performance.now();

      //Obtin lungimea si latimea imaginii
      var width = img.naturalWidth;
      var height = img.naturalHeight;

      // Obține o referință la elementul canvas
      var canvas = document.getElementById("myCanvas");

      // Setați lățimea și înălțimea canvasului la dimensiunea naturală a imaginii
      canvas.width = width;
      canvas.height = height;

      // Obține un context 2D pentru pânză
      var ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);

      // Obține datele imaginii
      var imgData = ctx.getImageData(0, 0, width, height);
      var data = imgData.data;

      // Loop prin fiecare pixel al imaginii
      // Parcurgeți fiecare rând și întoarceți pixelii
      await mirror();

      // Acum puteți afișa imaginea în oglindă setând stilul de afișare a canvasului la „blocare”
      canvas.style.display = 'block';

      //Functia filtrului
      await transformare();

      async function mirror() {
        return Promise1 = new Promise(function (resolve) {
          setTimeout(function () {
            for (i = 0; i < height; i++) {
              // Trebuie să facem doar jumătate din fiecare rând, deoarece răsturnăm jumătățile
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
            resolve();
          }
            , 1000);
        }
        )
      }

      async function transformare() {
        return Promise2 = new Promise(function (resolve) {
          setTimeout(function () {
            for (let i = 0; i < width; i++) {
              for (let j = 0; j < height; j++) {
                // Obține pixelul la poziția curentă
                let pixel = ctx.getImageData(i, j, 1, 1);

                // Obține valorile de culoare ale pixelului
                let r = pixel.data[0];
                let g = pixel.data[1];
                let b = pixel.data[2];
                let a = pixel.data[3];

                // Aplicați transformarea logaritmică la valorile culorii
                r = 255 * Math.log(1 + r) / Math.log(256);
                g = 255 * Math.log(1 + g) / Math.log(256);
                b = 255 * Math.log(1 + b) / Math.log(256);

                // Setați valorile de culoare transformate înapoi la pixel
                pixel.data[0] = r;
                pixel.data[1] = g;
                pixel.data[2] = b;
                pixel.data[3] = a;

                // Setați pixelul înapoi pe canvas
                ctx.putImageData(pixel, i, j);
              }
            }
            resolve();
          }
            , 1000);
        }
        )
      }

      // Opresc functia de timp pentru performanta
      var end = performance.now();

      // Afisez timpul in consola
      console.log("Time taken: " + (end - start) + " milliseconds.");
    };

  }
};



xhr.open("GET", "data.json", true);
xhr.send(null);