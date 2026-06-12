import type { Difficulty, WordBank, WordMode, WordPair } from '../types';

const pair = (first: string, second: string, similarity: number): WordPair => ({
  w: [first, second],
  s: similarity,
  d: similarity >= 4 ? 'd' : 'f',
});

export const wordBank: WordBank = {
  Animais: [
    pair('Gato', 'Leão', 3), pair('Cachorro', 'Lobo', 5), pair('Águia', 'Falcão', 5), pair('Cobra', 'Lagarto', 2),
    pair('Baleia', 'Golfinho', 4), pair('Cavalo', 'Burro', 5), pair('Tigre', 'Onça', 5), pair('Coelho', 'Hamster', 4),
    pair('Pato', 'Ganso', 4), pair('Papagaio', 'Periquito', 5), pair('Tubarão', 'Arraia', 2), pair('Macaco', 'Gorila', 4),
    pair('Abelha', 'Vespa', 5), pair('Sapo', 'Rã', 5), pair('Jacaré', 'Crocodilo', 5), pair('Ovelha', 'Cabra', 4),
    pair('Rato', 'Esquilo', 3), pair('Coruja', 'Morcego', 2), pair('Formiga', 'Cupim', 3), pair('Polvo', 'Lula', 5),
    pair('Caranguejo', 'Lagosta', 4), pair('Camelo', 'Lhama', 3), pair('Rinoceronte', 'Hipopótamo', 3), pair('Pinguim', 'Foca', 2),
  ],
  Comidas: [
    pair('Pizza', 'Esfiha', 3), pair('Sushi', 'Sashimi', 5), pair('Hambúrguer', 'Sanduíche', 4), pair('Bolo', 'Torta', 4),
    pair('Sorvete', 'Picolé', 5), pair('Churrasco', 'Grelhado', 4), pair('Lasanha', 'Canelone', 5), pair('Coxinha', 'Quibe', 2),
    pair('Açaí', 'Smoothie', 3), pair('Brigadeiro', 'Trufa', 5), pair('Tapioca', 'Crepe', 4), pair('Feijoada', 'Cozido', 4),
    pair('Pão de Queijo', 'Biscoito de Queijo', 5), pair('Pastel', 'Empanada', 4), pair('Risoto', 'Arroz Cremoso', 5), pair('Macarrão', 'Nhoque', 3),
    pair('Panqueca', 'Waffle', 3), pair('Salada', 'Vinagrete', 2), pair('Pudim', 'Flan', 5), pair('Mousse', 'Gelatina', 3),
    pair('Café', 'Capuccino', 4), pair('Suco', 'Refrigerante', 2), pair('Taco', 'Burrito', 5), pair('Ramen', 'Sopa', 3),
  ],
  Profissões: [
    pair('Médico', 'Enfermeiro', 4), pair('Professor', 'Tutor', 5), pair('Policial', 'Segurança', 4), pair('Bombeiro', 'Salva-vidas', 3),
    pair('Advogado', 'Juiz', 4), pair('Piloto', 'Comissário', 3), pair('Chef', 'Cozinheiro', 5), pair('Arquiteto', 'Engenheiro', 4),
    pair('Dentista', 'Ortodontista', 5), pair('Ator', 'Dublê', 3), pair('Jornalista', 'Repórter', 5), pair('Fotógrafo', 'Cinegrafista', 4),
    pair('Programador', 'Analista', 4), pair('Designer', 'Ilustrador', 4), pair('Mecânico', 'Funileiro', 4), pair('Eletricista', 'Técnico', 3),
    pair('Veterinário', 'Biólogo', 3), pair('Psicólogo', 'Terapeuta', 5), pair('Contador', 'Auditor', 5), pair('Vendedor', 'Corretor', 3),
    pair('Padeiro', 'Confeiteiro', 4), pair('Barbeiro', 'Cabeleireiro', 5), pair('Motorista', 'Taxista', 4), pair('Maquiador', 'Esteticista', 4),
  ],
  Lugares: [
    pair('Praia', 'Piscina', 3), pair('Cinema', 'Teatro', 4), pair('Escola', 'Biblioteca', 3), pair('Hospital', 'Farmácia', 4),
    pair('Parque', 'Praça', 5), pair('Shopping', 'Mercado', 3), pair('Estádio', 'Ginásio', 5), pair('Aeroporto', 'Rodoviária', 4),
    pair('Museu', 'Galeria', 4), pair('Restaurante', 'Lanchonete', 5), pair('Igreja', 'Templo', 5), pair('Zoológico', 'Aquário', 4),
    pair('Hotel', 'Pousada', 5), pair('Fazenda', 'Sítio', 5), pair('Banco', 'Lotérica', 3), pair('Padaria', 'Cafeteria', 4),
    pair('Metrô', 'Estação', 4), pair('Porto', 'Marina', 4), pair('Castelo', 'Mansão', 3), pair('Floresta', 'Bosque', 5),
    pair('Laboratório', 'Clínica', 3), pair('Escritório', 'Coworking', 5), pair('Clube', 'Academia', 3), pair('Feira', 'Mercado Municipal', 4),
  ],
  Filmes: [
    pair('Batman', 'Superman', 4), pair('Harry Potter', 'Senhor dos Anéis', 3), pair('Star Wars', 'Star Trek', 5), pair('Frozen', 'Enrolados', 4),
    pair('Vingadores', 'Liga da Justiça', 5), pair('Toy Story', 'Monstros S.A.', 4), pair('Matrix', 'Inception', 4), pair('Titanic', 'Poseidon', 3),
    pair('Jurassic Park', 'King Kong', 3), pair('Homem-Aranha', 'Homem de Ferro', 4), pair('Breaking Bad', 'Narcos', 4), pair('Friends', 'How I Met Your Mother', 5),
    pair('Avatar', 'Duna', 3), pair('Crepúsculo', 'Diários de um Vampiro', 4), pair('Shrek', 'Madagascar', 3), pair('Procurando Nemo', 'Moana', 3),
    pair('O Rei Leão', 'Mogli', 4), pair('Interestelar', 'Gravidade', 4), pair('Rocky', 'Creed', 5), pair('Velozes e Furiosos', 'Taxi', 3),
    pair('Round 6', 'Jogos Vorazes', 3), pair('The Office', 'Brooklyn Nine-Nine', 4), pair('Stranger Things', 'Dark', 4), pair('La Casa de Papel', 'Prison Break', 4),
  ],
  Esportes: [
    pair('Futebol', 'Futsal', 5), pair('Basquete', 'Vôlei', 2), pair('Tênis', 'Badminton', 5), pair('Natação', 'Mergulho', 4),
    pair('Boxe', 'MMA', 4), pair('Skate', 'Patins', 3), pair('Surfe', 'Bodyboard', 5), pair('Golfe', 'Sinuca', 2),
    pair('Corrida', 'Ciclismo', 3), pair('Judô', 'Karatê', 5), pair('Handebol', 'Polo Aquático', 2), pair('Vôlei de Praia', 'Squash', 2),
    pair('Beisebol', 'Softbol', 5), pair('Rugby', 'Futebol Americano', 4), pair('Escalada', 'Rapel', 4), pair('Bocha', 'Boliche', 3),
    pair('Esgrima', 'Kendo', 4), pair('Ginástica', 'Dança', 3), pair('Remo', 'Canoagem', 5), pair('Triatlo', 'Maratona', 3),
    pair('Snowboard', 'Esqui', 5), pair('Arco e Flecha', 'Tiro Esportivo', 4), pair('Crossfit', 'Musculação', 4), pair('Pingue-pongue', 'Tênis', 4),
  ],
  Tecnologia: [
    pair('Celular', 'Tablet', 4), pair('Notebook', 'Computador', 5), pair('Mouse', 'Touchpad', 4), pair('Teclado', 'Controle', 2),
    pair('Wi-Fi', 'Bluetooth', 3), pair('Carregador', 'Power Bank', 4), pair('Fone', 'Headset', 5), pair('Câmera', 'Webcam', 4),
    pair('Aplicativo', 'Site', 3), pair('Senha', 'Token', 4), pair('Robô', 'Drone', 3), pair('Impressora', 'Scanner', 4),
    pair('Console', 'PC Gamer', 4), pair('Smartwatch', 'Pulseira Fitness', 5), pair('Pendrive', 'HD Externo', 4), pair('Roteador', 'Modem', 5),
    pair('Tela', 'Monitor', 5), pair('Algoritmo', 'Código', 3), pair('Nuvem', 'Servidor', 4), pair('Streaming', 'Download', 3),
  ],
  Objetos: [
    pair('Caneta', 'Lápis', 5), pair('Caderno', 'Agenda', 4), pair('Mochila', 'Bolsa', 5), pair('Chave', 'Cadeado', 4),
    pair('Relógio', 'Cronômetro', 5), pair('Óculos', 'Lente', 4), pair('Guarda-chuva', 'Capa de Chuva', 4), pair('Garrafa', 'Copo', 3),
    pair('Sofá', 'Poltrona', 5), pair('Mesa', 'Bancada', 4), pair('Cama', 'Colchão', 4), pair('Espelho', 'Vidro', 3),
    pair('Martelo', 'Marreta', 5), pair('Tesoura', 'Estilete', 4), pair('Lanterna', 'Abajur', 3), pair('Vassoura', 'Rodo', 4),
    pair('Panela', 'Frigideira', 4), pair('Prato', 'Tigela', 4), pair('Controle Remoto', 'Joystick', 3), pair('Carteira', 'Porta-moedas', 5),
  ],
  Natureza: [
    pair('Rio', 'Lago', 4), pair('Mar', 'Oceano', 5), pair('Montanha', 'Morro', 5), pair('Floresta', 'Selva', 5),
    pair('Chuva', 'Tempestade', 4), pair('Neve', 'Granizo', 4), pair('Vento', 'Brisa', 5), pair('Sol', 'Lua', 2),
    pair('Vulcão', 'Gêiser', 3), pair('Deserto', 'Savana', 3), pair('Caverna', 'Gruta', 5), pair('Ilha', 'Arquipélago', 4),
    pair('Cachoeira', 'Corredeira', 4), pair('Areia', 'Terra', 3), pair('Pedra', 'Rocha', 5), pair('Folha', 'Galho', 3),
    pair('Raiz', 'Tronco', 4), pair('Nuvem', 'Neblina', 4), pair('Trovão', 'Relâmpago', 4), pair('Planeta', 'Estrela', 2),
  ],
  Música: [
    pair('Violão', 'Guitarra', 5), pair('Piano', 'Teclado', 5), pair('Bateria', 'Percussão', 5), pair('Flauta', 'Saxofone', 3),
    pair('Cantor', 'Vocalista', 5), pair('Banda', 'Orquestra', 3), pair('Show', 'Festival', 4), pair('Microfone', 'Caixa de Som', 3),
    pair('Samba', 'Pagode', 5), pair('Rock', 'Metal', 4), pair('Rap', 'Trap', 5), pair('Sertanejo', 'Forró', 3),
    pair('DJ', 'Produtor', 4), pair('Álbum', 'Playlist', 3), pair('Refrão', 'Verso', 4), pair('Ritmo', 'Batida', 5),
    pair('Partitura', 'Cifra', 4), pair('Karaokê', 'Dublagem', 2), pair('Ópera', 'Musical', 4), pair('Vinil', 'CD', 4),
  ],
  Jogos: [
    pair('Xadrez', 'Damas', 5), pair('Banco Imobiliário', 'Jogo da Vida', 4), pair('Uno', 'Baralho', 4), pair('Dominó', 'Trilha', 3),
    pair('Minecraft', 'Terraria', 5), pair('Fortnite', 'PUBG', 5), pair('Mario Kart', 'Crash Team Racing', 5), pair('FIFA', 'PES', 5),
    pair('The Sims', 'Animal Crossing', 4), pair('GTA', 'Watch Dogs', 4), pair('Zelda', 'Elden Ring', 3), pair('Pokémon', 'Digimon', 4),
    pair('Among Us', 'Cidade Dorme', 5), pair('Stop', 'Forca', 3), pair('Imagem e Ação', 'Mímica', 5), pair('Detetive', 'Clue', 5),
    pair('Jenga', 'Cai-não-cai', 4), pair('RPG', 'RPG de Mesa', 4), pair('Quebra-cabeça', 'Sudoku', 4), pair('Quiz', 'Trivia', 5),
  ],
};

