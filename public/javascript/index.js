document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
    var loadingElement = document.querySelector(".loading-container");
    var initMsgElement = document.querySelector(".init-message");
    var previewDataElement = document.querySelector(".preview-data");
    var errorMsgElement = document.querySelector(".error-msg");
    if (loadingElement.classList.contains("hidden")) {
      loadingElement.classList.remove("hidden");
    }
    if (!initMsgElement.classList.contains("hidden")) {
      initMsgElement.classList.add("hidden");
    }
    if (!previewDataElement.classList.contains("hidden")) {
      previewDataElement.classList.add("hidden");
    }
    if (!errorMsgElement.classList.contains("hidden")) {
      errorMsgElement.classList.add("hidden");
    }
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "http://localhost:3000/link");
    httpRequest.setRequestHeader("Content-Type", "application/json");
    var urlVal = document.querySelector('input[type="url"]').value;
    httpRequest.send(JSON.stringify({ url: urlVal }));
    httpRequest.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        var previewData = JSON.parse(httpRequest.response);
        initMsgElement.classList.add("hidden");
        loadingElement.classList.add("hidden");
        previewDataElement.classList.remove("hidden");
        document.querySelector(".img").src = previewData.img;
        document.querySelector(".domain").innerHTML = previewData.domain;
        document.querySelector(".header").innerHTML = previewData.title;
        document.querySelector(".description").innerHTML =
          previewData.description;
      }
      if (this.readyState === XMLHttpRequest.DONE && this.status === 500) {
        var response = JSON.parse(httpRequest.response);
        if (!initMsgElement.classList.contains("hidden")) {
          initMsgElement.classList.add("hidden");
        }
        if (!loadingElement.classList.contains("hidden")) {
          loadingElement.classList.add("hidden");
        }
        if (errorMsgElement.classList.contains("hidden")) {
          errorMsgElement.classList.remove("hidden");
        }
        errorMsgElement.innerHTML = response.error;
      }
    };
  });
});
