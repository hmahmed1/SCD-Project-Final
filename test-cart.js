// test-cart.js
const fs = require('fs');
const path = require('path');

console.log('🛒 Testing cart.ejs\n');
console.log('='.repeat(50));

const filePath = path.join(__dirname, 'views', 'cart.ejs');
const content = fs.readFileSync(filePath, 'utf8');

console.log('📊 BASIC INFO:');
console.log(`File size: ${content.length} characters`);

console.log('\n🛍️  CART FEATURES CHECK:');
const cartChecks = [
  { term: 'table', desc: 'Cart table' },
  { term: 'item', desc: 'Item listing' },
  { term: 'price', desc: 'Price display' },
  { term: 'quantity', desc: 'Quantity input' },
  { term: 'total', desc: 'Total calculation' },
  { term: 'checkout', desc: 'Checkout button' },
  { term: 'remove', desc: 'Remove item option' },
  { term: 'empty', desc: 'Empty cart message' },
  { term: 'continue', desc: 'Continue shopping' },
  { term: 'update', desc: 'Update cart button' }
];

cartChecks.forEach(({ term, desc }) => {
  const found = content.toLowerCase().includes(term.toLowerCase());
  console.log(`  ${found ? '✅' : '❌'} ${desc}`);
});

console.log('\n💰 PRICE/QUANTITY CHECK:');
const hasPrice = /\$\d+/i.test(content) || /₹\d+/i.test(content) || /price:\s*\d+/i.test(content);
const hasQuantity = /quantity/i.test(content) || /qty/i.test(content) || /amount/i.test(content);
const hasTotal = /total/i.test(content) || /subtotal/i.test(content) || /grand total/i.test(content);

console.log(`  Price display: ${hasPrice ? '✅' : '❌'}`);
console.log(`  Quantity field: ${hasQuantity ? '✅' : '❌'}`);
console.log(`  Total calculation: ${hasTotal ? '✅' : '❌'}`);

console.log('\n📱 RESPONSIVENESS CHECK:');
const hasTable = content.includes('<table');
const hasDivs = content.includes('<div');
const hasResponsive = content.includes('responsive') || content.includes('col-') ||
  content.includes('table-responsive') || content.includes('mobile');

console.log(`  Table structure: ${hasTable ? '✅' : '❌'}`);
console.log(`  Div containers: ${hasDivs ? '✅' : '❌'}`);
console.log(`  Mobile friendly: ${hasResponsive ? '✅' : '⚠️ Not detected'}`);

console.log('\n' + '='.repeat(50));
console.log('✅ cart.ejs test completed!');