export type CategoryMeta = {
  color: string;
  paths: string[];
};

export const categoryMeta: Record<string, CategoryMeta> = {
  Animais: { color: '#e0863f', paths: ['M5.5 9.5a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2z', 'M9.5 6.8a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4z', 'M14.5 6.8a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4z', 'M18.5 9.5a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2z', 'M12 11c-2.6 0-4.5 2.2-4.5 4.5 0 1.9 1.8 3 4.5 3s4.5-1.1 4.5-3c0-2.3-1.9-4.5-4.5-4.5z'] },
  Comidas: { color: '#d9b14a', paths: ['M18 8h1a4 4 0 0 1 0 8h-1', 'M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z', 'M6 1v3', 'M10 1v3', 'M14 1v3'] },
  Profissões: { color: '#5ea0c9', paths: ['M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z', 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'] },
  Lugares: { color: '#6bb36b', paths: ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'] },
  Filmes: { color: '#b08fd4', paths: ['M19.8 2H4.2A2.2 2.2 0 0 0 2 4.2v15.6A2.2 2.2 0 0 0 4.2 22h15.6a2.2 2.2 0 0 0 2.2-2.2V4.2A2.2 2.2 0 0 0 19.8 2z', 'M7 2v20', 'M17 2v20', 'M2 12h20', 'M2 7h5', 'M2 17h5', 'M17 17h5', 'M17 7h5'] },
  Esportes: { color: '#d4795e', paths: ['M8 21h8', 'M12 17v4', 'M7 4h10v4a5 5 0 0 1-10 0V4z', 'M17 5h3v2a3 3 0 0 1-3 3', 'M7 5H4v2a3 3 0 0 0 3 3'] },
  Tecnologia: { color: '#67b7d1', paths: ['M4 6h16v10H4z', 'M8 20h8', 'M12 16v4', 'M8 10h.01', 'M12 10h.01', 'M16 10h.01'] },
  Objetos: { color: '#c6a05c', paths: ['M6 3h12v18H6z', 'M9 7h6', 'M9 11h6', 'M9 15h4'] },
  Natureza: { color: '#79b85a', paths: ['M12 22V12', 'M5 12c5 0 7-4 7-9 0 5 2 9 7 9-4 2-5 5-7 10-2-5-3-8-7-10z'] },
  Música: { color: '#d66aa0', paths: ['M9 18V5l10-2v13', 'M9 18a3 3 0 1 1-2-2.83', 'M19 16a3 3 0 1 1-2-2.83'] },
  Jogos: { color: '#8ab05d', paths: ['M7 8h10a5 5 0 0 1 4.7 3.3l.8 2.3A3.2 3.2 0 0 1 19.5 18H18l-2-2H8l-2 2H4.5a3.2 3.2 0 0 1-3-4.4l.8-2.3A5 5 0 0 1 7 8z', 'M8 12v4', 'M6 14h4', 'M16 13h.01', 'M19 15h.01'] },
};

export const difficultyMeta: Record<Difficulty, { label: string; hint: string; info: string }> = {
  facil: { label: 'Fácil', hint: 'bem diferentes', info: 'Palavras bem distintas - o impostor se denuncia fácil.' },
  misto: { label: 'Misto', hint: 'aleatório', info: 'Mistura de pares fáceis e difíceis.' },
  dificil: { label: 'Difícil', hint: 'quase iguais', info: 'Palavras quase idênticas - disfarce quase perfeito.' },
};

export const wordModeMeta: Record<WordMode, { label: string; hint: string; info: string }> = {
  similar: {
    label: 'Palavra parecida',
    hint: 'clássico',
    info: 'O impostor recebe uma palavra próxima da palavra dos agentes.',
  },
  context: {
    label: 'Contexto',
    hint: 'tema apenas',
    info: 'O impostor sabe só o tema do caso, sem receber a palavra exata.',
  },
  blank: {
    label: 'Sem palavra',
    hint: 'sem pista',
    info: 'O impostor não recebe palavra nem contexto. É o modo mais caótico.',
  },
};
