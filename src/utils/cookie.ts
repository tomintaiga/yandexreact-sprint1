type CookieProps = {
  expires?: number | Date;
  [key: string]: any;
};

/**
 * Sets a cookie with the given name, value, and properties.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {CookieProps} [props] - Additional properties for the cookie (e.g., expires, path, domain).
 */
export const setCookie = (
  name: string,
  value: string,
  props?: CookieProps,
): void => {
  props = props || {};
  let exp: Date;

  // If expires is a number, convert it to a Date object
  if (typeof props.expires === 'number' && props.expires) {
    const d = new Date();
    d.setTime(d.getTime() + props.expires * 1000);
    exp = props.expires = d;
  } else if (props.expires instanceof Date) {
    exp = props.expires;
  } else {
    exp = new Date();
    exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 365);
  }

  value = encodeURIComponent(value);
  let updatedCookie = `${name}=${value}`;

  // Append additional properties to the cookie string
  for (const propName in props) {

    // Append the expires property to the cookie string
    if (propName === 'expires') {
      if (exp) {
        updatedCookie += `; expires=${exp.toUTCString()}`;
      }
      continue;
    }

    // Append the other properties to the cookie string
    updatedCookie += `; ${propName}`;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }

  // Set the cookie
  document.cookie = updatedCookie;
};

/**
 * Gets the value of a cookie with the given name.
 *
 * @param {string} name - The name of the cookie.
 * @returns {string|undefined} - The value of the cookie, or undefined if not found.
 */
export const getCookie = (name: string): string | null => {
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

      return matches ? decodeURIComponent(matches[1]) : null;
}