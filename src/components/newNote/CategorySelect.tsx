import { useCategories } from "@/stores/categories";
import { NoteFormState } from "@/utils/types/common";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { Category } from "@prisma/client";
import { FC, SetStateAction } from "react";

type CategorySelectProps = {
  selectedCategoryId: Category["id"];
  setFormState: (value: SetStateAction<NoteFormState>) => void;
  itemsClassName?: string;
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
  itemsClassName,
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
    <Menu as="div" className="my-auto relative">
      <MenuButton className="flex items-center gap-4 bg-gray-100 justify-between py-2 px-4 h-10 w-48 rounded shadow-sm focus:ring-2 focus:ring-main">
        <span className="mx-auto">{selectedCategory?.type || "Category"}</span>
        <ChevronDownIcon className="text-black" width={20} height={20} />
        {selectedCategory && (
          <ColorCircle color={selectedCategory.lightColor} />
        )}
      </MenuButton>
      <MenuItems
        className={`absolute flex flex-col bg-white rounded shadow-md py-2 ${itemsClassName}`}
      >
        {categories.map((category) => {
          const isSelected = category.id === selectedCategoryId;

          return (
            <MenuItem key={category.id}>
              {({ focus }) => (
                <div
                  className={`${focus ? "hover:bg-slate-100" : ""} ${
                    isSelected ? "bg-slate-200" : ""
                  } cursor-pointer flex gap-2 items-center transition-colors duration-200" px-4 py-2`}
                  onClick={() => handleChangeCategory(category.id)}
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
                </div>
              )}
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};

export default CategorySelect;
