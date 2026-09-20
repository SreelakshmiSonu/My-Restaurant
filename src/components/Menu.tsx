import { useQuery } from "@apollo/client/react";
import { MENU_QUERY } from "../graphql/menu";
import TopHeader from "./TopHeader";
import Header from "./Header";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type MenuQueryResult = {
  menu: MenuItem[];
};

function Menu() {
  const { data, loading } = useQuery<MenuQueryResult>(MENU_QUERY);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No menu items found.</p>;

  return (
    <>
      <TopHeader />
      <Header />

      <div className="grid mt-18 grid-cols-3 gap-6">
        {data.menu.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <img src={item.image} className="w-full h-40 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
            <p className="text-lg text-gray-600">£{item.price}</p>
          </div>
        ))}
      </div>
    </>
  );
}


export default Menu;
