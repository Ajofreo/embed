describe('Slider', () => {
  before(() => {
    cy.visit('/slider-html.html')
  })

  it('should expose `tf` on `window`', () => {
    cy.window().then((win: any) => {
      expect(typeof win.tf).to.equal('object')
      expect(typeof win.tf.createSlider).to.equal('function')
    })
  })

  it('should not display popup on page load', () => {
    cy.get('.typeform-slider').should('not.exist')
  })

  it('should open popup', () => {
    cy.get('button#button').click()
    cy.get('.typeform-slider').should('be.visible')
    cy.get('.typeform-slider iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
  })

  it('should pass options as query param', () => {
    cy.get('.typeform-slider iframe')
      .invoke('attr', 'src')
      .should('contain', 'typeform-embed=popup-blank&typeform-source=localhost&typeform-medium=demo-test')
  })

  it('should close popup', () => {
    cy.get('a.typeform-close').click()
    cy.get('.typeform-slider').should('not.exist')
  })
})
