/**
 * Sets a cookie with the given name, value, and properties.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {Object} [props] - Additional properties for the cookie (e.g., expires, path, domain).
 */
export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  // If expires is a number, convert it to a Date object
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  // Convert expires to UTC string if it is a Date object
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  // Append additional properties to the cookie string
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  // Set the cookie
  document.cookie = updatedCookie;
}

/**
 * Gets the value of a cookie with the given name.
 *
 * @param {string} name - The name of the cookie.
 * @returns {string|undefined} - The value of the cookie, or undefined if not found.
 */
export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      /**
       * Create a regex to match the cookie name and capture its value.
       *
       * Explanation of the regex:
       * - (?:^|; ): Non-capturing group to match the start of the string (^) or a semicolon followed by a space (; ).
       * - name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1'): Escape special characters in the cookie name to ensure the regex is valid.
       *   - The regex /([\.$?*|{}\(\)\[\]\\\/\+^])/g matches any of the special characters: . $ ? * | { } ( ) [ ] \ / + ^
       *   - The replace function adds a backslash (\) before each special character to escape it.
       * - =([^;]*): Match an equals sign (=) followed by a capturing group that matches any character except a semicolon ([^;]*).
       */
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  );
  // If a match is found, decode and return the cookie value, otherwise return undefined
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
