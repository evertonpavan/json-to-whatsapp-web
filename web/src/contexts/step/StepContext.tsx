import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react'

type StepContextProps = {
  children: ReactNode
}

interface Helpers {
  goToNextStep: () => void
  goToPrevStep: () => void
  reset: () => void
  canGoToNextStep: boolean
  canGoToPrevStep: boolean
  setStep: Dispatch<SetStateAction<number>>
}

type setStepCallbackType = (step: number | ((step: number) => number)) => void

interface IStepContext {
  currentStep: number
  helpers: Helpers
}

export const intialValue: IStepContext = {
  currentStep: 1,
  helpers: {
    goToNextStep: () => {},
    goToPrevStep: () => {},
    reset: () => {},
    canGoToNextStep: true,
    canGoToPrevStep: false,
    setStep: (step) => {
      return step
    },
  },
}

const StepContext = createContext<IStepContext>(intialValue)

function StepContextProvider({ children }: StepContextProps) {
  const [currentStep, setCurrentStep] = useState<number>(
    intialValue.currentStep,
  )
  const [maxStep] = useState<number>(5) // TO DO: set this dynamically

  const canGoToNextStep = useMemo(
    () => currentStep + 1 <= maxStep,
    [currentStep, maxStep],
  )

  const canGoToPrevStep = useMemo(() => currentStep - 1 >= 1, [currentStep])

  const setStep = useCallback<setStepCallbackType>(
    (step) => {
      const newStep = step instanceof Function ? step(currentStep) : step

      if (newStep >= 1 && newStep <= maxStep) {
        setCurrentStep(newStep)
        return
      }

      throw new Error('Step not valid')
    },
    [maxStep, currentStep],
  )

  const goToNextStep = useCallback(() => {
    if (canGoToNextStep) {
      setCurrentStep((step) => step + 1)
    }
  }, [canGoToNextStep])

  const goToPrevStep = useCallback(() => {
    if (canGoToPrevStep) {
      setCurrentStep((step) => step - 1)
    }
  }, [canGoToPrevStep])

  const reset = useCallback(() => {
    setCurrentStep(1)
  }, [])

  return (
    <StepContext.Provider
      value={{
        currentStep,
        helpers: {
          goToNextStep,
          goToPrevStep,
          canGoToNextStep,
          canGoToPrevStep,
          setStep,
          reset,
        },
      }}
    >
      {children}
    </StepContext.Provider>
  )
}

export { StepContextProvider }
export default StepContext
