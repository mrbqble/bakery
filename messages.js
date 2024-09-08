const categories = {
  T: {
    'T-1': {
      name: {
        kz: 'Тартин тұтас дәнді',
        ru: 'Тартин Цельнозерновой'
      },
      weight: '700 гр',
      price: 650,
      number: 0
    },
    'T-2': {
      name: {
        kz: 'Тұтас дәнді тартин',
        ru: 'Тартин Цельнозерновой'
      },
      weight: '400 гр',
      code: 'Т-2',
      price: 450,
      number: 0
    },
    'T-3': {
      name: {
        kz: 'Тартин Чиа-зығыр',
        ru: 'Тартин Чиа-лен'
      },
      weight: '400 гр',
      code: 'Т-3',
      price: 590,
      number: 0
    },
    'T-4': {
      name: {
        kz: 'Пістелі Тартин',
        ru: 'Тартин Семечки'
      },
      weight: '400 гр',
      code: 'Т-4',
      price: 550,
      number: 0
    },
    'T-5': {
      name: {
        kz: 'Тартин Өрік-Жаңғақ',
        ru: 'Тартин Курага – Орех'
      },
      weight: '400 гр',
      code: 'Т-5',
      price: 590,
      number: 0
    },
    'T-6': {
      name: {
        kz: 'Чиабатта',
        ru: 'Чиабатта'
      },
      weight: '250 гр',
      code: 'Т-6',
      price: 290,
      number: 0
    },
    'T-7': {
      name: {
        kz: 'Тұтас дәнді багет',
        ru: 'Багет цельнозерновой'
      },
      weight: '300 гр',
      code: 'Т-7',
      price: 390,
      number: 0
    }
  },
  R: {
    'R-1': {
      name: {
        kz: 'Фермерлік',
        ru: 'Фермерский'
      },
      weight: '550 гр',
      code: 'R-1',
      price: 550,
      number: 0
    },
    'R-2': {
      name: {
        kz: 'Фермерлік багеті',
        ru: 'Багет Фермерский'
      },
      weight: '300 гр',
      code: 'R-2',
      price: 390,
      number: 0
    },
    'R-3': {
      name: {
        kz: 'Бородин наны',
        ru: 'Бородинский'
      },
      weight: '450 гр',
      code: 'R-3',
      price: 390,
      number: 0
    }
  },
  GF: {
    'GF-1': {
      name: {
        kz: 'Глютенсіз Жасыл қарақұмық',
        ru: 'Безглютен Зеленая гречка'
      },
      weight: '450 гр',
      code: 'GF-1',
      price: 690,
      number: 0
    },
    'GF-2': {
      name: {
        kz: 'Глютенсіз Жасыл қарақұмық',
        ru: 'Безглютен Зеленая гречка'
      },
      weight: '330 гр',
      code: 'GF-2',
      price: 490,
      number: 0
    },
    'GF-3': {
      name: {
        kz: 'Глютенсіз Жасыл қарақұмық',
        ru: 'Безглютен Зеленая гречка'
      },
      weight: '160 гр',
      code: 'GF-3',
      price: 390,
      number: 0
    },
    'GF-4': {
      name: {
        kz: 'Глютенсіз Ноқат',
        ru: 'Безглютен Нутовый'
      },
      weight: '450 гр',
      code: 'GF-4',
      price: 890,
      number: 0
    },
    'GF-5': {
      name: {
        kz: 'Глютенсіз Ноқат',
        ru: 'Безглютен Нутовый'
      },
      weight: '330 гр',
      code: 'GF-5',
      price: 690,
      number: 0
    },
    'GF-6': {
      name: {
        kz: 'Глютенсіз Ноқат',
        ru: 'Безглютен Нутовый'
      },
      weight: '160 гр',
      code: 'GF-6',
      price: 590,
      number: 0
    }
  }
}

const responses = {
  state: 'start',
  language: null,
  topic: null,
  company: null,
  bin: null,
  companyAddress: null,
  order: null,
  deliveryDate: null,
  deliveryAddress: null,
  confirmation: null
}

