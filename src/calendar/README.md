# `<Calendar>`
Displays an interactive calendar UI for navigating through calendar dates and selecting a date for form input. Renders a series of `<Day>` components to display the days in a month.

## Props
### date: `number`
The currently selected day of the month.

### month: `number`
The currently selected month of the year.

### year: `number`
The currently selected year.

### setDayInMonth: `function`
Sets the current date (day of month). Passed to `Day` component children.

### setMonth: `function`
Sets current month. Used by buttons in calendar header.

## Examples
```
<Calendar
  date={ new Date().getDate() }
  month={ new Date().getMonth() }
  year={ new Date().getFullYear() }
  setMonth={month => {
    this.setMonth(month)
  }}
  setDayInMonth={day => {
    this.setDayInMonth(day)
    this.setState({
      toggled: !this.state.toggled
    })
  }}
/>
```

## References
* [Calendar component](./calendar.jsx)
* [Day component](./day.jsx)
* [DateTimePicker component](../date-time-picker/date-time-picker.jsx)

# `<Day>`
A unit representing a day on the Calendar.

## Props
### dayOfMonth: `number`
The number displayed in the component.

### inThisMonth: `boolean`
If true this day is in the current month, i.e. not in a day prepended or appended for padding.

### isSelected: `boolean`
True if this Day is the currently selected date.

### onClick: `function`
Function called when Day is clicked.

## Example
```
<Day
  dayOfMonth={ rDate.getDate() }
  inThisMonth={ inThisMonth }
  isSelected={ (date === rDay) }
  onClick={ () => {setDayInMonth(rDay)} }
/>
```

## References
* [Calendar component](./calendar.jsx)
* [Day component](./day.jsx)
* [DateTimePicker component](../date-time-picker/date-time-picker.jsx)