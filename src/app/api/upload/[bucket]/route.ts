import { NextRequest, NextResponse } from 'next/server';

import { uploadFile } from '@/server/use-cases/upload-file';

export async function POST(
  req: NextRequest,
  { params }: { params: { bucket: string } },
) {
  try {
    const formData = await req.formData();

    const file = formData.getAll('file')[0] as File;
    const data = await uploadFile({ bucketName: params.bucket, file });
    return NextResponse.json({ status: 'success', data });
  } catch (e) {
    return NextResponse.json({ status: 'fail', data: e });
  }
}
