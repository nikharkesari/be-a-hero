(function () {
  const params = new URLSearchParams(window.location.search);
  const userKey = (params.get("user") || "sarah").toLowerCase();
  const variantParam = Number.parseInt(params.get("variant") || "1", 10);
  const safeVariant = [1, 2, 3].includes(variantParam) ? variantParam : 1;

  const demoUsers = {
    sarah: {
      name: "Sarah Taylor",
      bio: "Caring for mum while balancing work and family life, one brave day at a time.",
      levelLabel: "Level 8 - Steady Supporter",
      levelPercent: 72,
    },
    alex: {
      name: "Alex Morgan",
      bio: "Partner carer and advocate, focused on clear plans and compassionate routines.",
      levelLabel: "Level 6 - Calm Organiser",
      levelPercent: 58,
    },
    priya: {
      name: "Priya Shah",
      bio: "Community-minded daughter supporting her dad with warmth, patience, and shared joy.",
      levelLabel: "Level 9 - Community Beacon",
      levelPercent: 84,
    },
  };

  const profileName = document.getElementById("profile-name");
  if (profileName) {
    const profileBio = document.getElementById("profile-bio");
    const heroLevelLabel = document.getElementById("hero-level-label");
    const heroLevelPct = document.getElementById("hero-level-pct");
    const heroProgress = document.getElementById("hero-progress");
    const avatar = document.getElementById("avatar");
    const selectedUser = demoUsers[userKey] || demoUsers.sarah;

    profileName.textContent = selectedUser.name;
    profileBio.textContent = selectedUser.bio;
    heroLevelLabel.textContent = selectedUser.levelLabel;
    heroLevelPct.textContent = `${selectedUser.levelPercent}%`;
    heroProgress.style.width = `${selectedUser.levelPercent}%`;

    if (avatar) {
      avatar.setAttribute("data-variant", String(safeVariant));
    }
  }

  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
    });
  });
})();
