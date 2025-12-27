// test-contact.js
const fs = require('fs');
const path = require('path');

console.log('📞 Testing contact.ejs\n');
console.log('='.repeat(50));

const filePath = path.join(__dirname, 'views', 'contact.ejs');
const content = fs.readFileSync(filePath, 'utf8');

console.log('📊 BASIC INFO:');
console.log(`File size: ${content.length} characters`);

console.log('\n📋 CONTACT FORM CHECK:');
const contactChecks = [
  { term: 'full name', desc: 'Full name field' },
  { term: 'email', desc: 'Email field' },
  { term: 'subject', desc: 'Subject field' },
  { term: 'message', desc: 'Message textarea' },
  { term: 'submit', desc: 'Submit button' },
  { term: 'phone', desc: 'Phone field' },
  { term: 'company', desc: 'Company field' },
  { term: 'inquiry', desc: 'Inquiry type' }
];

contactChecks.forEach(({ term, desc }) => {
  const found = content.toLowerCase().includes(term.toLowerCase());
  console.log(`  ${found ? '✅' : '❌'} ${desc}`);
});

console.log('\n📍 CONTACT INFO CHECK:');
const infoChecks = [
  { term: 'location', desc: 'Location/Address' },
  { term: 'map', desc: 'Map integration' },
  { term: 'call', desc: 'Call information' },
  { term: 'whatsapp', desc: 'WhatsApp link' },
  { term: 'social', desc: 'Social media links' },
  { term: 'hour', desc: 'Business hours' },
  { term: 'fax', desc: 'Fax number' }
];

infoChecks.forEach(({ term, desc }) => {
  const found = content.toLowerCase().includes(term.toLowerCase());
  console.log(`  ${found ? '✅' : '❌'} ${desc}`);
});

console.log('\n📧 EMAIL/PHONE DETECTION:');
const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
const phonePattern = /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/;

const emails = content.match(emailPattern);
const phones = content.match(phonePattern);

console.log(`  Email addresses: ${emails ? emails.length : 0} found`);
console.log(`  Phone numbers: ${phones ? phones.length : 0} found`);

if (emails) {
  console.log('  Sample emails:', emails.slice(0, 2).join(', '));
}

console.log('\n' + '='.repeat(50));
console.log('✅ contact.ejs test completed!');