const messages = {
  start:
    'Cәлеметсіз бе! Біздің нандарымызға деген қызығушылығыңызға рахмет ❤️\nСізге қай тілде сұхбаттасқан ыңғайлы:\n\nЗдравствуйте! Благодарим Вас за интерес к нашей продукции ❤️\nНа каком языке Вам удобнее продолжить чат?',
  kz: {
    topic: 'Сіз хабарласып тұрсыз:',
    company: 'Компанияныңыздың ресми аты:',
    bin: 'Компанияныңыздың БСН/ЖСН:',
    invalidBIN: 'БСН/ЖСН дұрыс емес. Қайта енгізіңіз:',
    companyAddress: 'Компанияныңыздың мекен-жайы:',
    order: 'Қандай нандарға және қандай көлемде тапсырыс жасағыңыз келеді?',
    deliveryDate: 'Жеткізу күні:',
    deliveryAddress: 'Жеткізу мекен-жайы:',
    confirmation: 'Сіздің тапсырысыңыз, мұқият тексеруіңізді сұраймыз:',
    name: 'Аты-жөніңіз:',
    bucket: 'Cіздің тізіміңіз:'
  },
  ru: {
    topic: 'Вы связались по поводу:',
    company: 'Официальное название Вашей компании:',
    bin: 'БИН/ИИН Вашей компании:',
    invalidBIN: 'БИН/ИИН неверный. Пожалуйста, введите снова:',
    companyAddress: 'Адрес Вашей компании:',
    order: 'Какие хлеба и в каком количестве хотели бы заказать?',
    deliveryDate: 'Дата поставки:',
    deliveryAddress: 'Адрес доставки:',
    confirmation: 'Ваш заказ, просим внимательно проверить:',
    name: 'ФИО:',
    bucket: 'Ваш список:'
  }
}

const options = {
  start: [
    [
      { text: 'Қазақша', callback_data: 'kz' },
      { text: 'Русский', callback_data: 'ru' }
    ]
  ],
  kz: {
    topic: [
      [{ text: 'Көтерме сауда бойынша', callback_data: 'wholesale' }],
      [{ text: 'Бөлшек сауда бойынша', callback_data: 'retail' }]
    ],
    order: [
      [
        { text: 'Тапсырыс беру', callback_data: 'order' },
        { text: 'Тізімді қарау', callback_data: 'bucket' }
      ]
    ],
    bucket: [
      [
        { text: 'Тапсырыс беру', callback_data: 'order' },
        { text: 'Тізімді толтыру', callback_data: 'bucket' }
      ]
    ],
    confirmation: [
      [
        { text: 'Бәрі дұрыс, тапсырысты мақұлдаймын', callback_data: 'confirm' }
      ],
      [{ text: 'Менеджермен байланысу', callback_data: 'manager' }]
    ]
  },
  ru: {
    topic: [
      [{ text: 'Оптовая торговля', callback_data: 'wholesale' }],
      [{ text: 'Розничная торговля', callback_data: 'retail' }]
    ],
    order: [
      [
        { text: 'Оформить заказ', callback_data: 'order' },
        { text: 'Посмотреть корзину', callback_data: 'bucket' }
      ]
    ],
    bucket: [
      [
        { text: 'Оформить заказ', callback_data: 'order' },
        { text: 'Пополнить список', callback_data: 'bucket' }
      ]
    ],
    confirmation: [
      [{ text: 'Все верно, подтверждаю заказ', callback_data: 'confirm' }],
      [{ text: 'Связаться с менеджером', callback_data: 'manager' }]
    ]
  }
}

const checkBIN = (bin) => /^\d{12}$/.test(bin)

const getInlineKeyboard = (options) => {
  return {
    reply_markup: {
      inline_keyboard: options
    }
  }
}

const renderProductsKeyboard = () => {
  const rows = Object.keys(categories)
    .map((category) =>
      Object.keys(categories[category]).map((product) => [
        {
          text: `${product}`,
          callback_data: '+' + product
        },
        {
          text: `+`,
          callback_data: '+' + product
        },
        {
          text: `-`,
          callback_data: '-' + product
        },
        {
          text: `${categories[category][product].number}`,
          callback_data: '+' + product
        }
      ])
    )
    .flat()
  rows.push(options[responses.language].order[0])
  return rows
}

const renderBucket = () => {
  const rows = Object.keys(categories)
    .map((category) =>
      Object.keys(categories[category]).map((product) =>
        categories[category][product].number === 0
          ? []
          : [
              {
                text: `${product}`,
                callback_data: '+' + product
              },
              {
                text: `+`,
                callback_data: '+' + product
              },
              {
                text: `-`,
                callback_data: '-' + product
              },
              {
                text: `${categories[category][product].number}`,
                callback_data: '+' + product
              }
            ]
      )
    )
    .flat()
  rows.push(options[responses.language].bucket[0])
  return rows
}

module.exports = {
  messages,
  options,
  responses,
  categories,
  checkBIN,
  getInlineKeyboard,
  renderProductsKeyboard,
  renderBucket
}
