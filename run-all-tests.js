// run-all-tests.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Running ALL EJS Tests\n');
console.log('='.repeat(60));

const testFiles = [
  'test-about.js',
  'test-cart.js',
  'test-checkout.js',
  'test-contact.js',
  'test-gallery.js',
  'test-menu.js',
  'test-project-homepage.js',
  'test-review.js',
  'check-login.js'  // aapka existing file
];

let passed = 0;
let failed = 0;

testFiles.forEach(testFile => {
  console.log(`\n📋 Running: ${testFile}`);
  console.log('-'.repeat(40));

  try {
    if (fs.existsSync(testFile)) {
      const output = execSync(`node ${testFile}`, { encoding: 'utf8' });
      console.log(output);
      console.log(`✅ ${testFile} - PASSED\n`);
      passed++;
    } else {
      console.log(`❌ ${testFile} not found!`);
      failed++;
    }
  } catch (error) {
    console.log(`❌ ${testFile} - FAILED`);
    console.log(`Error: ${error.message}`);
    failed++;
  }
});

console.log('='.repeat(60));
console.log('📊 FINAL RESULTS:');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
console.log('='.repeat(60));
console.log('🎉 All tests completed!');