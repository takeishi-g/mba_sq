const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")
const PORT = 8000
const app = express()

const URL = "https://www.apple.com/jp/shop/refurbished/mac/macbook-air"
const findModel = "15インチMacBook Air"
const data = []

axios(URL).then((res) => {
  const htmlParser = res.data
  const $ = cheerio.load(htmlParser)

  $("ul > li > h3 > a ", htmlParser).each(function(){
    const title = $(this).text()
    const href = $(this).attr('href')
    const url = `https://apple.com/${href}`
    if(title.includes(findModel)){
      data.push({title, url})
    }
  })
  console.log(data)
})


app.listen(PORT, console.log("surver running"))