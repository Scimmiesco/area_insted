/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  important: true,
  darkMode: "class",
  theme: {
    screens: {
      tablet: "750px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      backgroundImage: {
        insted_logo: "url('/assets/images/logo-insted.svg')",
        insted_background: "url('/assets/images/fundo-insted.png')",
        checkmark: "url('/assets/svg-icons/checkmark.svg')",
        opened_eye: "url('/assets/svg-icons/olho-aberto.svg')",
        closed_eye: "url('/assets/svg-icons/olho-fechado.svg')",
        placeholder_img: "url('/assets/svg-icons/placeholder_view_vector.svg')",
      },
    },
    colors: {
      text_color: "#063b3d",
      okay_button: "rgb(22, 129, 193)",
      green_insted: "#1da9ad",
      green_insted_dark: "#063b3d",
      green_insted_dark_shadow: "#021f20ad",
      green_insted_transp_dark: "rgba(35, 111, 114, 0.35)",
      green_insted_transp_dark_sideNav: "#016366ff",
      green_insted_transp: "rgba(103, 219, 223, 0.5)",
      green_insted_fundo_modal: "rgba(186, 234, 236, 0.384)",
      white: "rgb(226, 240, 237)",
      white_transp: "rgba(244, 242, 255,0.85)",
      invalid_text: "rgba(232, 86, 86, 0.85)",
    },
  },
  plugins: [],
};
