import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  images: { id: number; url: string }[];
  attributes: { id: number; key: string; value: string }[];
}

interface ProductsResponse {
  products: Product[];
  page: number;
  totalPages: number;
}

function buildQuery(params: Record<string, any>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (!value) return;
    search.set(key, String(value));
  });
  return search.toString();
}

export default async function CatalogoPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const query = buildQuery(searchParams);
  const res = await fetch(`/api/products?${query}`, { cache: 'no-store' });
  const data: ProductsResponse = await res.json();
  const { products, page, totalPages } = data;

  return (
    <main>
      <h1>Catálogo</h1>
      <form>
        <input name="search" placeholder="Buscar" defaultValue={searchParams.search as string} />
        <input name="category" placeholder="Categoria" defaultValue={searchParams.category as string} />
        <input name="minPrice" placeholder="Preço mínimo" defaultValue={searchParams.minPrice as string} />
        <input name="maxPrice" placeholder="Preço máximo" defaultValue={searchParams.maxPrice as string} />
        <button type="submit">Filtrar</button>
      </form>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.images[0] && <img src={product.images[0].url} alt={product.name} width={150} />}
            <h2>{product.name}</h2>
            <p>R$ {product.price.toFixed(2)}</p>
            <ul>
              {product.attributes.map(attr => (
                <li key={attr.id}>
                  {attr.key}: {attr.value}
                </li>
              ))}
            </ul>
            <Link href={`/produto/${product.slug}`}>Personalizar</Link>
          </li>
        ))}
      </ul>
      <nav>
        {page > 1 && (
          <Link href={`/catalogo?${buildQuery({ ...searchParams, page: page - 1 })}`}>Anterior</Link>
        )}
        {page < totalPages && (
          <Link href={`/catalogo?${buildQuery({ ...searchParams, page: page + 1 })}`}>Próxima</Link>
        )}
      </nav>
    </main>
  );
}
