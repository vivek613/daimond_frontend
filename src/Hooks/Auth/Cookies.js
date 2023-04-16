export const setCookies = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};
export const getCookies = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};


export const findMax = (val1, val2) => {

  var max1 = Math.max.apply(null, val1);
  var max2 = Math.max.apply(null, val2);
  const max = Math.max(max1, max2);
  var maxY = max > 5 ? Math.ceil(max / 5) * 5 : 5;

  return maxY;

} 