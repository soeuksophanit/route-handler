interface ApiResponse<T> {
  message: string;
  status: string;
  payload: T;
}

const fetchApi = async <T>(endPoint = "", id = "") => {
  const req = await fetch(process.env.BASE_URL + endPoint + id, {
    next: { revalidate: 1 },
  });
  const { payload }: ApiResponse<T> = await req.json();
  return payload;
};

export { fetchApi };
