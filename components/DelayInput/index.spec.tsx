import { fireEvent, render, RenderResult, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { DelayInput } from './index'

describe('DelayInput', () => {
  let renderResult: RenderResult
  let handleChange: jest.Mock

  beforeEach(() => {
    jest.useFakeTimers()
    handleChange = jest.fn()
    renderResult = render(<DelayInput onChange={handleChange}/>)
  })

  afterEach(() => {
    renderResult.unmount()
    jest.useRealTimers()
  })

  it("shoud display empty in span", () => {
    const spanNode = screen.getByTestId('display-text') as HTMLSpanElement
    expect(spanNode).toHaveTextContent("typing text is:")
  })

  it('shoud display typing... after on change event occurs', () => {
    const inputText = 'Test Input Text'
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement
    fireEvent.change(inputNode, {target: {value: inputText}})
    const spanNode = screen.getByTestId('display-text') as HTMLSpanElement
    expect(spanNode).toHaveTextContent('typing...')
  })

  it('shoud display input text 1 second after on change event occurs', async () => {
    const inputText = 'Test Input Text'
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement
    fireEvent.change(inputNode, {target: {value: inputText}})
    await act(() => {
      jest.runAllTimers()
    })
    const spanNode = screen.getByTestId('display-text') as HTMLSpanElement
    expect(spanNode).toHaveTextContent(`typing text is: ${inputText}`)
  })

  it('should call onChange 1 second after onChange event occurs', async() => {
    const inputText = 'Test Input Text'
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement
    fireEvent.change(inputNode, {target: {value: inputText}})
    await act(() => {
      jest.runAllTimers()
    })
    expect(handleChange).toHaveBeenCalled()
  })
})