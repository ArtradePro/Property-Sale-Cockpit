// Node.js script to backup data files
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const BACKUP_DIR = path.join(__dirname, '..', 'backups', new Date().toISOString().replace(/[:.]/g, '-'));

fs.mkdirSync(BACKUP_DIR, { recursive: true });

fs.readdirSync(DATA_DIR).forEach(file => {
  const src = path.join(DATA_DIR, file);
  const dest = path.join(BACKUP_DIR, file);
  fs.copyFileSync(src, dest);
});

console.log('Backup complete:', BACKUP_DIR);
