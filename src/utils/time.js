function UTC2Local(UTC_time){
  var date = new Date(UTC_time+ ' UTC');
  return date.toLocaleString()
}

export {UTC2Local}
