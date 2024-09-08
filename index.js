require('dotenv').config()
const { Bot, GrammyError, HttpError } = require('grammy')
const { hydrate } = require('@grammyjs/hydrate')
const {
  messages,
  options,
  responses,
  categories,
  checkBIN,
  getInlineKeyboard,
  renderProductsKeyboard,
  renderBucket
} = require('./messages')

const token = process.env.TOKEN
const bot = new Bot(token)
bot.use(hydrate())

bot.command('start', async (ctx) => {
  await ctx.reply(messages.start, getInlineKeyboard(options.start))
})

bot.callbackQuery(['kz', 'ru'], async (ctx) => {
  responses.language = ctx.match
  responses.state = 'languageSelected'
  const language = responses.language === 'kz' ? 'Қазақша' : 'Русский'
  await Promise.all([
    ctx.answerCallbackQuery(language),
    ctx.callbackQuery.message.editText(messages.start + '\n\n' + language),
    ctx.reply(
      messages[responses.language].topic,
      getInlineKeyboard(options[responses.language].topic)
    )
  ])
})

bot.callbackQuery(['wholesale', 'retail'], async (ctx) => {
  responses.topic = ctx.match
  responses.state = 'topicSelected'
  const topic =
    responses.topic === 'wholesale'
      ? responses.language === 'kz'
        ? 'Көтерме сауда бойынша'
        : 'Оптовая торговля'
      : responses.language === 'kz'
        ? 'Бөлшек сауда бойынша'
        : 'Розничная торговля'
  if (responses.topic === 'wholesale') {
    await Promise.all([
      ctx.answerCallbackQuery(topic),
      ctx.callbackQuery.message.editText(
        messages[responses.language].topic + '\n\n' + topic
      ),
      ctx.reply(messages[responses.language].company)
    ])
  } else {
    await Promise.all([
      ctx.answerCallbackQuery(topic),
      ctx.callbackQuery.message.editText(
        messages[responses.language].topic + '\n\n' + topic
      ),
      ctx.reply(messages[responses.language].name)
    ])
  }
})

bot.callbackQuery(/\+/, async (ctx) => {
  const {
    match: { input }
  } = ctx
  const [_, id] = input.split('+')
  const [category] = id.split('-')
  categories[category][id].number++
  await Promise.all([
    ctx.answerCallbackQuery(
      responses.language === 'kz' ? `${id} қосылды` : `${id} добавлено`
    ),
    ctx.editMessageReplyMarkup(getInlineKeyboard(renderProductsKeyboard()))
  ])
})

bot.callbackQuery(/\-/, async (ctx) => {
  const {
    match: { input }
  } = ctx
  const [_, category, number] = input.split('-')
  const id = category + '-' + number

  if (categories[category][id].number !== 0) {
    categories[category][id].number--
    await Promise.all([
      ctx.answerCallbackQuery(
        responses.language === 'kz' ? `${id} алынып тасталды` : `${id} удалено`
      ),
      ctx.editMessageReplyMarkup(getInlineKeyboard(renderProductsKeyboard()))
    ])
  } else {
    await ctx.answerCallbackQuery()
  }
})

bot.callbackQuery('bucket', async (ctx) => {
  await Promise.all([
    ctx.answerCallbackQuery(
      responses.language === 'kz' ? 'Тізімді қарау' : 'Посмотреть корзину'
    ),
    ctx.callbackQuery.message.editText(
      messages[responses.language].bucket,
      getInlineKeyboard(renderBucket())
    )
  ])
})

bot.callbackQuery('order', async (ctx) => {
  responses.state = 'orderSelected'
  await ctx.reply(messages[responses.language].deliveryDate)
})

bot.on('message', async (ctx) => {
  const {
    message: { text }
  } = ctx
  switch (responses.state) {
    case 'topicSelected':
      if (responses.topic === 'retail') {
        responses.name = text
        responses.state = 'nameSelected'
        await ctx.reply(
          messages[responses.language].order,
          getInlineKeyboard(renderProductsKeyboard())
        )
      } else {
        responses.company = text
        responses.state = 'companySelected'
        await ctx.reply(messages[responses.language].bin)
      }
      break
    case 'companySelected':
      if (checkBIN(text)) {
        responses.bin = text
        responses.state = 'binSelected'
        await ctx.reply(messages[responses.language].companyAddress)
      } else {
        await ctx.reply(messages[responses.language].invalidBIN)
      }
      break
    case 'binSelected':
      responses.companyAddress = text
      responses.state = 'companyAddressSelected'
      await ctx.reply(
        messages[responses.language].order,
        getInlineKeyboard(renderProductsKeyboard())
      )
      break
    case 'orderSelected':
      responses.deliveryDate = text
      responses.state = 'deliveryDateSelected'
      await ctx.reply(messages[responses.language].deliveryAddress)
      break
    case 'deliveryDateSelected':
      responses.deliveryAddress = text
      responses.state = 'deliveryAddressSelected'
      await ctx.reply(messages[responses.language].confirmation)
      break
  }
  return
})

bot.catch((err) => {
  const {
    ctx: {
      update: { update_id }
    },
    error
  } = err
  console.error(`Error while handling update ${update_id}:`)

  if (error instanceof GrammyError) {
    console.error('Error in request:', error.description)
  } else if (error instanceof HttpError) {
    console.error("Couldn't contact Telegram:", error)
  } else {
    console.error('Unknown:', error)
  }
})

bot.start()
