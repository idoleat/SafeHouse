function OpenEditor() {
  document.getElementById("editor").className = "Editor";
  document.getElementById("editor-window").className = "Editor-window";
  document.getElementById("editor-close-btn").className = "Editor-close-btn";
  document.body.classList.add("Disable-scroll");
}

function CloseEditor() {
  document.getElementById("editor").className = "Editor Editor-disabled";
  document.getElementById("editor-window").className =
    "Editor-window Editor-disabled";
  document.getElementById("editor-close-btn").className =
    "Editor-close-btn Editor-disabled";
  document.body.classList.remove("Disable-scroll");
}
