const accrodHeaders = document.querySelectorAll(".accord-header");
accrodHeaders.forEach((ach) => {
  ach.addEventListener("click", toggelItem, false);
});

function toggelItem() {
  
  const currentContentEle = this.nextElementSibling;
  const isCollapsed = currentContentEle.classList.contains("collapse");

  // Add collapse class name in all .accord-content element if class name is not exist.
  accrodHeaders.forEach((ach) => {
    const contentEle = ach.nextElementSibling;
    console.log(contentEle);
    if (!contentEle.classList.contains("collapse")) {
      contentEle.classList.add("collapse");
    }
  });

  // Check .accord-header next element .accord-content has collapse class name or not if collapse class exist, removed on click.
  if (isCollapsed) {
    currentContentEle.classList.remove("collapse");
  }
}
