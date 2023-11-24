const container = document.querySelector(".container")
let rad = 0
addEventListener("mousemove",(event)=>{
	var x = event.clientX - 24;
	var y = event.clientY;
    if(Math.abs(event.movementX) + Math.abs(event.movementY) > 6){
        // rad = Math.atan2(event.movementX, -event.movementY)
    }
	container.style.transform = `translate(${x}px, ${y}px) rotate(${rad}rad)`
});