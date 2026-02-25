(function () {
  const params = new URLSearchParams(window.location.search);
  const userKey = (params.get("user") || "sarah").toLowerCase();

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
    const selectedUser = demoUsers[userKey] || demoUsers.sarah;

    profileName.textContent = selectedUser.name;
    profileBio.textContent = selectedUser.bio;
    heroLevelLabel.textContent = selectedUser.levelLabel;
    heroLevelPct.textContent = `${selectedUser.levelPercent}%`;
    heroProgress.style.width = `${selectedUser.levelPercent}%`;

    const avatarImage = document.getElementById("avatar-image");
    const avatarPrev = document.getElementById("avatar-prev");
    const avatarNext = document.getElementById("avatar-next");
    const avatarCard = document.getElementById("avatar");
    const avatarCount = 8;
    let touchStartX = null;
    let activeAvatar = 0;

    const setAvatar = (index) => {
      activeAvatar = (index + avatarCount) % avatarCount;
      const avatarNumber = activeAvatar + 1;
      if (avatarImage) {
        avatarImage.src = `assets/avatars/${avatarNumber}.png`;
        avatarImage.alt = `Avatar ${avatarNumber}`;
      }
    };

    const variantParam = Number.parseInt(params.get("variant") || "1", 10);
    if (Number.isInteger(variantParam) && variantParam >= 1 && variantParam <= avatarCount) {
      setAvatar(variantParam - 1);
    } else {
      setAvatar(0);
    }

    avatarPrev?.addEventListener("click", () => setAvatar(activeAvatar - 1));
    avatarNext?.addEventListener("click", () => setAvatar(activeAvatar + 1));

    avatarCard?.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].clientX;
    });

    avatarCard?.addEventListener("touchend", (event) => {
      if (touchStartX === null) return;
      const touchEndX = event.changedTouches[0].clientX;
      const delta = touchEndX - touchStartX;
      if (Math.abs(delta) > 35) {
        if (delta < 0) setAvatar(activeAvatar + 1);
        if (delta > 0) setAvatar(activeAvatar - 1);
      }
      touchStartX = null;
    });
  }

})();
