import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const execAsync = promisify(exec);

// Folder with WebP files
const webpDir = `${process.env.PNG_FOLDER_NAME}/webp`;
const bucketName = process.env.R2_BUCKET || '';

async function uploadToR2WithWrangler() {
  try {
    // Check if the folder with WebP files exists
    if (!fs.existsSync(webpDir)) {
      console.error(`Folder ${webpDir} not found. Run the conversion first.`);
      return;
    }

    // Check if Wrangler is installed
    try {
      await execAsync('wrangler --version');
      console.log('✓ Wrangler CLI found');
    } catch (error) {
      console.error('✗ Wrangler CLI not found. Install it:');
      console.error('npm install -g wrangler');
      console.error('or');
      console.error('npm install wrangler --save-dev');
      return;
    }

    // Read all WebP files
    const files = fs.readdirSync(webpDir);
    const webpFiles = files.filter(file => 
      file.toLowerCase().endsWith('.webp') && 
      fs.statSync(path.join(webpDir, file)).isFile()
    );

    console.log(`Found ${webpFiles.length} WebP files for upload to R2`);

    if (webpFiles.length === 0) {
      console.log('WebP files not found');
      return;
    }

    let uploadedCount = 0;
    let errorCount = 0;

    // Upload each file to R2 using Wrangler
    for (const webpFile of webpFiles) {
      try {
        const filePath = path.join(webpDir, webpFile);
        
        console.log(`Uploading: ${webpFile}`);

        // Wrangler command to upload the file
        const command = `wrangler r2 object put ${bucketName}/${webpFile} --file=${filePath} --remote`;
        
        const { stdout, stderr } = await execAsync(command);
        
        if (stderr) {
          console.warn(`Warning for ${webpFile}:`, stderr);
        }
        
        uploadedCount++;
        console.log(`✓ Successfully uploaded: ${webpFile}`);
        console.log(`  R2 path: ${webpFile}`);
      } catch (error) {
        errorCount++;
        console.error(`✗ Error during upload ${webpFile}:`, error);
      }
    }

    console.log('\n=== RESULT OF UPLOAD TO R2 (Wrangler) ===');
    console.log(`Total files: ${webpFiles.length}`);
    console.log(`Successfully uploaded: ${uploadedCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Files available in R2 at path: webp-images/`);

  } catch (error) {
    console.error('Error during script execution:', error);
  }
}

function checkEnv() {
  if(!process.env.PNG_FOLDER_NAME) {
    console.error('PNG_FOLDER_NAME is not set');
    return false;
  }
  if(!process.env.R2_BUCKET) {
    console.error('R2_BUCKET is not set');
    return false;
  }
  return true;
}

if(checkEnv()) {
  uploadToR2WithWrangler();
}