import type { ExampleSnippet } from '../types';

export const exampleSnippets: ExampleSnippet[] = [
  // Variables
  {
    id: 'var-basic',
    title: 'Basic Variables',
    description: 'Learn how to declare and use variables',
    code: `let name = "Alice";
const age = 25;
var isStudent = true;

console.log("Hello, " + name);
console.log("Age:", age);
console.log("Is student:", isStudent);`,
    category: 'variables',
    difficulty: 'beginner'
  },
  {
    id: 'var-scope',
    title: 'Variable Scope',
    description: 'Understanding let, const, and var scope differences',
    code: `function scopeExample() {
  if (true) {
    let blockScoped = "I'm block scoped";
    const alsoBlockScoped = "Me too!";
    var functionScoped = "I'm function scoped";
  }
  
  // console.log(blockScoped); // Error!
  console.log(functionScoped); // Works!
}

scopeExample();`,
    category: 'variables',
    difficulty: 'intermediate'
  },

  // Functions
  {
    id: 'func-basic',
    title: 'Basic Functions',
    description: 'Creating and calling functions',
    code: `function greet(name) {
  return "Hello, " + name + "!";
}

const add = function(a, b) {
  return a + b;
};

const multiply = (x, y) => x * y;

console.log(greet("World"));
console.log(add(5, 3));
console.log(multiply(4, 6));`,
    category: 'functions',
    difficulty: 'beginner'
  },
  {
    id: 'func-closure',
    title: 'Closures',
    description: 'Understanding closures and lexical scope',
    code: `function createCounter() {
  let count = 0;
  
  return function() {
    count++;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1`,
    category: 'functions',
    difficulty: 'intermediate'
  },

  // Loops
  {
    id: 'loop-for',
    title: 'For Loops',
    description: 'Different types of for loops',
    code: `// Traditional for loop
for (let i = 0; i < 5; i++) {
  console.log("Count:", i);
}

// For...of loop (arrays)
const fruits = ["apple", "banana", "orange"];
for (const fruit of fruits) {
  console.log("Fruit:", fruit);
}

// For...in loop (objects)
const person = { name: "John", age: 30 };
for (const key in person) {
  console.log(key + ":", person[key]);
}`,
    category: 'loops',
    difficulty: 'beginner'
  },
  {
    id: 'loop-while',
    title: 'While Loops',
    description: 'While and do-while loops',
    code: `let count = 0;

// While loop
while (count < 3) {
  console.log("While count:", count);
  count++;
}

let num = 0;

// Do-while loop
do {
  console.log("Do-while num:", num);
  num++;
} while (num < 2);`,
    category: 'loops',
    difficulty: 'beginner'
  },

  // Objects
  {
    id: 'obj-basic',
    title: 'Basic Objects',
    description: 'Creating and using objects',
    code: `const person = {
  name: "Sarah",
  age: 28,
  city: "New York",
  
  introduce: function() {
    return \`Hi, I'm \${this.name} from \${this.city}\`;
  }
};

console.log(person.name);
console.log(person["age"]);
console.log(person.introduce());

// Adding new properties
person.job = "Developer";
console.log(person.job);`,
    category: 'objects',
    difficulty: 'beginner'
  },
  {
    id: 'obj-destructuring',
    title: 'Object Destructuring',
    description: 'Extracting values from objects',
    code: `const user = {
  id: 1,
  username: "johndoe",
  email: "john@example.com",
  profile: {
    firstName: "John",
    lastName: "Doe"
  }
};

// Basic destructuring
const { username, email } = user;
console.log(username, email);

// Nested destructuring
const { profile: { firstName, lastName } } = user;
console.log(firstName, lastName);

// With default values
const { phone = "Not provided" } = user;
console.log(phone);`,
    category: 'objects',
    difficulty: 'intermediate'
  },

  // Arrays
  {
    id: 'arr-basic',
    title: 'Basic Arrays',
    description: 'Working with arrays',
    code: `const numbers = [1, 2, 3, 4, 5];
const colors = ["red", "green", "blue"];

console.log(numbers[0]); // First element
console.log(numbers.length); // Array length

// Adding elements
numbers.push(6);
colors.unshift("yellow");

console.log(numbers);
console.log(colors);

// Removing elements
const lastNumber = numbers.pop();
const firstColor = colors.shift();

console.log("Removed:", lastNumber, firstColor);`,
    category: 'arrays',
    difficulty: 'beginner'
  },
  {
    id: 'arr-methods',
    title: 'Array Methods',
    description: 'Useful array methods like map, filter, reduce',
    code: `const numbers = [1, 2, 3, 4, 5, 6];

// Map - transform each element
const doubled = numbers.map(num => num * 2);
console.log("Doubled:", doubled);

// Filter - select elements that match condition
const evens = numbers.filter(num => num % 2 === 0);
console.log("Even numbers:", evens);

// Reduce - combine all elements into single value
const sum = numbers.reduce((total, num) => total + num, 0);
console.log("Sum:", sum);

// Find - get first element that matches
const found = numbers.find(num => num > 3);
console.log("First > 3:", found);`,
    category: 'arrays',
    difficulty: 'intermediate'
  },

  // Async
  {
    id: 'async-promise',
    title: 'Promises',
    description: 'Working with promises',
    code: `function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.3;
      if (success) {
        resolve("Data loaded successfully!");
      } else {
        reject("Failed to load data");
      }
    }, 1000);
  });
}

fetchData()
  .then(data => {
    console.log("Success:", data);
  })
  .catch(error => {
    console.log("Error:", error);
  });`,
    category: 'async',
    difficulty: 'intermediate'
  },
  {
    id: 'async-await',
    title: 'Async/Await',
    description: 'Modern async programming with async/await',
    code: `async function loadUserData(userId) {
  try {
    console.log("Loading user data...");
    
    // Simulate API call
    const userData = await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          id: userId,
          name: "John Doe",
          email: "john@example.com"
        });
      }, 1000);
    });
    
    console.log("User data:", userData);
    return userData;
  } catch (error) {
    console.error("Error loading user:", error);
  }
}

loadUserData(123);`,
    category: 'async',
    difficulty: 'advanced'
  }
];

export const getExamplesByCategory = (category: ExampleSnippet['category']) => {
  return exampleSnippets.filter(example => example.category === category);
};

export const getExamplesByDifficulty = (difficulty: ExampleSnippet['difficulty']) => {
  return exampleSnippets.filter(example => example.difficulty === difficulty);
};

export const getExampleById = (id: string) => {
  return exampleSnippets.find(example => example.id === id);
};
