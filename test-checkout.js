// test-checkout.js
const fs = require('fs');
const path = require('path');

console.log('💰 Testing checkout.ejs\n');
console.log('='.repeat(50));

const filePath = path.join(__dirname, 'views', 'checkout.ejs');
const content = fs.readFileSync(filePath, 'utf8');

console.log('📊 BASIC INFO:');
console.log(`File size: ${content.length} characters`);

console.log('\n💳 CHECKOUT FORM CHECK:');
const formChecks = [
  { term: 'name', desc: 'Name field' },
  { term: 'address', desc: 'Address field' },
  { term: 'city', desc: 'City field' },
  { term: 'zip', desc: 'ZIP code' },
  { term: 'phone', desc: 'Phone number' },
  { term: 'email', desc: 'Email field' },
  { term: 'card', desc: 'Card details' },
  { term: 'expir', desc: 'Expiry date' },
  { term: 'cvv', desc: 'CVV field' },
  { term: 'place order', desc: 'Place order button' }
];

formChecks.forEach(({ term, desc }) => {
  const found = content.toLowerCase().includes(term.toLowerCase());
  console.log(`  ${found ? '✅' : '❌'} ${desc}`);
});

console.log('\n🔒 SECURITY CHECK:');
const hasHttps = content.includes('https://');
const hasSecure = content.includes('secure') || content.includes('security');
const hasValidation = content.includes('required') || content.includes('pattern=') ||
  content.includes('validation');
const hasHidden = content.includes('type="hidden"');

console.log(`  HTTPS links: ${hasHttps ? '✅' : '⚠️'}`);
console.log(`  Security mentions: ${hasSecure ? '✅' : '⚠️'}`);
console.log(`  Form validation: ${hasValidation ? '✅' : '⚠️'}`);
console.log(`  Hidden fields: ${hasHidden ? '✅' : '❌'}`);

console.log('\n📦 ORDER SUMMARY CHECK:');
const hasItems = /item|product|description/i.test(content);
const hasPrices = /\$\d+|₹\d+|total|subtotal/i.test(content);
const hasSummary = /summary|overview|details/i.test(content);

console.log(`  Items list: ${hasItems ? '✅' : '❌'}`);
console.log(`  Price display: ${hasPrices ? '✅' : '❌'}`);
console.log(`  Order summary: ${hasSummary ? '✅' : '❌'}`);

console.log('\n' + '='.repeat(50));
console.log('✅ checkout.ejs test completed!');