// test-about.js
const fs = require('fs');
const path = require('path');

console.log('📄 Testing about.ejs\n');
console.log('='.repeat(50));

const filePath = path.join(__dirname, 'views', 'about.ejs');
const content = fs.readFileSync(filePath, 'utf8');

console.log('📊 BASIC INFO:');
console.log(`File size: ${content.length} characters`);
console.log(`Lines: ${content.split('\n').length}`);

console.log('\n🔍 CONTENT CHECK:');
const checks = [
  { term: '<h1', desc: 'Main heading' },
  { term: '<h2', desc: 'Sub headings' },
  { term: '<p>', desc: 'Paragraphs' },
  { term: 'about', desc: 'About content' },
  { term: 'team', desc: 'Team section' },
  { term: 'mission', desc: 'Mission statement' },
  { term: 'img', desc: 'Images' },
  { term: 'contact', desc: 'Contact info' },
  { term: 'history', desc: 'History section' },
  { term: 'value', desc: 'Values section' }
];

checks.forEach(({ term, desc }) => {
  const found = content.toLowerCase().includes(term.toLowerCase());
  console.log(`  ${found ? '✅' : '❌'} ${desc}`);
});

console.log('\n📝 STRUCTURE ANALYSIS:');
const divCount = (content.match(/<div/g) || []).length;
const sectionCount = (content.match(/<section/g) || []).length;
const imgCount = (content.match(/<img/g) || []).length;
const linkCount = (content.match(/<a href/g) || []).length;

console.log(`  Divs: ${divCount}`);
console.log(`  Sections: ${sectionCount}`);
console.log(`  Images: ${imgCount}`);
console.log(`  Links: ${linkCount}`);

console.log('\n💡 SUGGESTIONS:');
if (content.length < 500) console.log('  ⚠️  Content might be too short for about page');
if (imgCount === 0) console.log('  💡 Add images to make page more engaging');
if (linkCount === 0) console.log('  💡 Add links to other pages');

console.log('\n' + '='.repeat(50));
console.log('✅ about.ejs test completed!');