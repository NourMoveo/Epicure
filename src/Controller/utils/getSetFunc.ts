import { VegetarianIcon, SpicyFoodIcon, VeganIcon } from "@/View/Photos";

export const getFlavorIcon = (flavorIcon: string): string | undefined => {
  switch (flavorIcon) {
    case "Spicy":
      return SpicyFoodIcon;
    case "Vegan":
      return VeganIcon;
    case "Vegetarian":
      return VegetarianIcon;
    default:
      return undefined;
  }
};
