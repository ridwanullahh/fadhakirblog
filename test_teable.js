
const teable = require('./lib/teable');

async function testTeableConnection() {
  try {
    const records = await teable.getRecords('tblwt4j33C0EwVySweN');
    console.log('Records fetched successfully:', records);
  } catch (err) {
    console.error('Error fetching records:', err);
  }
}

testTeableConnection();
