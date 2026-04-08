const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");

        // stagger children
        const children = entry.target.querySelectorAll(".stagger");
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 120}ms`;
          child.classList.add("in-view");
        });
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Header scroll state
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 20) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});
