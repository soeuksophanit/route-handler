import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "../api/category/route";
import { fetchApi } from "@/service/productService";

const ProductPage = async () => {
  const categories = await fetchApi<Category[]>(process.env.CATEGORY);
  return (
    <Table className="w-[700px] mx-auto my-6">
      <TableCaption>The list of Category Lists</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Category ID</TableHead>
          <TableHead>Category Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map((cate, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{cate.category_id}</TableCell>
            <TableCell>{cate.category_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductPage;
