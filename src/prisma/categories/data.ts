import { Category, CategoryType } from "@prisma/client";


export const categories: Category[] = [
  {
    id: 1,
    type: CategoryType.PERSONAL,
    lightColor: '#B3E6F3',
    darkColor: '#4682B4'
  },
  {
    id: 2,
    type: CategoryType.WORK,
    lightColor: '#F4D1E5',
    darkColor: '#800080'
  },
  {
    id: 3,
    type: CategoryType.EDUCATION,
    lightColor: '#E3F3C9',
    darkColor: '#556B2F'
  },
  {
    id: 4,
    type: CategoryType.FINANCE,
    lightColor: '#FBF6D2',
    darkColor: '#8B4513'
  },
  {
    id: 5,
    type: CategoryType.HEALTH,
    lightColor: '#FFD2C1',
    darkColor: '#8B0000'
  },
  {
    id: 6,
    type: CategoryType.TRAVEL,
    lightColor: '#FFBCBC',
    darkColor: '#800080'
  },
];
