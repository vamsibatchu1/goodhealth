import { NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Utility to ensure data directory exists
async function ensureDataDir() {
  const dirPath = join(process.cwd(), 'data');
  try {
    await mkdir(dirPath, { recursive: true });
  } catch (err) {
    // Ignore if exists
  }
  return dirPath;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'health';

  try {
    const dirPath = await ensureDataDir();
    const filePath = join(dirPath, `${type}.json`);
    const data = await readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    // If file doesn't exist, return empty array
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'health';
  
  try {
    const newEntry = await request.json();
    const dirPath = await ensureDataDir();
    const filePath = join(dirPath, `${type}.json`);
    
    let existingData = [];
    try {
      const data = await readFile(filePath, 'utf-8');
      existingData = JSON.parse(data);
    } catch (err) {
      // File doesn't exist yet
    }
    
    existingData.push({
      ...newEntry,
      timestamp: new Date().toISOString()
    });
    
    await writeFile(filePath, JSON.stringify(existingData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ success: false, message: 'Failed to save data' }, { status: 500 });
  }
}
