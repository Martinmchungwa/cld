const holidays = {
  "1-1": "New Year's Day",
  "12-25": "Christmas Day",
  "7-4": "Independence Day"
};

const events = {
  "2025-5-14": "Project Deadline",
  "weekly-1": "Weekly Team Sync",       // Monday
  "monthly-15": "Mid-month Review",
  "yearly-10-5": "Annual Meetup"
};

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById('clock').textContent = `Current Time: ${time}`;
}
setInterval(updateClock, 1000);
updateClock();

let currentDate = new Date();

function renderCalendar(date) {
  const monthYear = document.getElementById("monthYear");
  const calendarDates = document.getElementById("calendarDates");

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = `${date.toLocaleDateString("default", { month: "long" })} ${year}`;
  calendarDates.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    calendarDates.innerHTML += '<div></div>';
  }

  const today = new Date();
  for (let i = 1; i <= lastDate; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = i;

    const isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    if (isToday) dayDiv.classList.add("today");

    const holidayKey = `${month + 1}-${i}`;
    if (holidays[holidayKey]) {
      dayDiv.classList.add("holiday");
      dayDiv.title = holidays[holidayKey];
    }

    const fullKey = `${year}-${month + 1}-${i}`;
    const weeklyKey = `weekly-${new Date(year, month, i).getDay()}`;
    const monthlyKey = `monthly-${i}`;
    const yearlyKey = `yearly-${month + 1}-${i}`;

    const eventText = events[fullKey] || events[weeklyKey] || events[monthlyKey] || events[yearlyKey];
    if (eventText) {
      dayDiv.classList.add("event");
      dayDiv.title = eventText;
    }

    calendarDates.appendChild(dayDiv);
  }

  const todayKey = `${year}-${month + 1}-${today.getDate()}`;
  if (events[todayKey]) {
    alert(`Reminder: ${events[todayKey]}`);
  }
}

document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

function toggleDarkMode() {
  document.body.classList.toggle("theme-dark");
}

function changeTheme(theme) {
  document.body.className = '';
  document.body.classList.add(`theme-${theme}`);
}

renderCalendar(currentDate);
