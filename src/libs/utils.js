class Utils {
  static setIdShortcuts(srcElem, destElem, attrName = "id") {
    const elems = srcElem.querySelectorAll("[" + attrName + "]");
    for (const elem of elems) {
      const idValue = elem.getAttribute(attrName);
      destElem[idValue] = elem;
    }
  }

  static createElement(tag, attrs = {}, children = []) {
    const element = document.createElement(tag);
    for (const attr in attrs) {
      element.setAttribute(attr, attrs[attr]);
    }
    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });

    return element;
  }

  static setPageTitle(title) {
    document.title = title;
  }

  static setMetaTag(name, content) {
    let metaTag = document.head.querySelector(`meta[name="${name}"]`);
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.name = name;
      document.head.appendChild(metaTag);
    }
    metaTag.content = content;
  }

  static isEmpty(items) {
    let res = false;
    const typeOfItems = typeof items;
    if (items == null || items == undefined) {
      res = true;
    } else if (Array.isArray(items)) {
      if (items.length == 0) {
        res = true;
      }
    } else if (typeOfItems == "string") {
      const str = items.trim();
      if (str.length == 0 || str == "") {
        res = true;
      }
    } else if (typeOfItems == "object") {
      if (items?.constructor?.name == "NodeList") {
        res = length > 0;
      } else {
        res = Utils.isEmptyObj(items);
      }
    } else if (items.length == 0) {
      res = true;
    }

    return res;
  }

  static async fetchTemplate(templatePath) {
    const baseUrl = window.location.origin;

    const response = await fetch(`${baseUrl}/views/${templatePath}`);
    console.log('response', response)
    if (!response.ok) {
      throw new Error(`Error fetching template ${templatePath}`);
    }
    return await response.text();
  }

  static toDocument(html) {
    var template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content;
  }

  static Register_Element(elem_class) {
   
    const comp_class = customElements.get(elem_class.tname);
    if (comp_class == undefined) {
      customElements.define(elem_class.tname, elem_class);
    }
  }

  static Bind(obj, fn_prefix)
  {
    const members = Utils.getMethods(obj);
    for (const member of members)
    {
      if (typeof obj[member] == "function" && member.startsWith(fn_prefix))
      {
        obj[member] = obj[member].bind(obj);
      }
    }
  }

  static getMethods(obj)
  {
    let properties = new Set();
    let currentObj = obj;
    do 
    {
      Object.getOwnPropertyNames(currentObj).map(item => properties.add(item));
    }
    while ((currentObj = Object.getPrototypeOf(currentObj)));
    return [...properties.keys()].filter(item => typeof obj[item] === 'function');
  }
  static loadCSS(url) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${url}?t=${Date.now()}`; // Add timestamp
      link.onload = () => resolve(link);
      link.onerror = (error) => reject(error);
      document.head.appendChild(link);
    });
  }
  static showApiError(input, errorMessage)
  {
    const errorElement = Utils.createElement('div', {class: 'error-message'}, []);
    input.parentNode.insertBefore(errorElement, input.nextSibling);
    input.parentNode.classList.add('error')
    if (errorElement) {
      errorElement.textContent = errorMessage;
    } else {
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('error-message');
      errorDiv.textContent = errorMessage;
      input.parentElement.appendChild(errorDiv);
    }
  }
  static extractNumericWord(str)
  {
    const Regex = /\d+/;
    const code = str.match(Regex);
  
    if (code) {
      return code[0];
    } else {
      return null;
    }
  }
  
  static getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        reject(new Error('Geolocation not supported by this browser'));
      }
    });
  }
}
export default Utils;
