// Product & Industry Database
const siteData = {
  products: [
    {
      id: "dotpin",
      category: "machine",
      title: "Portable Dot Pin Marking Machine",
      img: "assets/portable_dot_pin_1775661861379.png",
      desc: "Robust electromechanical marking systems engineered for deep, permanent alphanumeric tracking on dense industrial components.",
      specs: ["Electromechanical pin actuation", "Programmable marking fields", "Rigid industrial frame construction", "Low maintenance continuous operation"]
    },
    {
      id: "laser",
      category: "machine",
      title: "Laser Marker",
      img: "assets/small_laser_marker_1775661918095.png",
      desc: "High-precision non-contact marking systems using fiber technology to create permanent, high-contrast marks at extreme speeds.",
      specs: ["Fiber laser core technology", "High-speed scanning heads", "Non-contact precision marking", "Zero consumables"]
    },
    {
      id: "punch",
      category: "tool",
      title: "Mechanical Punches",
      img: "assets/mechanical_punch_1775661938060.png",
      desc: "Hardened steel punches custom forged for manual permanent indentation, ideal for tool rooms and custom jobs.",
      specs: ["Custom hardened steel", "High impact resistance", "Custom logo or serial capability", "Ergonomic designs available"]
    },
    {
      id: "impact",
      category: "machine",
      title: "Impact Press",
      img: "assets/small_impact_press_1775661879673.png",
      desc: "Heavy-duty press mechanisms designed to imprint entire logos or sets of characters in a single high-force stamp.",
      specs: ["Heavy duty cast iron structure", "Adjustable strike force", "Spring-loaded rapid return", "Ideal for deep character striking"]
    },
    {
      id: "roll",
      category: "machine",
      title: "Roll Marking Machine",
      img: "assets/roll_marking_machine_1775661900118.png",
      desc: "Continuous roll systems perfect for marking cylindrical or geometrically curved parts seamlessly.",
      specs: ["Precision roller carriage", "Adjustable part fixturing", "Continuous low-stress marking", "Perfect for round geometries"]
    }
  ],
  industries: {
    auto: {
      title: "Automotive Part Marking",
      img: "https://www.heatsign.com/wp-content/uploads/2021/06/what-is-automotive-part-marking.jpg",
      desc: "Strict compliance marking for automotive components is critical. Our systems integrate into production lines to ensure every block, chassis, and gear meets tracking homologation standards.",
      specs: ["VIN number marking", "Engine block traceability", "2D Data Matrix codes", "High-speed line integration"]
    },
    engineering: {
      title: "Engineering & Fabrication",
      img: "https://www.amey-engineers.com/images/fabrication-shop-1.webp",
      desc: "Heavy fabrication requires marks that survive painting, galvanizing, or powder coating. Our deep pneumatic and impact markings ensure survival through brutal finishing processes.",
      specs: ["Deep strike capability", "Pre-galvanized marking", "Structural beam ID", "Portable tracking tools"]
    },
    oem: {
      title: "OEM Manufacturing",
      img: "https://www.mazak.com/adobe/dynamicmedia/deliver/dm-aid--76af39da-dba8-4448-8ba2-da6c3308c607/india-plant-760-505-20240614.jpg",
      desc: "Integration into existing automation lines is our specialty. PK Enterprises and Marking Solution delivers marking heads and controllers that interface perfectly with PLC/robotics cells.",
      specs: ["I/O communication protocols", "Compact integration heads", "Continuous duty cycle rated", "Automated validation"]
    },
    tooling: {
      title: "Tool Rooms & Dies",
      img: "https://www.ohiovalleymfg.com/wp-content/uploads/Toolroom-2-1-1024x684.jpg",
      desc: "Marking hardened steels requires extreme power and precision. Our specialized lasers and hardened impact tools are rated exactly for tool room durability.",
      specs: ["HRC 60+ marking capability", "Micro-precision alignment", "High contrast annealing", "Custom fixture capabilities"]
    }
  }
};

