import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GET_PRODUCT_URL } from "../URL/url";
import { Responses } from "../page";
import { Product } from "../api/product/route";

const ProductPage = async () => {
  const getProduct = await fetch(GET_PRODUCT_URL);
  const { payload: products }: Responses<Product[]> = await getProduct.json();
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
