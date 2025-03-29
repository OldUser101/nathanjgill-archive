function setDoorColors() {
	const colors = ["#AA0000", "#00AA00"];
	const doors = document.querySelectorAll(".door");
	doors.forEach((door, index) => {
		door.style.backgroundColor = colors[index % colors.length];
	});
	
	const texts = document.querySelectorAll(".text");
	texts.forEach((text, index) => {
		text.style.border = "1px solid " + colors[index % colors.length];
		text.style.color = colors[index % colors.length];
	});
}

function getCookie(name) {
	const cookie = document.cookie.split("; ").find(row => row.startsWith(name + "="));
	return cookie ? decodeURIComponent(cookie.split("=")[1]) : "";
}

function setCookie(name, value, days) {
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
}

function clearCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

function handleDoorCookie() {
	const openedDoors = getCookie("openedDoors").split(",").filter(Boolean);
	const today = new Date().toISOString().split("T")[0];
	const doors = document.querySelectorAll(".door-container");
	
	doors.forEach(door => {
		const doorNumber = door.dataset.door;
		const doorDate = door.dataset.date;
		const doorElement = door.querySelector(".door");

		if (doorDate > today) {
			doorElement.classList.add("locked");
		}
		else if (openedDoors.includes(doorNumber)) {
			doorElement.classList.add("open");
		}
		else {
			doorElement.classList.add("can-open");
		}
		
        doorElement.addEventListener("click", () => {
            if (doorElement.classList.contains("can-open")) {
                doorElement.classList.remove("can-open");
                doorElement.classList.add("open");
                openedDoors.push(doorNumber);
                setCookie("openedDoors", openedDoors.join(","), 30);
            }
			
			if (doorElement.classList.contains("locked")) {
				doorElement.classList.add("shaking");
				setTimeout(() => doorElement.classList.remove("shaking"), 500);
			}
        });
	});
}

document.addEventListener('DOMContentLoaded', function() {
	setDoorColors();
	handleDoorCookie();
	
	const resetButton = document.getElementById("reset-calendar");
	resetButton.addEventListener("click", () => {
        clearCookie("openedDoors");
		const doors = document.querySelectorAll(".door");
		doors.forEach(door => {
            door.classList.remove("open", "can-open", "locked");
        });
		handleDoorCookie();
    });
	
	const nextButton = document.getElementById("next");
	const prevButton = document.getElementById("prev");
	nextButton.addEventListener("click", () => {
		alert("You can't do that, there aren't any more calendars yet!");
	});
	prevButton.addEventListener("click", () => {
		alert("You can't do that, this is the first year!");
	});
});