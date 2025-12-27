// test-menu.js
const fs = require('fs');
const path = require('path');

console.log('🍽️  Testing menu.ejs\n');
console.log('='.repeat(50));

const filePath = path.join(__dirname, 'views', 'menu.ejs');
const content = fs.readFileSync(filePath, 'utf8');

console.log('📊 BASIC INFO:');
console.log(`File size: ${content.length} characters`);

console.log('\n🍕 MENU ITEMS CHECK:');
const menuChecks = [
  { term: 'appetizer', desc: 'Appetizers' },
  { term: 'main course', desc: 'Main courses' },
  { term: 'dessert', desc: 'Desserts' },
  { term: 'drink', desc: 'Drinks' },
  { term: 'price', desc: 'Prices listed' },
  { term: 'description', desc: 'Item descriptions' },
  { term: 'category', desc: 'Categories' },
  { term: 'vegetarian', desc: 'Vegetarian options' },
  { term: 'spicy', desc: 'Spicy indicator' },
  { term: 'recommended', desc: 'Recommended items' }
];

menuChecks.forEach(({ term, desc }) => {
  const found = content.toLowerCase().includes(term.toLowerCase());
  console.log(`  ${found ? '✅' : '❌'} ${desc}`);
});

console.log('\n💰 PRICE ANALYSIS:');
const pricePattern = /\$\d+(\.\d{2})?|₹\d+|Rs\.?\s*\d+|price:\s*\d+/gi;
const prices = content.match(pricePattern);
const uniquePrices = prices ? [...new Set(prices)] : [];

console.log(`  Total prices found: ${prices ? prices.length : 0}`);
console.log(`  Unique price points: ${uniquePrices.length}`);
if (uniquePrices.length > 0) {
  console.log(`  Price range: ${uniquePrices.slice(0, 3).join(', ')}${uniquePrices.length > 3 ? '...' : ''}`);
}

console.log('\n📱 MENU LAYOUT:');
const hasCards = content.includes('card') || content.includes('panel');
const hasTable = content.includes('<table');
const hasList = content.includes('<ul>') || content.includes('<ol>');
const hasImages = content.includes('<img');

console.log(`  Card layout: ${hasCards ? '✅' : '❌'}`);
console.log(`  Table format: ${hasTable ? '✅' : '❌'}`);
console.log(`  List format: ${hasList ? '✅' : '❌'}`);
console.log(`  Item images: ${hasImages ? '✅' : '❌'}`);

console.log('\n📝 SAMPLE ITEMS:');
// Find menu items (lines with prices or descriptions)
const lines = content.split('\n');
const itemLines = lines.filter(line =>
(/\$\d+|\₹\d+|Rs\./.test(line) ||
  line.toLowerCase().includes('description:') ||
  line.match(/^[A-Z][a-z]+:/))
).slice(0, 5);

if (itemLines.length > 0) {
  console.log('  Found items like:');
  itemLines.forEach((line, i) => {
    console.log(`    ${i + 1}. ${line.trim().substring(0, 60)}...`);
  });
}

console.log('\n' + '='.repeat(50));
console.log('✅ menu.ejs test completed!');