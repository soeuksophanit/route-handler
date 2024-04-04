import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "../api/product/route";
import { fetchApi } from "@/service/productService";

const ProductPage = async () => {
  const products = await fetchApi<Product[]>(process.env.PRODUCT);
  return (
    <Table className="w-[700px] mx-auto my-6">
      <TableCaption>The list of Product Lists</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Product ID</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Product Price</TableHead>
          <TableHead>Category ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((product, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{product.product_id}</TableCell>
            <TableCell>{product.product_name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.category_id}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductPage;
