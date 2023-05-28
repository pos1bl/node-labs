import { readFile, writeFile, mkdir } from 'node:fs/promises';
import * as path from 'node:path';
import * as readline from 'node:readline';
import fetch from 'node-fetch';

async function fetchHTMLContent(url) {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    console.error(`Error fetching HTML content from ${url}:`, error);
    return '';
  }
}

async function createHTMLFiles(jsonFilePath) {
  try {
    const jsonData = JSON.parse(await readFile(jsonFilePath, 'utf8'));
    const jsonFilename = path.basename(jsonFilePath, '.json');
    const outputFolder = `${jsonFilename}_pages`;

    // Create the output folder if it doesn't exist
    try {
      await mkdir(outputFolder);
      console.log(`Output folder '${outputFolder}' created.`);
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
      console.log(`Output folder '${outputFolder}' already exists.`);
    }

    // Fetch HTML content and save it to individual files
    for (const url of jsonData) {
      const htmlContent = await fetchHTMLContent(url);
      const filename = url.replace(/[^a-zA-Z0-9]/g, '_') + '.html';
      const filePath = path.join(outputFolder, filename);
      await writeFile(filePath, htmlContent, 'utf8');
      console.log(`HTML content saved for ${url}`);
    }

    console.log('Process completed successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the path to the JSON file: ', async (jsonFilePath) => {
  rl.close();

  if (jsonFilePath) {
    await createHTMLFiles(jsonFilePath);
  } else {
    console.error('No JSON file path entered.');
  }
});
