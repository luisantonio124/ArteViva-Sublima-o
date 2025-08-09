import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

interface Params {
  params: { slug: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: true, attributes: true, category: true }
  });

  if (!product) {
    return new NextResponse('Not found', { status: 404 });
  }

  return NextResponse.json(product);
}
