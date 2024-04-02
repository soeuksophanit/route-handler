import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GET_CATEGORY_URL } from "../URL/url";
import { Responses } from "../page";
import { Category } from "../api/category/route";

const ProductPage = async () => {
  const getProduct = await fetch(GET_CATEGORY_URL);
  const { payload: categories }: Responses<Category[]> =
    await getProduct.json();
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
