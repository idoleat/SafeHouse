function OpenEditor() {
  document.getElementById("editor").className = "Editor";
  document.getElementById("editor-window").className = "Editor-window";
  document.getElementById("editor-close-btn").className = "Editor-close-btn";
}

function CloseEditor() {
  document.getElementById("editor").className = "Editor Editor-disabled";
  document.getElementById("editor-window").className =
    "Editor-window Editor-disabled";
  document.getElementById("editor-close-btn").className =
    "Editor-close-btn Editor-disabled";
}
