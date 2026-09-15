'use client';

import { API_URL } from '@/lib/constants';

export default function BlogPostBody({ body }: { body: string }) {
  const API_BASE = API_URL.replace('/api', '');
  // Fix any relative /uploads image paths in content
  const fixedContent = (body || '').replace(
    /src="\/uploads\//g,
    `src="${API_BASE}/uploads/`
  );

  return (
    <div
      className="blog-body"
      dangerouslySetInnerHTML={{ __html: fixedContent }}
    />
  );
}
