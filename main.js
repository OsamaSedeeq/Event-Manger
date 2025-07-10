setminDate();
displayEvents();
function setminDate() {
  const today = new Date().toISOString().split("T")[0];
  const eventDate = document.querySelector(".event-date");
  eventDate.min = today;
  eventDate.addEventListener("input", () => {
    if (eventDate.value < today) {
      eventDate.value = today;
    }
  });
}

const addbtn = document.querySelector(".add");
addbtn.addEventListener("click", () => {
  addEvent();
});

function addEvent() {
  const eventName = document.querySelector(".event-name").value;
  const eventOrganizer = document.querySelector(".organizer").value;
  const evenDate = document.querySelector(".event-date").value;
  const timeStamp = new Date(evenDate).getTime();
  if ((eventOrganizer, eventName, evenDate, timeStamp)) {
    const event = {
      name: eventName,
      organizer: eventOrganizer,
      date: evenDate,
      time: timeStamp,
    };
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    displayEvents();
  } else {
    alert("please fill all fields");
  }
}

function displayEvents() {
  const events = JSON.parse(localStorage.getItem("events")) || [];
  const eventsList = document.querySelector(".events");
  eventsList.innerHTML = "";

  events.forEach((event) => {
    let today = new Date().getTime();
    let remainTime = event.time - today;

    const days = Math.floor(remainTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((remainTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainTime % (1000 * 60)) / 1000);
    eventsList.innerHTML += `<div class="event">
          <h3>${event.name}</h3>
          <p><span>by</span> ${event.organizer}</p>
          <p><span>on</span> ${event.date}</p>
          <p><span>Time Left</span> ${days}d ${hours}h ${minutes}m ${seconds}s</p>
          <button>Delete</button>
      </div>`;
  });

  deleteEvent();
}

function deleteEvent() {
  const deletBtn = document.querySelectorAll(".events .event button");
  deletBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const events = JSON.parse(localStorage.getItem("events"));
      events.splice(index, 1);
      localStorage.setItem("events", JSON.stringify(events));
      displayEvents();
    });
  });
}

setInterval(() => {
  displayEvents();
}, 1000);
