// Build script to inject API URL from environment variable into config.js
const fs = require('fs');
const path = require('path');

const API_BASE_URL = process.env.VITE_API_BASE_URL || '';
const configPath = path.join(__dirname, 'js', 'config.js');
const configContent = `// API Configuration
// This is auto-generated during build from VITE_API_BASE_URL environment variable
window.API_BASE_URL = '${API_BASE_URL}';
`;

fs.writeFileSync(configPath, configContent, 'utf8');
console.log(`✅ Config generated: API_BASE_URL = ${API_BASE_URL || '(empty - using relative paths)'}`);

