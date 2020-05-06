export default class Tag { // Plik i klasa pomocnicza dla wysylania i wyciagania danych z BD
  constructor (
    title,
    use,
    user = null,
    id = null
  ) {
    this.title = title
    this.use = use
    this.user = user
    this.id = id
  }
}