/* =========================================
   1. INJECT DYNAMIC PRODUCTS
========================================= */
const productContainer = document.getElementById("product-container");

function renderProducts(filter = "all") {
  productContainer.innerHTML = "";
  
  const filtered = siteData.products.filter(p => filter === "all" || p.category === filter);
  
  filtered.forEach((p, index) => {
    const delay = index * 100; // stagger effect
    const html = `
      <div class="product-card stagger glow-card dynamic-trigger" style="animation: fadeIn 0.6s ease forwards ${delay}ms; opacity: 0;" data-type="product" data-id="${p.id}">
        <div class="product-image">
          <img src="${p.img}" loading="lazy" alt="${p.title}">
        </div>
        <div class="product-info">
          <h3>${p.title}</h3>
          <p>${p.desc.substring(0, 70)}...</p>
          <span class="view-link">View Details</span>
        </div>
      </div>
    `;
    productContainer.insertAdjacentHTML("beforeend", html);
  });
  
  // Re-bind triggers after injecting
  bindDynamicTriggers();
}

// Initial render
if (productContainer) {
  renderProducts();
}

/* =========================================
   2. PRODUCT FILTERING
========================================= */
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // UI Update
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    // Render update
    renderProducts(btn.dataset.filter);
  });
});

/* =========================================
   3. DYNAMIC MODALS
========================================= */
const modal = document.getElementById("dynamic-modal");
const modalClose = document.querySelector(".modal-close");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalSpecs = document.getElementById("modal-specs");
const triggerCloser = document.querySelectorAll('.modal-trigger-close');

function bindDynamicTriggers() {
  const triggers = document.querySelectorAll(".dynamic-trigger");
  triggers.forEach(trig => {
    trig.addEventListener("click", () => {
      const type = trig.dataset.type;
      const id = trig.dataset.id;
      let data = {};

      if (type === "product") {
        data = siteData.products.find(p => p.id === id);
      } else if (type === "industry") {
        data = siteData.industries[id];
      }

      if (data) {
        // Populate modal
        modalImg.src = data.img;
        modalTitle.innerText = data.title;
        modalDesc.innerText = data.desc;
        
        // Populate specs list
        modalSpecs.innerHTML = "";
        data.specs.forEach(spec => {
          modalSpecs.insertAdjacentHTML("beforeend", `<li>${spec}</li>`);
        });

        // Show modal
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
      }
    });
  });
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Close modal when "Enquire Now" is clicked inside modal to take user to contact section
triggerCloser.forEach(btn => {
  btn.addEventListener("click", closeModal);
});

// Bind initially for hardcoded industry tiles
bindDynamicTriggers();

/* =========================================
   4. SMOOTH SCROLLING
========================================= */
document.querySelectorAll(".smooth-scroll").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if(targetId === "#") return;
    
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      window.scrollTo({
        top: targetEl.offsetTop - 80, // Offset for fixed header
        behavior: "smooth"
      });
      
      // Close mobile nav if open
      document.querySelector(".mobile-nav").style.display = "none";
    }
  });
});

/* =========================================
   5. MOBILE NAV
========================================= */
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

menuToggle.addEventListener("click", () => {
  mobileNav.style.display = mobileNav.style.display === "flex" ? "none" : "flex";
  mobileNav.style.flexDirection = "column";
  mobileNav.style.position = "fixed";
  mobileNav.style.top = "70px";
  mobileNav.style.right = "20px";
  mobileNav.style.background = "var(--glass-bg)";
  mobileNav.style.backdropFilter = "blur(16px)";
  mobileNav.style.padding = "24px 32px";
  mobileNav.style.borderRadius = "var(--rad-md)";
  mobileNav.style.border = "1px solid var(--glass-border)";
  mobileNav.style.gap = "20px";
  mobileNav.style.zIndex = "150";
});

/* =========================================
   6. MOUSE TRACKING GLOW (Requires style.css vars)
========================================= */
const glow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", (e) => {
  glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
