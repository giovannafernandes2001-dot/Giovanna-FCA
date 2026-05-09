import type { Devotional, YouTubeLive } from '@/types'

export const mockDevotionals: Devotional[] = [
  {
    id: '1',
    title: 'A Videira Verdadeira',
    sermon_date: '2026-05-04',
    reflection_phrase:
      '"Eu sou a videira; vocês são os ramos. Se alguém permanecer em mim e eu nele, esse dará muito fruto." — João 15:5',
    bible_reference: 'João 15:1-8',
    bible_text:
      '1 "Eu sou a videira verdadeira e meu Pai é o agricultor. 2 Todo ramo que, estando em mim, não der fruto, ele o corta; e todo ramo que der fruto, ele poda para que dê mais fruto ainda. 3 Vocês já estão limpos pela palavra que lhes falei. 4 Permaneçam em mim, e eu permanecerei em vocês. Nenhum ramo pode dar fruto por si mesmo; tem que permanecer na videira. Nem vocês podem dar fruto, se não permanecerem em mim.\n\n5 "Eu sou a videira; vocês são os ramos. Se alguém permanecer em mim e eu nele, esse dará muito fruto; pois sem mim vocês não podem fazer nada. 6 Se alguém não permanecer em mim, será lançado fora como o ramo e secará. Esses ramos são apanhados, atirados ao fogo e queimados. 7 Se vocês permanecerem em mim e as minhas palavras permanecerem em vocês, pedirão o que quiserem, e lhes será concedido. 8 Meu Pai é glorificado quando vocês dão muito fruto, mostrando assim que são meus discípulos."',
    puc_summary: `**Contexto**\nJesus fala com seus discípulos na noite anterior à crucificação, usando a metáfora da videira para ensinar sobre dependência e fecundidade espiritual.

**Pontos centrais**\n1. **Permanecer em Cristo é condição de fecundidade.** O ramo separado da videira não tem vida própria — nossa produtividade espiritual nasce da comunhão com Jesus.\n2. **A poda é ato de amor e intenção.** O Pai não poda para punir, mas para ampliar a capacidade de dar fruto. Dificuldades podem ser instrumentos de crescimento.\n3. **A oração eficaz nasce do permanecer.** Quando permanecemos em Cristo e Sua Palavra permanece em nós, nossos desejos se alinham aos Seus propósitos.`,
    reflection_questions: [
      'Em que áreas da sua vida você tem dependido mais de seus próprios esforços do que da sua conexão com Cristo?',
      'Como você tem recebido os momentos de "poda" — dificuldades, perdas, correções — em sua jornada espiritual?',
      'O que significa concretamente "permanecer em Cristo" na sua rotina diária?',
      'Como a oração da sua vida reflete ou não esse permanecer?',
    ],
    closing_type: 'prayer',
    closing_content:
      'Senhor Jesus, Tu és a videira e eu sou apenas um ramo. Reconheço que sem Ti nada posso. Ajuda-me a permanecer em Ti cada dia — na Tua Palavra, na oração, na comunhão com o Teu povo. Recebo com gratidão cada processo de poda e confio que produzirás em mim o fruto que glorifica o Pai. Amém.',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    published: true,
    created_at: '2026-05-04T10:00:00Z',
  },
  {
    id: '2',
    title: 'Fé que Move Montanhas',
    sermon_date: '2026-04-27',
    reflection_phrase:
      '"Se vocês tiverem fé como um grão de mostarda, poderão dizer a esta montanha: Mova-se daqui para lá, e ela se moverá." — Mateus 17:20',
    bible_reference: 'Mateus 17:14-20',
    bible_text:
      '14 Quando chegaram à multidão, um homem se aproximou de Jesus e ajoelhou-se diante dele. 15 "Senhor, tem misericórdia do meu filho", disse ele. "Ele tem convulsões e está sofrendo muito. Frequentemente cai no fogo ou na água. 16 Eu o trouxe aos seus discípulos, mas eles não conseguiram curá-lo."\n\n17 "Ó geração incrédula e perversa!", respondeu Jesus, "até quando estarei com vocês? Até quando terei de suportá-los? Tragam-me o menino aqui." 18 Jesus repreendeu o demônio, e este saiu do menino, que ficou curado naquele momento.\n\n19 Então os discípulos foram a Jesus em particular e perguntaram: "Por que não conseguimos expulsá-lo?" 20 Ele respondeu: "Por causa da pequenez da fé de vocês. Digo-lhes a verdade: se vocês tiverem fé como um grão de mostarda, poderão dizer a esta montanha: Mova-se daqui para lá, e ela se moverá. Nada será impossível para vocês."',
    puc_summary: `**Contexto**\nJesus desceu do Monte da Transfiguração e encontrou uma situação de fracasso dos discípulos diante de uma necessidade real.

**Pontos centrais**\n1. **Fé não é quantidade, é qualidade.** Um grão de mostarda é pequeno, mas é real, vivo e funcional. Jesus não pede fé perfeita, mas fé genuína.\n2. **O fracasso pode ser porta de autoconhecimento.** Os discípulos foram honestos com Jesus sobre sua limitação. A honestidade espiritual abre caminho para crescimento.\n3. **O impossível é território de Deus.** O que está além da nossa capacidade está dentro da competência de Deus quando confiamos a Ele.`,
    reflection_questions: [
      'Você está sendo honesto com Deus sobre as áreas onde sua fé tem falhado?',
      'Qual "montanha" em sua vida precisa que você exerça fé — mesmo que pequena — hoje?',
      'O que diferencia a fé genuína da presunção religiosa?',
      'Como o grupo pode orar pelas montanhas que cada membro está enfrentando?',
    ],
    closing_type: 'prayer',
    closing_content:
      'Pai, confessamos que muitas vezes nossa fé é fraca e vacilante. Mas nos ancoramos não na grandeza da nossa fé, mas na grandeza de quem Tu és. Aumenta nossa fé, Senhor. Que possamos crer além do que vemos, confiando que o impossível é o Teu território. Amém.',
    youtube_url: null,
    published: true,
    created_at: '2026-04-27T10:00:00Z',
  },
]

export const mockLives: YouTubeLive[] = [
  {
    id: '1',
    title: 'Culto Dominical — 4 de Maio de 2026',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    live_date: '2026-05-04',
    is_live: false,
  },
  {
    id: '2',
    title: 'Culto Dominical — 27 de Abril de 2026',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    live_date: '2026-04-27',
    is_live: false,
  },
]
