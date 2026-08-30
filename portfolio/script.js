document.addEventListener("DOMContentLoaded", () => {
  // ---- Efeito de digitação no hero -------------------------------------
  const target = document.getElementById("typed-name");
  const cursorHolder = document.createElement("span");
  cursorHolder.id = "typed-cursor";

  if (target) {
    const fullText = "Anderson do Vale";
    let i = 0;

    const type = () => {
      if (i <= fullText.length) {
        target.textContent = fullText.slice(0, i);
        target.appendChild(cursorHolder);
        i++;
        setTimeout(type, 65);
      }
    };
    type();
  }

  // ---- Modal de projetos (só roda se a seção existir no HTML) ----------
  const modal = document.getElementById("modal");
  if (!modal) return; // seção de projetos está desativada, nada a fazer

  const projects = document.querySelectorAll(".project-item");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalLink = document.getElementById("modal-link");
  const closeModal = document.getElementById("close-modal");
  const modalVideo = document.getElementById("modal-video");
  const modalSource = modalVideo ? modalVideo.querySelector("source") : null;

  projects.forEach((project) => {
    project.addEventListener("click", () => {
      const info = project.dataset.info.split("|");

      modalTitle.textContent = info[0];
      modalDescription.textContent = info[1];
      modalLink.href = info[2];
      modalLink.textContent = "Acesse o projeto no GitHub";

      if (modalSource && info[3]) {
        modalSource.src = info[3];
        modalVideo.load();
      }

      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  if (closeModal) closeModal.addEventListener("click", closePopup);
  window.addEventListener("click", (event) => {
    if (event.target === modal) closePopup();
  });

  function closePopup() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    if (modalVideo) modalVideo.pause();
  }
});