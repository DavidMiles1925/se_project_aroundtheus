const bodyElement = document.querySelector(".body");

function removePreload() {
  bodyElement.classList.remove("preload");
}

function hideModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    hideModal(evt.target);
  }
}

function hideModalOnEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_open");
    hideModal(openModal);
  }
}

function displayModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", hideModalOnEscape);
  modal.addEventListener("mousedown", hideModalOnRemoteClick);
}

function hideModal(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", hideModalOnEscape);
  modal.removeEventListener("mousedown", hideModalOnRemoteClick);
}

function setCloseListeners(config) {
  const closeButtonList = [
    ...document.querySelectorAll(config.closeButtonSelector),
  ];

  closeButtonList.forEach((button) => {
    button.addEventListener("click", function () {
      hideModal(button.closest(config.modalOverlaySelector));
    });
  });
}

export {
  removePreload,
  hideModalOnRemoteClick,
  hideModalOnEscape,
  displayModal,
  hideModal,
  setCloseListeners,
};
