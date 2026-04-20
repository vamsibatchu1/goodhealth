import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to the root uploads/ directory
    const path = join(process.cwd(), 'uploads', file.name);
    await writeFile(path, buffer);
    console.log(`Saved file to ${path}`);

    return NextResponse.json({ success: true, fileName: file.name });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ success: false, message: 'Error saving file' }, { status: 500 });
  }
}
