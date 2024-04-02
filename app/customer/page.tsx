import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GET_CUSTOMER_URL } from "../URL/url";
import { Responses } from "../page";
import { Customer } from "../api/customer/route";

const ProductPage = async () => {
  const getCustomer = await fetch(GET_CUSTOMER_URL);
  const { payload: customers }: Responses<Customer[]> =
    await getCustomer.json();
  return (
    <Table className="w-[700px] mx-auto my-6">
      <TableCaption>The list of Customer Lists</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Customer ID</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Birth</TableHead>
          <TableHead>Money Spent</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers?.map((customer, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              {customer.customer_id}
            </TableCell>
            <TableCell>{customer.first_name}</TableCell>
            <TableCell>{customer.last_name}</TableCell>
            <TableCell>{customer.birth.toString().slice(0, 10)}</TableCell>
            <TableCell>{customer.money_spent} $</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductPage;
