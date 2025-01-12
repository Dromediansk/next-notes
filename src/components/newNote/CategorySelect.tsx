import { useCategories } from "@/stores/categories";
import { NoteFormState } from "@/utils/types/common";
import { CheckIcon } from "@heroicons/react/16/solid";
import { Category } from "@prisma/client";
import { FC, SetStateAction } from "react";
import { Dropdown } from "flowbite-react";

type CategorySelectProps = {
  selectedCategoryId: Category["id"];
  setFormState: (value: SetStateAction<NoteFormState>) => void;
};

type ColorCircleProps = {
  color: string;
};

const ColorCircle: FC<ColorCircleProps> = ({ color }) => (
  <span
    className="w-5 h-5 rounded-full"
    style={{
      backgroundColor: color,
    }}
  />
);

const CategorySelect: FC<CategorySelectProps> = ({
  selectedCategoryId,
  setFormState,
}) => {
  const { categories } = useCategories();
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  const handleChangeCategory = (categoryId: number) => {
    setFormState((prevState) => ({
      ...prevState,
      categoryId,
    }));
  };

  return (
    <Dropdown
      color="cyan"
      className="category-select__dropdown"
      label={
        <div className="flex items-center gap-4 justify-between w-32">
          <span className="mx-auto">
            {selectedCategory?.type || "Category"}
          </span>

          {selectedCategory && (
            <ColorCircle color={selectedCategory.lightColor} />
          )}
        </div>
      }
    >
      {categories.map((category) => {
        const isSelected = category.id === selectedCategoryId;

        return (
          <Dropdown.Item
            key={category.id}
            onClick={() => handleChangeCategory(category.id)}
            className={`flex gap-2 items-center ${
              isSelected ? "bg-slate-200" : ""
            }`}
          >
            <ColorCircle color={category.lightColor} />
            <span>{category.type}</span>
            {isSelected && (
              <CheckIcon
                className="text-gray-500 ml-auto"
                width={20}
                height={20}
              />
            )}
          </Dropdown.Item>
        );
      })}
    </Dropdown>
  );
};

export default CategorySelect;
