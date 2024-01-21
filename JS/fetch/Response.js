Response()

new Response(?body, ?options)


## Response.body
image = document.getElementById('target');
// Fetch the original image
fetch('./tortoise.png')
// Retrieve its body as ReadableStream
.then((response) => response.body)
.then((body) => {
  const reader = body.getReader();

  return new ReadableStream({
    start(controller) {
      return pump();

      function pump() {
        return reader.read().then(({ done, value }) => {
          // When no more data needs to be consumed, close the stream
          if (done) {
            controller.close();
            return;
          }

          // Enqueue the next data chunk into our target stream
          controller.enqueue(value);
          return pump();
        });
      }
    }
  })
})
.then((stream) => new Response(stream))
.then((response) => response.blob())
.then((blob) => URL.createObjectURL(blob))
.then((url) => console.log(image.src = url))
.catch((err) => console.error(err));


## Response.bodyUsed
<img class="my-image" src="https://wikipedia.org/static/images/project-logos/frwiki-1.5x.png">

const myImage = document.querySelector('.my-image');
fetch('https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg')
  .then((response) => {
    console.log(response.bodyUsed);
    const res = response.blob();
    console.log(response.bodyUsed);
    return res;
  })
  .then((response) => {
    const objectURL = URL.createObjectURL(response);
    myImage.src = objectURL;
  });


## Response.headers
myImage = document.querySelector('img');

const myRequest = new Request('flowers.jpg');

fetch(myRequest).then((response) => {
  // for each response header, log an array with header name as key
  console.log(...response.headers);
  response.blob().then((myBlob) => {
    const objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });
});

## Response.ok
myImage = document.querySelector('img');

const myRequest = new Request('flowers.jpg');

fetch(myRequest).then((response) => {
  console.log(response.ok); // returns true if the response returned successfully
  response.blob().then((myBlob) => {
    const objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });
});


## Response.redirected

fetch("awesome-picture.jpg")
  .then((response) => {
    const elem = document.getElementById("warning-message-box");
    elem.textContent = response.redirected ? "Unexpected redirect" : "";
    return response.blob();
  })
  .then((imageBlob) => {
    const imgObjectURL = URL.createObjectURL(imageBlob);
    document.getElementById("img-element-id").src = imgObjectURL;
  });


//manually filter out redirects
fetch("awesome-picture.jpg", { redirect: "error" })
  .then((response) => response.blob())
  .then((imageBlob) => {
    const imgObjectURL = URL.createObjectURL(imageBlob);
    document.getElementById("img-element-id").src = imgObjectURL;
  });



## Response.status
// OK for a status code 200, Continue for 100, Not Found for 404.
const myImage = document.querySelector('img');

const myRequest = new Request('flowers.jpg');

fetch(myRequest).then((response) => {
  console.log(response.status); // returns 200
  response.blob().then((myBlob) => {
    const objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });
});



## Response.statusText
myImage = document.querySelector('img');

const myRequest = new Request('flowers.jpg');

fetch(myRequest).then((response) => {
  console.log(response.statusText); // returns "OK" if the response returned successfully
  response.blob().then((myBlob) => {
    const objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });
});



## Response.type

myImage = document.querySelector('img');

const myRequest = new Request('flowers.jpg');

fetch(myRequest).then((response) => {
  console.log(response.type); // returns basic by default
  response.blob().then((myBlob) => {
    const objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });
});



## Response.url
myImage = document.querySelector('img');

const myRequest = new Request('flowers.jpg');

fetch(myRequest).then((response) => {
  console.log(response.url); // returns https://developer.mozilla.org/en-US/docs/Web/API/Response/flowers.jpg
  response.blob().then((myBlob) => {
    const objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });
});



## Response.arrayBuffer()

//play music
function getData() {
  const audioCtx = new AudioContext();

  return fetch('viper.ogg')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
      }
      return response.arrayBuffer();
    })
    .then((buffer) => audioCtx.decodeAudioData(buffer))
    .then((decodedData) => {
      const source = new AudioBufferSourceNode();
      source.buffer = decodedData;
      source.connect(audioCtx.destination);
      return source;
    });
};

// wire up buttons to stop and play audio

play.onclick = () => {
  getData().then((source) => {
    source.start(0);
    play.setAttribute('disabled', 'disabled');
  });
}

//reading files
<input type="file" onchange="readFile(this.files[0])"></input>
function readFile(file) {
  return new Response(file).arrayBuffer();
}




## Response.blob()
myImage = document.querySelector('img');

const myRequest = new Request('flowers.jpg');

fetch(myRequest)
  .then((response) => response.blob())
  .then((myBlob) => {
    const objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });


## Response.clone()

## Response.json()

const myList = document.querySelector('ul');
const myRequest = new Request('products.json');

fetch(myRequest)
  .then((response) => response.json())
  .then((data) => {
    for (const product of data.products) {
      const listItem = document.createElement('li');
      listItem.appendChild(
        document.createElement('strong')
      ).textContent = product.Name;
      listItem.append(
        ` can be found in ${
          product.Location
        }. Cost: `
      );
      listItem.appendChild(
        document.createElement('strong')
      ).textContent = `£${product.Price}`;
      myList.appendChild(listItem);
    }
  })
  .catch(console.error);


## Response.redirect()
Response.redirect('https://www.example.com', 302);


## Response.text()
// The response is always decoded using UTF-8.
const myArticle = document.querySelector('article');
const myLinks = document.querySelectorAll('ul a');

for (const link of myLinks) {
  link.onclick = (e) => {
    e.preventDefault();
    const linkData = e.target.getAttribute('data-page');
    getData(linkData);
  };
}

function getData(pageId) {
  console.log(pageId);
  const myRequest = new Request(`${pageId}.txt`);
  fetch(myRequest)
    .then((response) => response.text())
    .then((text) => {
      myArticle.innerHTML = text;
    });
}