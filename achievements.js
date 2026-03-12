const achievements = [
  { id: 1, level: 10, text: "Level 10 — Beginner Master!" },
  { id: 2, level: 50, text: "Level 50 — Rising Star!" },
  { id: 3, level: 100, text: "Level 100 — Pro Player!" },
  { id: 4, level: 500, text: "Level 500 — Elite Gamer!" },
  { id: 5, level: 1000, text: "Level 1000 — Tetris Legend!" },
  { id: 6, level: 2500, text: "Level 2500 — Ultra Instinct!" },
  { id: 7, level: 5000, text: "Level 5000 — GOD MODE!" }
];

function unlockAchievements(currentLevel) {
  achievements.forEach(a => {
    if (currentLevel === a.level && !isAchievementUnlocked(a.id)) {
      saveAchievement(a.id);
      showAchievement(a.text);
    }
  });
}

function showAchievement(text) {
  const list = document.getElementById("achList");
  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);
}

function loadAchievementsUI() {
  const unlocked = getUnlockedAchievements();
  const list = document.getElementById("achList");
  list.innerHTML = "";
  achievements.forEach(a => {
    if (unlocked.includes(a.id)) {
      const li = document.createElement("li");
      li.textContent = a.text;
      list.appendChild(li);
    }
  });
}
