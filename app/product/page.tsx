import { HoverEffect } from "@/components/ui/card-hover-effect";
import { fetchApi } from "@/service/productService";
import { Product } from "../api/product/route";

export default async function ProductPage() {
  const products = await fetchApi<Product[]>(process.env.PRODUCT);
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={products} />
    </div>
  );
}
