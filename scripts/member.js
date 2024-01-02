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
const primary = document.querySelector(".primary");
const secondary = document.querySelector(".secondary");

// bgm

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

// playOrPauseBGM()

// radar
let myRadarChart;
function createRadarChart(abilitiesData) {
  if (myRadarChart) {
    myRadarChart.destroy();
  }

  const abilityLabels = {
    "Trion": "触力能",
    "Attack": "攻击",
    "DefenseSupport": "防御·援护",
    "Mobility": "机动",
    "Skill": "技术",
    "Range": "射程",
    "Command": "指挥",
    "SpecialTactics": "特殊战术",
  };
  
  
  const labels = Object.keys(abilitiesData).map((key) => [`${abilitiesData[key]}`, `${abilityLabels[key] || key}`]);
  const data = Object.keys(abilitiesData).map((key) => abilitiesData[key]);
  const radarChartOptions = {
    type: "radar",
    data: {
      labels: labels,
      datasets: [
        {
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          pointBackgroundColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          pointStyle: false,
          data: data,
          color: "white",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
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

function setMemberData(member) {
  myRadarChart = createRadarChart(member.CombatInfo.Ability);
  nameLabel.innerHTML = member.BasicInfo.Name;
  squad.innerHTML = `${member.BasicInfo.Squad} ( ${member.BasicInfo.Rank} )`;
  backgroundImage.style.backgroundImage = `url(${member.Image})`;
  cursorImg.src = member.Cursor;
  const prevMain = primary.querySelectorAll(".triggerBox")
  if(prevMain.length > 0){
    for (let i = 0; i < prevMain.length; i++) {
      primary.removeChild(prevMain[i]) 
    }
  }
  const prevSub = secondary.querySelectorAll(".triggerBox")
  if(prevSub.length > 0){
    for (let i = 0; i < prevSub.length; i++) {
      secondary.removeChild(prevSub[i]) 
    }
  }

  if(member.CombatInfo.TriggerConfig){
    const triggers = member.CombatInfo.TriggerConfig
    for (let i = 0; i < triggers.PrimaryTrigger.length; i++) {
      const triggerName = triggers.PrimaryTrigger[i];
      let p = document.createElement("p")
      p.innerText = triggerName === "Free"? "Free Trigger" : triggerName
      p.classList.add("triggerBox")
      primary.appendChild(p)
    }
    for (let i = 0; i < triggers.SecondaryTrigger.length; i++) {
      const triggerName = triggers.SecondaryTrigger[i];
      let p = document.createElement("p")
      p.innerText = triggerName === "Free"? "Free Trigger" : triggerName
      p.classList.add("triggerBox")
      secondary.appendChild(p)
    }
  }
}

function nextMember() {
  if ( memberIndex >= 0  && memberList.length >= memberIndex + 1) {
    setMemberData(memberList[memberIndex]);
  } 
  else if( memberIndex < 0 ){
    memberIndex = memberList.length - 1
    setMemberData(memberList[memberIndex]);
  } 
  else {
    memberIndex = 0
    setMemberData(memberList[memberIndex]);
  }
}


// scroll detect

let count = 0
var scrollFunc = function (e) {
  var e = e || window.event;
  if (e.wheelDelta) {
    count += e.wheelDelta
    if (count > 800) { //当鼠标滚轮向上滚动时
      count = 0
      memberIndex --
      nextMember()
    }
    if (count < -800) { //当鼠标滚轮向下滚动时
      count = 0
      memberIndex ++
      nextMember()
    }
  } else if (e.detail) {
    count += e.detail
    if (count < -800 ){ //当鼠标滚轮向上滚动时
      count = 0
      memberIndex --
      nextMember()
    }
    if (count > 800) { //当鼠标滚轮向下滚动时
      count = 0
      memberIndex ++
      nextMember()
    }
  }
}

// ADDLISTENER
// mouse
let rad = 0;

addEventListener("mousemove", (event) => {
  cursor.style.display = "block";
  var x = event.clientX - 24;
  var y = event.clientY - 24;
  if (Math.abs(event.movementX) + Math.abs(event.movementY) > 6) {
      rad = Math.atan2(event.movementX, -event.movementY)
  }
  cursor.style.transform = `translate(${x}px, ${y}px) rotate(${rad}rad)`;
});

addEventListener("mouseout", () => {
  cursor.style.display = "none";
});

bgmController.addEventListener("click", playOrPauseBGM);
window.addEventListener("DOMMouseScroll", scrollFunc) // 给页面绑定鼠标滚轮事件，针对Google，mousewheel非标准事件已被弃用，请使用 wheel事件代替
window.addEventListener("wheel", scrollFunc)   // ie不支持wheel事件，若一定要兼容，可使用mousewheel
window.addEventListener("mousewheel", scrollFunc)



// main function run 
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