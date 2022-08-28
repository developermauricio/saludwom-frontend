"use strict";

var intId = document.getElementById("internetStatus");
// var webappStatus = document.getElementById("webappStatus");
// var noInternetConnection = document.getElementById("noInternetConnection");
var sucText = "Tu conexión a Internet ha vuelto.";
var failText = "¡Ups! Sin conexión a Internet.";
var sucCol = "#00b894";
var failCol = "#ea4c62";

if (intId) {
  if (window.navigator.onLine) {
    intId.innerHTML = sucText;
    intId.style.display = "none";
    // noInternetConnection.style.display = "none";
    // webappStatus.style.display = "block"
    intId.style.backgroundColor = sucCol;
  } else {
    intId.innerHTML = failText;
    intId.style.display = "block";
    // noInternetConnection.style.display = "block";
    // webappStatus.style.display = "none"
    intId.style.backgroundColor = failCol;
  }

  window.addEventListener("online", function () {
    intId.innerHTML = sucText;
    intId.style.display = "block";
    // webappStatus.style.display = "none"
    intId.style.backgroundColor = sucCol;
    setTimeout(function () {
      var fade2Out = setInterval(function () {
        if (!intId.style.opacity) {
          intId.style.opacity = 1;
        }
        if (intId.style.opacity > 0) {
          intId.style.opacity -= 0.1;
        } else {
          clearInterval(fade2Out);
          intId.style.display = "none";
          // noInternetConnection.style.display = "none";
          // webappStatus.style.display = "block"
        }
      }, 20);
    }, 3000);
  });

  window.addEventListener("offline", function () {
    intId.innerHTML = failText;
    intId.style.display = "block";
    // noInternetConnection.style.display = "block";
    // webappStatus.style.display = "none";
    intId.style.backgroundColor = failCol;
  });
}
