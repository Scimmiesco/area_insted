interface Cor  {
  nome: string;
  codigoHex: string;
} 
interface cores {
  cores: Cor[]
}


const cores: Cores = {
  cores: [
    {
      nome: 'Verde Menta Fresco',
      codigoHex: '#90ffde8e'
    },
    { nome: 'Rosa Lavanda Suave',
      codigoHex: '#d6bdeebd' 
    },
    {
      nome: 'Laranja Pêssego Acolhedor',
      codigoHex: '#93ff8f9c',
    },
    { nome: 'Azul Céu Sereno',  
      codigoHex: '#b4eaffcc'
    },
    {
      nome: 'Laranja Tropical Vibrante',
      codigoHex: '#ffd78dcc',
    },
  ];
}