import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  description?: string;
  images: { id: number; url: string }[];
  attributes: { id: number; key: string; value: string }[];
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`/api/products/${params.slug}`, { cache: 'no-store' });
  if (res.status !== 200) {
    return <main>Produto não encontrado</main>;
  }
  const product: Product = await res.json();

  return (
    <main>
      <h1>{product.name}</h1>
      <p>R$ {product.price.toFixed(2)}</p>
      <div>
        {product.images.map(img => (
          <img key={img.id} src={img.url} alt={product.name} width={200} />
        ))}
      </div>
      <ul>
        {product.attributes.map(attr => (
          <li key={attr.id}>
            {attr.key}: {attr.value}
          </li>
        ))}
      </ul>
      <button>Personalizar</button>
      <p>
        <Link href="/catalogo">Voltar ao catálogo</Link>
      </p>
    </main>
  );
}
