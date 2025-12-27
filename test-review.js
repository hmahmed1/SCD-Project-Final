// test-review.js
const fs = require('fs');
const path = require('path');

console.log('⭐ Testing review.ejs\n');
console.log('='.repeat(50));

const filePath = path.join(__dirname, 'views', 'review.ejs');
const content = fs.readFileSync(filePath, 'utf8');

console.log('📊 BASIC INFO:');
console.log(`File size: ${content.length} characters`);

console.log('\n⭐ REVIEW FEATURES CHECK:');
const reviewChecks = [
  { term: 'rating', desc: 'Star rating system' },
  { term: 'comment', desc: 'Comment/Review text' },
  { term: 'submit', desc: 'Submit review button' },
  { term: 'star', desc: 'Star icons' },
  { term: 'testimonial', desc: 'Testimonials display' },
  { term: 'average', desc: 'Average rating' },
  { term: 'customer', desc: 'Customer info' },
  { term: 'date', desc: 'Review date' },
  { term: 'helpful', desc: 'Helpful votes' },
  { term: 'sort', desc: 'Sort options' }
];

reviewChecks.forEach(({ term, desc }) => {
  const found = content.toLowerCase().includes(term.toLowerCase());
  console.log(`  ${found ? '✅' : '❌'} ${desc}`);
});

console.log('\n📝 FORM ELEMENTS:');
const formElements = [
  { term: '<textarea', desc: 'Review text area' },
  { term: 'type="radio"', desc: 'Star selection' },
  { term: 'type="range"', desc: 'Rating slider' },
  { term: 'placeholder=', desc: 'Placeholder text' },
  { term: 'maxlength=', desc: 'Character limit' },
  { term: 'name="rating"', desc: 'Rating input' }
];

formElements.forEach(({ term, desc }) => {
  const found = content.includes(term);
  console.log(`  ${found ? '✅' : '❌'} ${desc}`);
});

console.log('\n🌟 STAR RATING ANALYSIS:');
// Check for star rating implementations
const hasUnicodeStars = content.includes('★') || content.includes('⭐');
const hasFontAwesome = content.includes('fa-star') || content.includes('fas fa-star');
const hasSVGStars = content.includes('<svg') && content.includes('star');
const hasRadioStars = content.includes('type="radio"') && content.includes('rating');

console.log(`  Unicode stars: ${hasUnicodeStars ? '✅' : '❌'}`);
console.log(`  Font Awesome: ${hasFontAwesome ? '✅' : '❌'}`);
console.log(`  SVG stars: ${hasSVGStars ? '✅' : '❌'}`);
console.log(`  Radio buttons: ${hasRadioStars ? '✅' : '❌'}`);

console.log('\n📊 REVIEW DISPLAY:');
const hasCards = content.includes('card') || content.includes('review-item');
const hasGrid = content.includes('grid') || content.includes('row') && content.includes('col');
const hasPagination = content.includes('pagination') || content.includes('page-');

console.log(`  Card layout: ${hasCards ? '✅' : '❌'}`);
console.log(`  Grid layout: ${hasGrid ? '✅' : '❌'}`);
console.log(`  Pagination: ${hasPagination ? '✅' : '❌'}`);

console.log('\n💡 SUGGESTIONS:');
if (!hasUnicodeStars && !hasFontAwesome && !hasSVGStars) {
  console.log('  💡 Add star rating visuals');
}
if (!content.includes('<textarea')) {
  console.log('  💡 Add textarea for detailed reviews');
}

console.log('\n' + '='.repeat(50));
console.log('✅ review.ejs test completed!');