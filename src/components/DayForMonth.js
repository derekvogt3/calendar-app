export default function DayForMonth({ day }) {
  return (
    <div
      className={
        day.isCurrentMonth ? "cal-day-cur-month" : "cal-day-prev-month"
      }
    >
      <div className={day.isToday ? "current-day" : ""}>
        {day.date.getDate()}
      </div>

      <div></div>
    </div>
  );
}
