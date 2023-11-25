// declare variable
const cursor = document.querySelector(".cursor");
const bgmController = document.querySelector(".bgm-controller");
const CD = document.querySelector(".cd");
const CD2 = document.querySelector(".cd2");
const bgm = document.querySelector("audio");
const nameLabel = document.querySelector("#name");
const squad = document.querySelector("#squad");
const backgroundImage = document.querySelector("html");
const cursorImg = document.querySelector("#cursorImg");

// mouse
let rad = 0;

addEventListener("mousemove", (event) => {
  cursor.style.display = "block";
  var x = event.clientX - 24;
  var y = event.clientY - 24;
  // if (Math.abs(event.movementX) + Math.abs(event.movementY) > 6) {
  //     rad = Math.atan2(event.movementX, -event.movementY)
  // }
  cursor.style.transform = `translate(${x}px, ${y}px) rotate(${rad}rad)`;
});

addEventListener("mouseout", (event) => {
  cursor.style.display = "none";
});

// bgm
bgmController.addEventListener("click", playOrPauseBGM);

function playOrPauseBGM() {
  if (bgm.paused) {
    CD.classList.add("spin");
    CD2.classList.add("rotate30");
    setTimeout(() => {
      bgm.play();
    }, 500);
  } else {
    bgm.pause();
    CD.classList.remove("spin");
    CD2.classList.remove("rotate30");
  }
}

// radar
let myRadarChart;
function createRadarChart(abilitiesData) {
  if (myRadarChart) {
    myRadarChart.destroy();
  }
  const radarChartOptions = {
    type: "radar",
    data: {
      labels: [
        [`${abilitiesData[0]}`, "触力能"],
        [`${abilitiesData[1]}`, "攻击"],
        [`${abilitiesData[2]}`, "防御·援护"],
        [`${abilitiesData[3]}`, "机动"],
        [`${abilitiesData[4]}`, "技术"],
      ],
      datasets: [
        {
          label: "能力值",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          pointBackgroundColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          pointStyle: false,
          data: abilitiesData,
          color: "white",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "rgba(54, 162, 235, 1)",
          },
        },
      },
      scales: {
        r: {
          angleLines: {
            color: "rgba(54, 162, 235, 0.3)",
          },
          grid: {
            lineWidth: 1,
            color: "rgba(54, 162, 235, 0.3)",
          },
          suggestedMin: 0,
          max: 10,
          pointLabels: {
            color: "rgba(54, 162, 235, 1)",
            font: {
              size: 16,
            },
          },
          ticks: {
            showLabelBackdrop: false,
            font: {
              size: 18,
            },
            color: "rgba(54, 162, 235, 0.8)",
          },
          backgroundColor: "rgba(25, 25, 25, 0.9)",
        },
      },
    },
  };
  const ctx = document.getElementById("myRadarChart").getContext("2d");
  myRadarChart = new Chart(ctx, radarChartOptions);
  return myRadarChart;
}

//member data
var memberIndex = 0;
var memberList;
fetch("member.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    memberList = data;
    if (data.length > 0) {
      setMemberData(data[memberIndex]);
    }
  });

function setMemberData(member) {
  myRadarChart = createRadarChart(member.CombatInfo.AbilityList);
  nameLabel.innerHTML = member.BasicInfo.Name;
  squad.innerHTML = `${member.BasicInfo.Squad} ( ${member.BasicInfo.Rank} )`;
  backgroundImage.style.backgroundImage = `url(${member.Image})`;
  cursorImg.src = member.Cursor;
}

function nextMember() {
  if (memberList.length > memberIndex + 1) {
    memberIndex++;
    setMemberData(memberList[memberIndex]);
  } else {
    memberIndex = 0;
    setMemberData(memberList[memberIndex]);
  }
}

nameLabel.addEventListener("click", nextMember);
