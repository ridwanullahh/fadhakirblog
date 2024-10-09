
const teable = require('./lib/teable');

async function testXataConnection() {
  try {
    const records = await teable.getRecords();
    console.log('Records fetched successfully:', records);
  } catch (err) {
    console.error('Error fetching records:', err);
  }
}

testXataConnection();
