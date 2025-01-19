document.addEventListener("DOMContentLoaded", () => {
  let shareData = {
    title: "Mani kiran N",
    text: "MERN Stack Developer | Certified Node.js Developer | Restorative | Deliberative | Learner | Achiever | Responsibility!",
    url: "https://github.com/nmanikiran",
  };

  const $btn = document.querySelector("#share");
  const $resultPara = document.querySelector(".result");
  $resultPara.style.color = "red";
  $resultPara.hidden = true;

  $btn.addEventListener("click", () => {
    navigator
      .share(shareData)
      .then(() => ($resultPara.textContent = "Shared successfully"))
      .catch((error) => {
        // InvalidStateError,NotAllowedError,TypeError,AbortError,DataError,
        $resultPara.textContent = error;
        $resultPara.hidden = false;
      });
  });

  if (!navigator.share) {
    $btn.style.display = "none";
    $resultPara.hidden = false;
  }
});
