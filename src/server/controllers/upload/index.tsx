import { NextRequest, NextResponse } from 'next/server';

import { uploadFile } from '@/server/use-cases/upload-file';

export async function uploadController(
  req: NextRequest,
  { params }: { params: Promise<{ bucket: string }> },
) {
  try {
    const { bucket } = await params;
    const formData = await req.formData();

    const file = formData.getAll('file')[0] as File;
    const data = await uploadFile({ bucketName: bucket, file });
    return NextResponse.json({ status: 'success', data });
  } catch (e) {
    return NextResponse.json({ status: 'fail', data: e });
  }
}
