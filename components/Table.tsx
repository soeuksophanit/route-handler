import { Order } from "@/app/api/order/route";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props<T> {
  orders: T[];
}

export const TableData = ({ orders }: Props<Order>) => {
  return (
    <Table>
      <TableCaption>The list of Order Lists</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order ID</TableHead>
          <TableHead>Customer ID</TableHead>
          <TableHead>Product ID</TableHead>
          <TableHead>Order Qty</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead className="text-right">Total Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{order.order_id}</TableCell>
            <TableCell>{order.customer_id}</TableCell>
            <TableCell>{order.product_id}</TableCell>
            <TableCell>{order.order_qty}</TableCell>
            <TableCell>{order.order_date?.toString().slice(0, 10)}</TableCell>
            <TableCell className="text-right">{order.order_total} $</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
