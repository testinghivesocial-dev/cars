  console.log("Widget loader initialized");
  document.addEventListener("DOMContentLoaded", function() {
    const target = document.getElementById("nfa-car-widget");
    if (!target) {
      console.log("Target DIV not found");
      return;
    }
    fetch("https://clever-pithivier-04d1ab.netlify.app/widget/cars.html")
      .then(res => res.text())
      .then(html => {
        console.log("cars.html loaded");
        target.innerHTML = html;
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "https://clever-pithivier-04d1ab.netlify.app/widget/style.css";
        document.head.appendChild(css);
        console.log("CSS loaded");
        const script = document.createElement("script");
        script.src = "https://clever-pithivier-04d1ab.netlify.app/widget/cars.js";
        script.onload = () => console.log("JS loaded");
        document.body.appendChild(script);
      })
      .catch(err => console.error("Widget load error:", err));

  });
