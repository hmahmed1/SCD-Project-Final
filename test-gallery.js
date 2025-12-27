// test-gallery.js
const fs = require('fs');
const path = require('path');

console.log('🖼️  Testing gallery.ejs\n');
console.log('='.repeat(50));

const filePath = path.join(__dirname, 'views', 'gallery.ejs');
const content = fs.readFileSync(filePath, 'utf8');

console.log('📊 BASIC INFO:');
console.log(`File size: ${content.length} characters`);

console.log('\n🖼️  GALLERY FEATURES CHECK:');
const galleryChecks = [
  { term: 'img', desc: 'Images' },
  { term: 'thumbnail', desc: 'Thumbnails' },
  { term: 'lightbox', desc: 'Lightbox effect' },
  { term: 'modal', desc: 'Modal popup' },
  { term: 'carousel', desc: 'Carousel/slider' },
  { term: 'category', desc: 'Categories/filter' },
  { term: 'caption', desc: 'Image captions' },
  { term: 'zoom', desc: 'Zoom feature' },
  { term: 'grid', desc: 'Grid layout' },
  { term: 'slide', desc: 'Slideshow' }
];

galleryChecks.forEach(({ term, desc }) => {
  const found = content.toLowerCase().includes(term.toLowerCase());
  console.log(`  ${found ? '✅' : '❌'} ${desc}`);
});

console.log('\n📸 IMAGE ANALYSIS:');
const imgTags = (content.match(/<img/g) || []).length;
const srcAttributes = (content.match(/src=/g) || []).length;
const altAttributes = (content.match(/alt=/g) || []).length;

console.log(`  Image tags: ${imgTags}`);
console.log(`  SRC attributes: ${srcAttributes}`);
console.log(`  ALT text: ${altAttributes}`);
console.log(`  Images with ALT: ${imgTags === altAttributes ? '✅ All' : `⚠️ ${altAttributes}/${imgTags}`}`);

console.log('\n🎨 LAYOUT CHECK:');
const hasGrid = content.includes('grid') || content.includes('row') && content.includes('col');
const hasFlex = content.includes('flex');
const hasColumns = content.includes('column') || content.includes('col-');

console.log(`  Grid layout: ${hasGrid ? '✅' : '❌'}`);
console.log(`  Flexbox: ${hasFlex ? '✅' : '❌'}`);
console.log(`  Columns: ${hasColumns ? '✅' : '❌'}`);

console.log('\n💡 SUGGESTIONS:');
if (imgTags === 0) console.log('  ⚠️  No images found in gallery!');
if (altAttributes < imgTags) console.log('  💡 Add ALT text to all images for accessibility');
if (imgTags > 20) console.log('  💡 Consider pagination for large galleries');

console.log('\n' + '='.repeat(50));
console.log('✅ gallery.ejs test completed!');