// detailed-test.js
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

console.log('🔍 Detailed EJS Files Analysis\n');

const viewsPath = path.join(__dirname, 'views');

// 1. Check which files actually have EJS syntax
console.log('1. EJS Syntax Analysis:');
console.log('='.repeat(40));

const files = fs.readdirSync(viewsPath).filter(f => f.endsWith('.ejs'));
let hasEJSCount = 0;

files.forEach(file => {
  const content = fs.readFileSync(path.join(viewsPath, file), 'utf8');
  const hasEJS = content.includes('<%');
  const hasInclude = content.includes('<%- include');
  const hasVariables = content.includes('<%=');

  console.log(`📄 ${file}:`);
  console.log(`   Size: ${content.length} chars`);
  console.log(`   EJS Tags (<%): ${hasEJS ? '✅ Yes' : '❌ No'}`);
  console.log(`   Includes: ${hasInclude ? '✅ Yes' : '❌ No'}`);
  console.log(`   Variables: ${hasVariables ? '✅ Yes' : '❌ No'}`);

  if (hasEJS || hasInclude || hasVariables) {
    hasEJSCount++;

    // Show sample EJS code
    if (hasEJS) {
      const ejsLine = content.split('\n').find(line => line.includes('<%'));
      if (ejsLine) {
        console.log(`   Sample: ${ejsLine.trim().substring(0, 50)}...`);
      }
    }
  }
  console.log('');
});

console.log(`📊 ${hasEJSCount}/${files.length} files contain EJS syntax`);

// 2. Test project_homepage.ejs (likely main file)
console.log('\n2. Testing project_homepage.ejs:');
console.log('='.repeat(40));

const homepagePath = path.join(viewsPath, 'project_homepage.ejs');
if (fs.existsSync(homepagePath)) {
  const content = fs.readFileSync(homepagePath, 'utf8');

  // Common checks for homepage
  const checks = [
    { name: 'Navigation', search: ['nav', 'navbar', 'menu'], found: false },
    { name: 'Footer', search: ['footer'], found: false },
    { name: 'Header', search: ['header', 'h1', 'h2'], found: false },
    { name: 'Images', search: ['img', 'image', 'src='], found: false },
    { name: 'Links', search: ['<a href', 'href='], found: false },
    { name: 'Scripts', search: ['<script'], found: false },
    { name: 'Styles', search: ['<link', 'style=', '.css'], found: false }
  ];

  checks.forEach(check => {
    check.found = check.search.some(term =>
      content.toLowerCase().includes(term.toLowerCase())
    );
  });

  console.log('✅ File loaded successfully');
  console.log(`📏 Size: ${content.length} characters (${Math.round(content.length / 1024)} KB)`);

  console.log('\n🔍 Content Analysis:');
  checks.forEach(check => {
    console.log(`   ${check.found ? '✅' : '❌'} ${check.name}`);
  });

  // Show first 3 lines
  console.log('\n📝 First few lines:');
  const lines = content.split('\n').slice(0, 3);
  lines.forEach((line, i) => {
    console.log(`   ${i + 1}. ${line.trim().substring(0, 80)}${line.length > 80 ? '...' : ''}`);
  });
}

// 3. Create a sample EJS test
console.log('\n3. Creating and Testing Sample EJS Template:');
console.log('='.repeat(40));

const sampleTemplate = `
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
    <link rel="stylesheet" href="<%= cssFile %>">
</head>
<body>
    <%- include('header') %>
    
    <h1>Welcome to <%= pageName %></h1>
    <p>User: <%= user.name %></p>
    <p>Email: <%= user.email %></p>
    
    <% if(user.isAdmin) { %>
        <button>Admin Panel</button>
    <% } %>
    
    <ul>
    <% items.forEach(item => { %>
        <li><%= item %></li>
    <% }); %>
    </ul>
    
    <%- include('footer') %>
</body>
</html>
`;

const sampleData = {
  title: 'Test Page',
  cssFile: 'styles.css',
  pageName: 'Dashboard',
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    isAdmin: true
  },
  items: ['Apple', 'Banana', 'Cherry']
};

try {
  const rendered = ejs.render(sampleTemplate, sampleData);
  console.log('✅ Sample EJS rendered successfully!');
  console.log(`📏 Rendered size: ${rendered.length} characters`);

  // Check if includes were processed
  console.log('\n🔍 Rendering Checks:');
  console.log(`   Title replaced: ${rendered.includes('Test Page') ? '✅' : '❌'}`);
  console.log(`   User name: ${rendered.includes('John Doe') ? '✅' : '❌'}`);
  console.log(`   Admin button: ${rendered.includes('Admin Panel') ? '✅' : '❌'}`);
  console.log(`   List items: ${rendered.includes('<li>Apple</li>') ? '✅' : '❌'}`);

  // Save sample output
  fs.writeFileSync('sample-output.html', rendered);
  console.log('\n💾 Sample output saved as: sample-output.html');

} catch (error) {
  console.log('❌ Error rendering sample:', error.message);
}

console.log('\n' + '='.repeat(40));
console.log('🎯 TESTING COMPLETE!');
console.log('='.repeat(40));