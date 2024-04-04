import { TableData } from "@/components/Table";
import { Order } from "./api/order/route";
import { fetchApi } from "@/service/productService";

export interface Responses<T> {
  message: string;
  status: number;
  payload: T;
}

export default async function Home() {
  const orders = await fetchApi<Order[]>(process.env.ORDER);
  return (
    <main>
      <section className="w-[700px] mx-auto my-6">
        <TableData orders={orders} />
      </section>
    </main>
  );
}
