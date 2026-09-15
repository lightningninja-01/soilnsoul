import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { API_URL } from '@/lib/constants';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization') || '';
  if (!authHeader) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await fetch(`${API_URL}/revalidate`, {
      method: 'POST',
      headers: { Authorization: authHeader },
    });

    if (!res.ok) {
      return NextResponse.json({ success: false, message: 'Backend revalidation failed' }, { status: 401 });
    }

    revalidateTag('blogs', {});
    revalidatePath('/blog');
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ success: false, message: 'Revalidation failed' }, { status: 500 });
  }
}
