import { Category, CategoryType } from "@prisma/client";

export const categories: Category[] = [
  {
    id: 1,
    type: CategoryType.PERSONAL,
    lightColor: '#FFD700',
    darkColor: '#FFA500'
  },
  {
    id:2,
    type: CategoryType.WORK,
    lightColor: '#4682B4',
    darkColor: '#4169E1'
  },
  {
    id: 3,
    type: CategoryType.EDUCATION,
    lightColor: '#32CD32',
    darkColor: '#008000'
  },
  {
    id: 4,
    type: CategoryType.TRAVEL,
    lightColor: '#FF69B4',
    darkColor: '#C71585'
  },
  {
    id: 5,
    type: CategoryType.HEALTH,
    lightColor: '#66CDAA',
    darkColor: '#3CB371'
  },
  {
    id: 6,
    type: CategoryType.FINANCE,
    lightColor: '#FFDAB9',
    darkColor: '#FFA07A'
  },
]