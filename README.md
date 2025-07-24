# PNG to WebP Converter with Cloudflare R2 Upload

A project for batch conversion of PNG files to WebP format and automatic upload to Cloudflare R2 storage.

## 🚀 Features

- **Batch conversion** of PNG files to WebP with optimization
- **Automatic upload** to Cloudflare R2
- **Detailed logging** of conversion and upload process
- **Error handling** with detailed information
- **Configurable WebP quality** (default 80%)
- **TypeScript** for type safety

## 📋 Requirements

- Node.js 16+ 
- npm or yarn
- Cloudflare R2 account
- Wrangler CLI (installed automatically)

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd png-to-webp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```

4. **Edit the `.env` file:**
   ```env
   # Cloudflare R2 Configuration
   R2_BUCKET=your-bucket-name
   PNG_FOLDER_NAME=your-png-folder-name
   ```

## ⚙️ Cloudflare R2 Setup

1. **Create an R2 bucket** in Cloudflare Dashboard
2. **Configure Wrangler** (if not already configured):
   ```bash
   npx wrangler login
   ```

## 📁 Project Structure

```
png-to-webp/
├── png-to-webp.ts      # PNG → WebP conversion script
├── upload-to-r2.ts     # R2 upload script
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── env.example         # Environment variables example
├── .env                # Your settings (create this)
└── png-files/          # PNG files folder (example)
    ├── webp/           # Converted WebP files folder
    └── *.png           # Source PNG files
```

## 🚀 Usage

### Full process (conversion + upload)
```bash
npm start
```

### Convert PNG to WebP only
```bash
npm run convert
```

### Upload to R2 only
```bash
npm run upload
```

### Build TypeScript
```bash
npm run build
```

## 📊 Results

After execution, you will get:

1. **Converted WebP files** in folder `{PNG_FOLDER_NAME}/webp/`
2. **Files uploaded to R2** at path `{bucket-name}/{filename}.webp`
3. **Detailed report** on number of processed files and errors

## ⚙️ Configuration

### WebP Quality
In `png-to-webp.ts` file you can change quality:
```typescript
.webp({ 
  quality: 80, // Quality (0-100)
  effort: 6    // Compression level (0-6)
})
```

### Environment Variables
- `PNG_FOLDER_NAME` - name of folder with PNG files
- `R2_BUCKET` - name of your R2 bucket

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Full process: conversion + upload |
| `npm run convert` | Convert PNG → WebP only |
| `npm run upload` | Upload WebP to R2 only |
| `npm run build` | Build TypeScript |
| `npm run dev` | Run ts-node |

## 📝 Logging

Scripts output detailed information:
- Number of found files
- Conversion/upload progress
- Successful operations (✓)
- Errors (✗)
- Final statistics

## 🐛 Troubleshooting

### Wrangler not found
```bash
npm install -g wrangler
# or
npm install wrangler --save-dev
```

### Conversion errors
- Check that PNG files are not corrupted
- Ensure the process has read/write permissions

### R2 upload errors
- Check Wrangler settings (`wrangler login`)
- Make sure the bucket exists and is accessible
- Verify `R2_BUCKET` variable in `.env`

## 📄 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

If you have questions or issues, create an issue in the repository.

---

**🇷🇺 [Russian README](README.ru.md)** 