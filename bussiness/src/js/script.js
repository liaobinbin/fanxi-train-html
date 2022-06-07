window.onload = () => {
  const collpse = document.getElementById("collpse");

  collpse.addEventListener("click", () => {
    // open mobile menu
    console.log(123);
    const menu = document.getElementById("mobile-menu");
    console.log(menu);
    menu.style.display = "block";
  });

  new WOW().init();
  // const images = document.getElementsByTagName("img");
  // function callback(entries) {
  //   for (let i of entries) {
  //     if (i.isIntersecting) {
  //       let img = i.target;
  //       let trueSrc = img.getAttribute("data-src");
  //       if(trueSrc){
  //         img.setAttribute("src", trueSrc);
  //       }
  //       observer.unobserve(img);
  //     }
  //   }
  // }

  // const observer = new IntersectionObserver(callback);

  // for (let i of images) {
  //   observer.observe(i);
  // }
};
