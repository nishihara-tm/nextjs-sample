import { fireEvent, render, RenderResult, screen } from "@testing-library/react"
import { Input } from './index'

describe('Input', () => {
  let renderResult: RenderResult

  beforeEach(() => {
    renderResult = render(<Input id="username" label="Username" />)
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('should empty in input on initial render', () => {
    const inputNode = screen.getByLabelText('Username') as HTMLInputElement
    expect(inputNode).toHaveValue("")
  })

  it('should show input text', () => {
    const inputText = 'Test input text'
    const inputNode = screen.getByLabelText('Username') as HTMLInputElement
    fireEvent.change(inputNode, {target: {value: inputText}})

    expect(inputNode).toHaveValue(inputText)
  })

  it('should reset when user clicks button', () => {
    const inputText = 'Test Input Text'
    const inputNode = screen.getByLabelText('Username') as HTMLInputElement
    fireEvent.change(inputNode, {target: {value: inputText}})

    const buttonNode = screen.getByRole('button', {
      name: 'reset',
    }) as HTMLButtonElement
    fireEvent.click(buttonNode)

    expect(buttonNode).toHaveValue("")
  })
})