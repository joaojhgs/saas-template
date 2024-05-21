import { NextRequest, NextResponse } from 'next/server';

import { uploadFile } from '@/server/use-cases/upload-file';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.getAll('files')[0] as File;
    const { data, error } = await uploadFile(file.name, file);

    if (error) {
      return NextResponse.json({ status: 'fail', data: error });
    }
    return NextResponse.json({ status: 'success', data });
  } catch (e) {
    return NextResponse.json({ status: 'fail', data: e });
  }
}
