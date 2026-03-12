// Snelheid per level (ms per stap)
function getSpeedForLevel(lv) {
  return Math.max(80, 1000 - lv * 10);
}

// Hoeveel lijnen nodig voor volgende level
function linesNeededForNextLevel(lv) {
  return lv * 5;
}
