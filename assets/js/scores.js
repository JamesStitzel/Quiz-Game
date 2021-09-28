var topScores = JSON.parse(localStorage.getItem("highscores"))|| [];
var scoreList = document.getElementById('list')
topScores.forEach(function(person, index){
   var li = document.createElement("li")
   li.textContent = "initials:" + " " + person.initials + " " + "score:"+ " " + person.score;
   scoreList.appendChild(li)
})
document.getElementById("clear").addEventListener("click", function () {
    localStorage.clear();
    location.reload();
  })