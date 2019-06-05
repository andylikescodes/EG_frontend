function UTC2Local(UTC_time){
  var date = new Date(UTC_time+ ' UTC');
  return date.toLocaleString()
}

function format_time(str){
  var date = new Date(str)
  return date.toLocaleString()
}

export {UTC2Local, format_time}
