import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const allowedSupplyListMimeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'image/jpeg',
  'image/png'
]);

const maxFileSize = 10 * 1024 * 1024;

function getCoreApiBaseUrl(): string | null {
  const url = process.env.CORE_API_URL;
  if (!url) return null;
  return url.replace(/\/$/, '');
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: 'File is required.' }, { status: 400 });
    }

    if (file.size > maxFileSize) {
      return NextResponse.json(
        { success: false, error: 'Upload a file smaller than 10 MB.' },
        { status: 400 }
      );
    }

    if (!allowedSupplyListMimeTypes.has(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Upload a PDF, Word, Excel, CSV, JPG, or PNG file.' },
        { status: 400 }
      );
    }

    const coreApiBaseUrl = getCoreApiBaseUrl();
    if (!coreApiBaseUrl) {
      console.error('CORE_API_URL is not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    const coreResponse = await fetch(`${coreApiBaseUrl}/api/contact/supply-list-upload`, {
      method: 'POST',
      body: uploadFormData
    });

    const result = await coreResponse.json().catch(() => null);

    if (!coreResponse.ok || !result?.success) {
      return NextResponse.json(
        { success: false, error: result?.error || 'Failed to upload file. Please try again.' },
        { status: coreResponse.status || 502 }
      );
    }

    return NextResponse.json({
      success: true,
      fileName: result.fileName,
      fileSize: result.fileSize,
      mimeType: result.mimeType,
      url: result.url
    });
  } catch (error) {
    console.error('Failed to upload quote supply list:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload file. Please try again.' },
      { status: 500 }
    );
  }
}
