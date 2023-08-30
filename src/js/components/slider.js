import Swiper from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";

export const mainSlider = new Swiper(".slider", {
  modules: [Navigation],
  spaceBetween: 20,
  navigation: {
    prevEl: ".slider__button--prev",
    nextEl: ".slider__button--next",
    disabledClass: "slider__button--disabled",
  },
});
