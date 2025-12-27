// test-project-homepage.js
const fs = require('fs');
const path = require('path');

console.log('🏠 Testing project_homepage.ejs\n');
console.log('='.repeat(60));

const filePath = path.join(__dirname, 'views', 'project_homepage.ejs');
const content = fs.readFileSync(filePath, 'utf8');

console.log('📊 BASIC INFO:');
console.log(`File size: ${content.length} characters (${Math.round(content.length / 1024)} KB)`);
console.log(`Lines: ${content.split('\n').length}`);

console.log('\n🏗️  STRUCTURE CHECK:');
const structureChecks = [
  { term: '<!DOCTYPE', desc: 'DOCTYPE declaration' },
  { term: '<html', desc: 'HTML tag' },
  { term: '<head', desc: 'Head section' },
  { term: '<body', desc: 'Body section' },
  { term: '<header', desc: 'Header section' },
  { term: '<nav', desc: 'Navigation' },
  { term: '<main', desc: 'Main content' },
  { term: '<footer', desc: 'Footer section' },
  { term: '<script', desc: 'JavaScript files' },
  { term: '<link', desc: 'CSS files' }
];

structureChecks.forEach(({ term, desc }) => {
  const found = content.includes(term);
  console.log(`  ${found ? '✅' : '❌'} ${desc}`);
});

console.log('\n🎯 CONTENT SECTIONS:');
const sectionChecks = [
  { term: 'hero', desc: 'Hero/Banner section' },
  { term: 'feature', desc: 'Features section' },
  { term: 'service', desc: 'Services offered' },
  { term: 'testimonial', desc: 'Testimonials' },
  { term: 'about', desc: 'About summary' },
  { term: 'contact', desc: 'Contact section' },
  { term: 'portfolio', desc: 'Portfolio/work' },
  { term: 'team', desc: 'Team members' },
  { term: 'call to action', desc: 'Call to Action' },
  { term: 'news', desc: 'News/Updates' }
];

sectionChecks.forEach(({ term, desc }) => {
  const found = content.toLowerCase().includes(term.toLowerCase());
  console.log(`  ${found ? '✅' : '❌'} ${desc}`);
});

console.log('\n🔗 NAVIGATION ANALYSIS:');
const navLinks = (content.match(/<a href/g) || []).length;
const internalLinks = (content.match(/href="[^http#]/g) || []).length;
const externalLinks = (content.match(/href="http/g) || []).length;

console.log(`  Total links: ${navLinks}`);
console.log(`  Internal links: ${internalLinks}`);
console.log(`  External links: ${externalLinks}`);

console.log('\n📱 RESPONSIVENESS INDICATORS:');
const responsiveIndicators = [
  'viewport',
  'responsive',
  'mobile',
  'media query',
  '@media',
  'max-width',
  'bootstrap',
  'tailwind'
];

let responsiveCount = 0;
responsiveIndicators.forEach(indicator => {
  if (content.toLowerCase().includes(indicator.toLowerCase())) {
    responsiveCount++;
  }
});

console.log(`  Responsive features: ${responsiveCount}/8 detected`);
console.log(`  Viewport meta: ${content.includes('viewport') ? '✅' : '❌'}`);

console.log('\n📊 PERFORMANCE INDICATORS:');
const scriptCount = (content.match(/<script/g) || []).length;
const styleCount = (content.match(/<style/g) || []).length;
const linkCount = (content.match(/<link/g) || []).length;
const imgCount = (content.match(/<img/g) || []).length;

console.log(`  Scripts: ${scriptCount}`);
console.log(`  Style tags: ${styleCount}`);
console.log(`  CSS links: ${linkCount}`);
console.log(`  Images: ${imgCount}`);

console.log('\n💡 HOMEPAGE SCORE:');
let score = 0;
if (content.includes('<!DOCTYPE')) score += 10;
if (content.includes('viewport')) score += 10;
if (navLinks >= 5) score += 10;
if (imgCount > 0) score += 10;
if (content.length > 2000) score += 10;
if (responsiveCount >= 3) score += 10;

console.log(`  ${score}/60 - ${score >= 40 ? '✅ Good' : score >= 20 ? '⚠️ Average' : '❌ Needs improvement'}`);

console.log('\n' + '='.repeat(60));
console.log('✅ project_homepage.ejs test completed!');