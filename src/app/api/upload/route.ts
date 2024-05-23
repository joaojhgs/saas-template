import { NextRequest, NextResponse } from 'next/server';

import { uploadFile } from '@/server/use-cases/upload-file';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log('formData: ', formData);

    const file = formData.getAll('file')[0] as File;
    const { data, error } = await uploadFile({ fileName: file.name, file });

    if (error) {
      return NextResponse.json({ status: 'fail', data: error });
    }
    return NextResponse.json({ status: 'success', data });
  } catch (e) {
    return NextResponse.json({ status: 'fail', data: e });
  }
}
