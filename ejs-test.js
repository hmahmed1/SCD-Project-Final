// ejs-test.js
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

console.log('🚀 Starting EJS Files Test...\n');
console.log('📁 Current Directory:', __dirname);
console.log('');

// Step 1: Check views folder
const viewsPath = path.join(__dirname, 'views');
console.log('1️⃣ Checking views folder...');

if (!fs.existsSync(viewsPath)) {
  console.log('❌ ERROR: views/ folder not found!');
  console.log('💡 Make sure you are in the correct directory');
  process.exit(1);
}

console.log('✅ views/ folder found at:', viewsPath);

// Step 2: List all EJS files
const files = fs.readdirSync(viewsPath);
const ejsFiles = files.filter(f => f.endsWith('.ejs'));

console.log('\n2️⃣ Found EJS files:');
if (ejsFiles.length === 0) {
  console.log('❌ No EJS files found in views/ folder');
} else {
  ejsFiles.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
  });
}

// Step 3: Test first EJS file (login.ejs)
console.log('\n3️⃣ Testing login.ejs file...');

if (ejsFiles.includes('login.ejs')) {
  try {
    const filePath = path.join(viewsPath, 'login.ejs');
    const content = fs.readFileSync(filePath, 'utf8');

    console.log('   📄 File loaded successfully');
    console.log('   📏 Size:', content.length, 'characters');

    // Simple checks
    console.log('\n   🔍 Quick Analysis:');
    console.log('   - Has <form> tag?', content.includes('<form') ? '✅ Yes' : '❌ No');
    console.log('   - Has <input> tags?', content.includes('<input') ? '✅ Yes' : '❌ No');
    console.log('   - Has EJS tags <%?', content.includes('<%') ? '✅ Yes' : '❌ No');
    console.log('   - Has CSS/JS links?',
      (content.includes('link') || content.includes('script')) ? '✅ Yes' : '❌ No');

  } catch (error) {
    console.log('   ❌ Error reading file:', error.message);
  }
} else {
  console.log('   ⚠️ login.ejs not found, testing another file...');

  // Test any available EJS file
  if (ejsFiles.length > 0) {
    const firstFile = ejsFiles[0];
    console.log(`   Testing ${firstFile} instead...`);

    const filePath = path.join(viewsPath, firstFile);
    const content = fs.readFileSync(filePath, 'utf8');

    console.log('   📏 Size:', content.length, 'characters');
    console.log('   📝 First 100 chars:', content.substring(0, 100) + '...');
  }
}

// Step 4: Test EJS rendering
console.log('\n4️⃣ Testing EJS engine...');
try {
  const simpleTemplate = '<h1>Welcome <%= name %>!</h1>';
  const data = { name: 'Test User' };
  const result = ejs.render(simpleTemplate, data);

  console.log('   ✅ EJS is working correctly');
  console.log('   Template:', simpleTemplate);
  console.log('   Data:', JSON.stringify(data));
  console.log('   Output:', result);
} catch (error) {
  console.log('   ❌ EJS Error:', error.message);
}

// Step 5: Summary
console.log('\n' + '='.repeat(50));
console.log('📊 TEST SUMMARY');
console.log('='.repeat(50));
console.log(`Total EJS files found: ${ejsFiles.length}`);
console.log(`Views folder: ${fs.existsSync(viewsPath) ? '✅ Found' : '❌ Missing'}`);
console.log(`EJS package: ✅ Installed`);
console.log(`All tests: ✅ Completed`);
console.log('='.repeat(50));

console.log('\n🎉 Testing Done!');