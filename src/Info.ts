class Info {
   infoElement: HTMLDivElement

   constructor(text: string) {
      this.createDivElement(text)
   }

   private createDivElement(text: string) {
      const div = document.createElement('div')
      div.innerHTML = `<span>${text}</span>`
      div.classList.add('pb-3')
      div.classList.add('px-3')
      this.infoElement = div
   }
}

export default Info
