function saveAchievement(id) {
  let data = JSON.parse(localStorage.getItem("achievements") || "[]");
  if (!data.includes(id)) {
    data.push(id);
    localStorage.setItem("achievements", JSON.stringify(data));
  }
}

function isAchievementUnlocked(id) {
  let data = JSON.parse(localStorage.getItem("achievements") || "[]");
  return data.includes(id);
}

function getUnlockedAchievements() {
  return JSON.parse(localStorage.getItem("achievements") || "[]");
}
