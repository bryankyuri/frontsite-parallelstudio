# R2 Large File Upload Guide

## Problem: Files > 300MB cannot be uploaded via R2 Dashboard

## Solutions:

### 1. Wrangler CLI (Recommended)

#### Setup:
```bash
# Already installed: wrangler 4.26.0

# Login to Cloudflare
wrangler login

# List your R2 buckets
wrangler r2 bucket list
```

#### Upload large files:
```bash
# Upload single file
wrangler r2 object put bryan-test-bucket/your-large-video.mp4 --file path/to/your-large-video.mp4

# Upload with custom content-type
wrangler r2 object put bryan-test-bucket/your-large-video.mp4 --file path/to/your-large-video.mp4 --content-type video/mp4

# Upload entire directory
wrangler r2 object put bryan-test-bucket/videos/ --file path/to/video/folder/ --recursive
```

### 2. AWS CLI with R2 Compatibility

#### Setup:
```bash
# Install AWS CLI
# Download from: https://aws.amazon.com/cli/

# Configure with R2 credentials
aws configure set aws_access_key_id YOUR_R2_ACCESS_KEY
aws configure set aws_secret_access_key YOUR_R2_SECRET_KEY
aws configure set region auto
```

#### Upload:
```bash
# Upload large file
aws s3 cp your-large-video.mp4 s3://bryan-test-bucket/ --endpoint-url https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com

# Upload with multipart (for very large files)
aws s3 cp your-large-video.mp4 s3://bryan-test-bucket/ --endpoint-url https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com --cli-write-timeout 0 --cli-read-timeout 0
```

### 3. Video Compression (Alternative Solution)

If you want to keep using the dashboard, compress your videos:

#### Using FFmpeg:
```bash
# Install FFmpeg first
# Download from: https://ffmpeg.org/

# Compress video (reduce file size)
ffmpeg -i input-large-video.mp4 -vcodec h264 -acodec mp2 -b:v 5000k -b:a 128k output-compressed.mp4

# More aggressive compression
ffmpeg -i input-large-video.mp4 -vcodec h264 -crf 28 -preset medium output-smaller.mp4

# Convert to web-optimized format
ffmpeg -i input-large-video.mp4 -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k -movflags +faststart output-web.mp4
```

### 4. Multipart Upload (Advanced)

For very large files (GB+), use multipart uploads:

```bash
# Split large file and upload parts
wrangler r2 object put bryan-test-bucket/large-video.mp4 --file large-video.mp4 --multipart-threshold 100MB
```

## Best Practices:

1. **File Naming**: Avoid spaces in filenames
2. **Content-Type**: Always specify video/mp4 for video files
3. **Compression**: Optimize videos for web before upload
4. **Batch Upload**: Upload multiple files at once when possible

## Current Video URLs:
- Working: https://videos.virtual-app.my.id/P24008_Aldo%20-%20Pillow%20Walk.mp4
- Working: https://videos.virtual-app.my.id/P24016_Tokopedia_Ramadan_128.mp4

## Next Steps:
1. Use Wrangler CLI for files > 300MB
2. Consider video compression for better performance
3. Update React app with new video URLs after upload
