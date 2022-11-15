describe("Testing the library", () => {
  it("Should test that true is true", () => {
    // the keywords are two (interchangeable): "it" and "test"
    expect(true).toBe(true)
  })

  it("Should test that true is true", () => {
    expect(true).toBe(true)
  })

  it("null", () => {
    const n = null
    expect(n).toBeNull()
    expect(n).toBeDefined()
    expect(n).not.toBeUndefined()
    expect(n).not.toBeTruthy()
    expect(n).toBeFalsy()
  })

  it("Should test that 2 plus 2 is 4", () => {
    expect(2 + 2).toBe(4)
  })
})

describe("Testing inside another describe function", () => {
  it("Should test that false is false", () => {
    expect(false).toBe(false)
  })
})
