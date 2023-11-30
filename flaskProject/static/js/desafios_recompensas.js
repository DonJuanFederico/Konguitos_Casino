function addChallenge() {
  var challengeText = prompt("Ingrese el nuevo desafío:");
  if (challengeText) {
    var challengeList = document.getElementById("challenge-list");
    var newChallenge = document.createElement("li");
    newChallenge.textContent = challengeText;
    challengeList.appendChild(newChallenge);
  }
}

function addReward() {
  var rewardText = prompt("Ingrese la nueva recompensa:");
  if (rewardText) {
    var rewardList = document.getElementById("reward-list");
    var newReward = document.createElement("li");
    newReward.textContent = rewardText;
    rewardList.appendChild(newReward);
  }
}
