import fs from 'fs';
import path from 'path';

// Folders to clean
const foldersToClean = [
  path.resolve('reports/html-report'), // HTML reports
  path.resolve('test-results') // Playwright test results folder
];

// Function to delete folder contents
function deleteFolderContents(folder) {
  if (!fs.existsSync(folder)) return;

  fs.readdirSync(folder).forEach(file => {
    const curPath = path.join(folder, file);
    if (fs.lstatSync(curPath).isDirectory()) {
      deleteFolderContents(curPath);  // Recursively delete subfolders
      fs.rmdirSync(curPath);
    } else {
      fs.unlinkSync(curPath);
    }
  });
}

foldersToClean.forEach(folder => {
  deleteFolderContents(folder);
  console.log(`Cleaned folder: ${folder}`);
});