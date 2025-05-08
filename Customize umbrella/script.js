let swatchers = document.querySelectorAll(".color-swatch");
let umbrellaImage = document.getElementById("umbrella-image");
let logoImage = document.getElementById("logo-image");
let root = document.querySelector(":root");
let activeColor = "blue";

swatchers.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    document.querySelector(".color-swatch.active").classList.remove("active");
    swatch.classList.add("active");
    activeColor = swatch.dataset.color;
    changeUmbrellaColor();
  });
});

function changeUmbrellaColor() {
  showLoader();

  logoImage.style.display = "none";

  const newUmbrellaSrc = `images/${capitalize(activeColor)}-Umbrella.png`;

  const bgMap = {
    blue: "lightblue",
    pink: "lightpink",
    yellow: "lightyellow",
  };
  root.style.setProperty("--bg", bgMap[activeColor]);

  setTimeout(() => {
    umbrellaImage.src = newUmbrellaSrc;

    if (logoImage.src && !logoImage.src.endsWith("/")) {
      logoImage.style.display = "block";
    }
  }, 800);
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function showLoader() {
  const loader = document.createElement("img");
  loader.src = "images/loader_icon.svg";
  loader.className = "Loader";

  const parent = umbrellaImage.parentNode;
  parent.replaceChild(loader, umbrellaImage);

  setTimeout(() => {
    parent.replaceChild(umbrellaImage, loader);
  }, 800);
}

function uploadLogo(event) {
  const file = event.target.files[0];
  if (file && file.size < 5 * 1024 * 1024) {
    const reader = new FileReader();
    reader.onload = (e) => {
      logoImage.src = e.target.result;
      logoImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please upload an image smaller than 5MB");
  }
}

function removeLogo() {
  logoImage.src = "";
  logoImage.style.display = "none";
  document.getElementById("logo-upload").value = "";
}
