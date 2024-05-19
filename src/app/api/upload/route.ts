import { NextRequest, NextResponse } from 'next/server';

import { uploadFile } from '@/server/use-cases/upload-file';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.getAll('files')[0] as File;
    await uploadFile(file.name, file);
    return NextResponse.json({ status: 'success', data: file.size });
  } catch (e) {
    return NextResponse.json({ status: 'fail', data: e });
  }
}
