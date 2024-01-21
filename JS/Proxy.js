new Proxy(target, handler)

const target = {
  message1: "hello",
  message2: "everyone"
};

const handler2 = {
  get(target, prop, receiver) {
    return "world";
  }
};

const proxy2 = new Proxy(target, handler2);

console.log(proxy2.message1); // world
console.log(proxy2.message2); // world



const target = {
    message1: "hello",
    message2: "everyone"
  };
  
  const handler3 = {
    get(target, prop, receiver) {
      if (prop === "message2") {
        return "world";
      }
      return Reflect.get(...arguments);
    },
  };
  
  const proxy3 = new Proxy(target, handler3);
  
  console.log(proxy3.message1); // hello

//  default value when the property name is not in the object.
const handler = {
  get(obj, prop) {
    return prop in obj ?
      obj[prop] :
      37;
  }
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b);
//  1, undefined

console.log('c' in p, p.c);
//  false, 37


/****************************************************
 * Mapnipulate DOM 
 ***************************************************/
const view = new Proxy({
    selected: null,
  },
  {
    set(obj, prop, newval) {
      const oldval = obj[prop];
  
      if (prop === 'selected') {
        if (oldval) {
          oldval.setAttribute('aria-selected', 'false');
        }
        if (newval) {
          newval.setAttribute('aria-selected', 'true');
        }
      }
  
      obj[prop] = newval; // The default behavior to store the value
  
      return true;       // Indicate success
    }
  });
  
  const item1 = document.getElementById('item-1');
  const item2 = document.getElementById('item-2');
  

  view.selected = item1;   // select item1:
  
  console.log(`item1: ${item1.getAttribute('aria-selected')}`);  // item1: true
  
  view.selected = item2;  // selecting item2 de-selects item1:
  
  console.log(`item1: ${item1.getAttribute('aria-selected')}`);  // item1: false
  
  console.log(`item2: ${item2.getAttribute('aria-selected')}`);  // item2: true


/****************************************************
 * value Correction
 ***************************************************/
const products = new Proxy({
    browsers: ['Internet Explorer', 'Netscape']
  },
  {
    get(obj, prop) {
      // An extra property
      if (prop === 'latestBrowser') {
        return obj.browsers[obj.browsers.length - 1];
      }
  
      // The default behavior to return the value
      return obj[prop];
    },
    set(obj, prop, value) {
      // An extra property
      if (prop === 'latestBrowser') {
        obj.browsers.push(value);
        return true;
      }
  
      // Convert the value if it is not an array
      if (typeof value === 'string') {
        value = [value];
      }
  
      // The default behavior to store the value
      obj[prop] = value;
  
      // Indicate success
      return true;
    }
  });
  
  console.log(products.browsers);  //  ['Internet Explorer', 'Netscape']
  
  products.browsers = 'Firefox';  //  pass a string (by mistake)
  
  console.log(products.browsers);  //  ['Firefox'] <- no problem, the value is an array
  
  products.latestBrowser = 'Chrome';
  
  console.log(products.browsers);  //  ['Firefox', 'Chrome']
  
  console.log(products.latestBrowser);  //  'Chrome'




/****************************************************
 * Find a table row by its cell
 ***************************************************/
const products = new Proxy([
    { name: 'Firefox', type: 'browser' },
    { name: 'SeaMonkey', type: 'browser' },
    { name: 'Thunderbird', type: 'mailer' }
  ],
  {
    get(obj, prop) {
      // The default behavior to return the value; prop is usually an integer
      if (prop in obj) {
        return obj[prop];
      }
  
      // Get the number of products; an alias of products.length
      if (prop === 'number') {
        return obj.length;
      }
  
      let result;
      const types = {};
  
      for (const product of obj) {
        if (product.name === prop) {
          result = product;
        }
        if (types[product.type]) {
          types[product.type].push(product);
        } else {
          types[product.type] = [product];
        }
      }
  
      // Get a product by name
      if (result) {
        return result;
      }
  
      // Get products by type
      if (prop in types) {
        return types[prop];
      }
  
      // Get product types
      if (prop === 'types') {
        return Object.keys(types);
      }
  
      return undefined;
    }
  });
  
  console.log(products[0]);          // { name: 'Firefox', type: 'browser' }
  console.log(products['Firefox']);  // { name: 'Firefox', type: 'browser' }
  console.log(products['Chrome']);   // undefined
  console.log(products.browser);     // [{ name: 'Firefox', type: 'browser' }, { name: 'SeaMonkey', type: 'browser' }]
  console.log(products.types);       // ['browser', 'mailer']
  console.log(products.number);      // 3



/****************************************************
 * Complete Proxy TRAPS 
 ***************************************************/
const docCookies = new Proxy(docCookies, {
    get(target, key) {
      return target[key] || target.getItem(key) || undefined;
    },
    set(target, key, value) {
      if (key in target) { return false; }
      return target.setItem(key, value);
    },
    deleteProperty(target, key) {
      if (!(key in target)) { return false; }
      return target.removeItem(key);
    },
    ownKeys(target) {
      return target.keys();
    },
    has(target, key) {
      return key in target || target.hasItem(key);
    },
    defineProperty(target, key, descriptor) {
      if (descriptor && 'value' in descriptor) {
        target.setItem(key, descriptor.value);
      }
      return target;
    },
    getOwnPropertyDescriptor(target, key) {
      const value = target.getItem(key);
      return value ? {
        value,
        writable: true,
        enumerable: true,
        configurable: false,
      } : undefined;
    },
  });
  
  /* Cookies test */
  console.log(docCookies.myCookie1 = 'First value');
  console.log(docCookies.getItem('myCookie1'));
  
  docCookies.setItem('myCookie1', 'Changed value');
  console.log(docCookies.myCookie1);




handler.apply()
function sum(a, b) {
  return a + b;
}
const handler = {
  apply: function(target, thisArg, argumentsList) {
    console.log(`Calculate sum: ${argumentsList}`);
    // expected output: "Calculate sum: 1,2"

    return target(argumentsList[0], argumentsList[1]) * 10;
  }
};

const proxy1 = new Proxy(sum, handler);

console.log(sum(1, 2));// expected output: 3
console.log(proxy1(1, 2));// expected output: 30





  