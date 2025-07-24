import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const inputDir = process.env.PNG_FOLDER_NAME || '';
const outputDir = `${process.env.PNG_FOLDER_NAME}/webp`;

async function convertPngToWebp() {
  try {
    if(!fs.existsSync(inputDir)) {
      console.error(`PNG_FOLDER_NAME is not set or folder not found`);
      return;
    }

    // Create folder for WebP files if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`Created folder: ${outputDir}`);
    }

    // Read all files from the folder
    const files = fs.readdirSync(inputDir);
    const pngFiles = files.filter(file => 
      file.toLowerCase().endsWith('.png') && 
      fs.statSync(path.join(inputDir, file)).isFile()
    );

    console.log(`Found ${pngFiles.length} PNG files for conversion`);

    if (pngFiles.length === 0) {
      console.log('PNG files not found in the folder');
      return;
    }

    let convertedCount = 0;
    let errorCount = 0;

    // Convert each PNG file to WebP
    for (const pngFile of pngFiles) {
      try {
        const inputPath = path.join(inputDir, pngFile);
        const outputFileName = pngFile.replace(/\.png$/i, '.webp');
        const outputPath = path.join(outputDir, outputFileName);

        console.log(`Converting: ${pngFile} -> ${outputFileName}`);

        await sharp(inputPath)
          .webp({ 
            quality: 80, // WebP quality (0-100)
            effort: 6    // Compression level (0-6)
          })
          .toFile(outputPath);

        convertedCount++;
        console.log(`✓ Successfully converted: ${pngFile}`);
      } catch (error) {
        errorCount++;
        console.error(`✗ Error during conversion ${pngFile}:`, error);
      }
    }

    console.log('\n=== RESULT OF CONVERSION ===');
    console.log(`Total files: ${pngFiles.length}`);
    console.log(`Successfully converted: ${convertedCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`WebP files saved in: ${outputDir}`);

  } catch (error) {
    console.error('Error during script execution:', error);
  }
}

function checkEnv() {
  if(!process.env.PNG_FOLDER_NAME) {
    console.error('PNG_FOLDER_NAME is not set');
    return false;
  }
  return true;
}

// Run the conversion
if(checkEnv()) {
  convertPngToWebp();
}
