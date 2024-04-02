import { TableData } from "@/components/Table";
import { GET_ORDER_URL } from "./URL/url";
import { Order } from "./api/order/route";

export interface Responses<T> {
  message: string;
  status: number;
  payload: T;
}

export default async function Home() {
  const getOrder = await fetch(GET_ORDER_URL, { method: "GET" });
  const { payload: orders }: Responses<Order[]> = await getOrder.json();
  return (
    <main>
      <section className="w-[700px] mx-auto my-6">
        <TableData orders={orders} />
      </section>
    </main>
  );
}
