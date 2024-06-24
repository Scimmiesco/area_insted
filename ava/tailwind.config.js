/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  important: true,
  darkMode: "class",
  theme: {
    screens: {
      tablet: "750px",
      laptop: "1024px",
      desktop: "1280px",
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
      colors:{
        highContrast:{
          DEFAULT: '#ffffff', // cor de fundo
          text: '#000000', // cor do texto
        }
      }
    },
    colors: {
      text_color: "#063b3d",
      okay_button: "rgb(22, 129, 193)",
      green_insted: "#028489",
      green_insted_dark: "#063b3d",
      green_insted_dark_shadow: "#021f20ad",
      green_insted_transp_dark: "rgba(35, 111, 114, 0.35)",
      green_insted_transp_dark_sideNav: "#016366ff",
      green_insted_transp: "rgba(103, 219, 223, 0.5)",
      green_insted_fundo_modal: "rgba(186, 234, 236, 0.384)",
      white: "rgb(255, 255, 255)",
      white_transp: "rgba(244, 242, 255,0.85)",
      invalid_text: "rgba(202, 12, 12, 1)",
      invalid_text_dark: "rgba(241, 59, 59, 1)",
      corFundo1: "rgb(124, 219, 148)",
      corFundo2: "rgb(255, 255, 153)",
      corFundo3: "rgb(233, 143, 236)",
      corFundo4: "rgb(238, 172, 128)",
      corFundo5: "rgb(135, 206, 235)",
      corFundo6: "rgb(255, 165, 0)",
      corFundo7: "rgb(204, 204, 255)",
      corFundo8: "rgb(173, 255, 47)",
    },
  },
  plugins: [],
};
