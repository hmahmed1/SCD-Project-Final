// real-ejs-test.js
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Mock data for testing
const mockData = {
  user: { name: 'Test User', email: 'test@example.com', isLoggedIn: true },
  products: [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 }
  ],
  title: 'Test Page',
  message: 'Welcome to our website!'
};

async function testEJSTemplates() {
  console.log('🧪 Real EJS Template Testing\n');

  const viewsPath = path.join(__dirname, 'views');
  const files = fs.readdirSync(viewsPath).filter(f => f.endsWith('.ejs'));

  for (const file of files) {
    console.log(`\n📄 Testing: ${file}`);
    console.log('-'.repeat(30));

    try {
      const template = fs.readFileSync(path.join(viewsPath, file), 'utf8');

      // Try to render with mock data
      const rendered = ejs.render(template, mockData);

      console.log(`✅ Successfully rendered`);
      console.log(`📏 Original: ${template.length} chars`);
      console.log(`📏 Rendered: ${rendered.length} chars`);

      // Save test output
      const outputFile = `test-output-${file.replace('.ejs', '')}.html`;
      fs.writeFileSync(outputFile, rendered);
      console.log(`💾 Output saved: ${outputFile}`);

    } catch (error) {
      console.log(`❌ Error: ${error.message}`);

      // If error is about missing includes, try without them
      if (error.message.includes('include')) {
        console.log('💡 Try removing <%- include(...) %> tags');
      }
    }
  }

  console.log('\n' + '='.repeat(40));
  console.log('🎉 All templates tested!');
  console.log('='.repeat(40));
}

testEJSTemplates();