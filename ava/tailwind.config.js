/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        insted_logo: "url('/assets/images/logo-insted.svg')",
        insted_background: "url('/assets/images/fundo-insted.png')",
        checkmark: "url('/assets/checkmark.svg')",
        opened_eye: "url('/assets/olho-aberto.svg')",
        closed_eye: "url('/assets/olho-fechado.svg')",
      },
    },
    colors: {
      green_insted: "rgba(29, 169, 173,0.85)",
      green_insted_transp: "rgb(29, 169, 173,0.65)",
      white: "rgb(244, 242, 255)",
      white_transp: "rgba(244, 242, 255,0.85)",
      invalid_text: "rgba(210,70,70,0.85)",
    },
  },
  plugins: [],
};
