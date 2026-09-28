import { useState } from 'react'

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [storedValue, setStoredValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForNextValue, setWaitingForNextValue] = useState(false)

  const performCalculation = (first, second, operation) => {
    switch (operation) {
      case '+':
        return first + second
      case '-':
        return first - second
      case '*':
        return first * second
      case '/':
        return second === 0 ? 'Error' : first / second
      default:
        return second
    }
  }

  const handleNumber = (digit) => {
    if (waitingForNextValue) {
      setDisplay(String(digit))
      setWaitingForNextValue(false)
      return
    }

    setDisplay((prev) => (prev === '0' ? String(digit) : prev + digit))
  }

  const handleDecimal = () => {
    if (waitingForNextValue) {
      setDisplay('0.')
      setWaitingForNextValue(false)
      return
    }

    if (!display.includes('.')) {
      setDisplay((prev) => prev + '.')
    }
  }

  const handleOperator = (nextOperator) => {
    const inputValue = Number(display)

    if (storedValue === null) {
      setStoredValue(inputValue)
    } else if (operator && !waitingForNextValue) {
      const result = performCalculation(storedValue, inputValue, operator)
      setDisplay(String(result))
      setStoredValue(result)
    }

    setOperator(nextOperator)
    setWaitingForNextValue(true)
  }

  const displayText = operator && storedValue !== null
    ? waitingForNextValue
      ? `${storedValue} ${operator}`
      : `${storedValue} ${operator} ${display}`
    : display

  const handleEqual = () => {
    if (operator && storedValue !== null) {
      const currentValue = Number(display)
      const result = performCalculation(storedValue, currentValue, operator)
      setDisplay(String(result))
      setStoredValue(null)
      setOperator(null)
      setWaitingForNextValue(false)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setStoredValue(null)
    setOperator(null)
    setWaitingForNextValue(false)
  }

  const handleBackspace = () => {
    if (waitingForNextValue) {
      setDisplay(String(storedValue ?? 0))
      setWaitingForNextValue(false)
      return
    }

    setDisplay((prev) => {
      if (prev.length <= 1) return '0'
      return prev.slice(0, -1)
    })
  }

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ]

  return (
    <div className="calculator-shell">
      <h2>Simple Calculator</h2>

      <div className="calculator">
        <div className="display">{displayText}</div>

        <div className="button-row">
          <button className="clear" onClick={handleClear}>C</button>
          <button className="backspace" onClick={handleBackspace}>⌫</button>
        </div>

        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className="button-row">
            {row.map((button) => {
              if (button === '=') {
                return (
                  <button key={button} className="operator equals" onClick={handleEqual}>
                    {button}
                  </button>
                )
              }

              if (['+', '-', '*', '/'].includes(button)) {
                return (
                  <button key={button} className="operator" onClick={() => handleOperator(button)}>
                    {button}
                  </button>
                )
              }

              if (button === '.') {
                return (
                  <button key={button} className="number" onClick={handleDecimal}>
                    {button}
                  </button>
                )
              }

              return (
                <button key={button} className="number" onClick={() => handleNumber(button)}>
                  {button}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calculator
