import { useNavigate } from "react-router-dom";

const Category = ({ cate: { id, name, image } }) => {
  const navigate = useNavigate();

  const goToPage = () => {
    navigate(`/category-page/${id}`);
  };

  return (
    <div
      className="relative flex justify-center items-center hover:scale-105 transition duration-200 cursor-pointer w-full max-w-xs mx-auto"
      onClick={goToPage}
    >
      <div className="w-full aspect-square overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <h2 className="absolute bottom-4 text-white text-lg font-semibold bg-black/50 px-3 py-1 rounded">
        {name}
      </h2>
    </div>
  );
};
export default Category