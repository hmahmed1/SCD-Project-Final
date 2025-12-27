// check-login.js
const fs = require('fs');
const path = require('path');

console.log('🔐 Login.ejs File Content Check\n');

const loginPath = path.join(__dirname, 'views', 'login.ejs');
const content = fs.readFileSync(loginPath, 'utf8');

console.log('📊 Basic Information:');
console.log(`File size: ${content.length} characters`);
console.log(`Lines: ${content.split('\n').length}`);

console.log('\n🔍 Searching for key elements:');
const searchTerms = [
  { term: 'form', desc: 'Form tag' },
  { term: 'input', desc: 'Input fields' },
  { term: 'type="text"', desc: 'Text input' },
  { term: 'type="email"', desc: 'Email input' },
  { term: 'type="password"', desc: 'Password input' },
  { term: 'type="submit"', desc: 'Submit button' },
  { term: 'button', desc: 'Button elements' },
  { term: 'label', desc: 'Label elements' },
  { term: 'placeholder', desc: 'Placeholder text' },
  { term: 'required', desc: 'Required attribute' },
  { term: '.css', desc: 'CSS files' },
  { term: '.js', desc: 'JavaScript files' },
  { term: 'action=', desc: 'Form action' },
  { term: 'method=', desc: 'Form method' }
];

searchTerms.forEach(({ term, desc }) => {
  const found = content.includes(term);
  console.log(`  ${found ? '✅' : '❌'} ${desc}: ${found ? 'Found' : 'Not found'}`);
});

console.log('\n📝 First 10 lines:');
content.split('\n').slice(0, 10).forEach((line, i) => {
  console.log(`${i + 1}: ${line.trim()}`);
});

console.log('\n💡 If no EJS tags found, your login.ejs might be:');
console.log('1. Static HTML file');
console.log('2. Using includes: check for <%- include(...) %>');
console.log('3. All dynamic content handled by backend');