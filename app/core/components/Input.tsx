import { ForwardRefRenderFunction, forwardRef } from "react"

import {
  Input as ChakraInput,
  InputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react"
import { FieldError } from "react-hook-form"

interface Props extends InputProps {
  error?: string | FieldError
  label: string
  id?: string
  name?: string
}

type inputRefType = HTMLInputElement

const InputComponent: ForwardRefRenderFunction<inputRefType, Props> = (
  { error, label, id, name, ...props },
  ref
) => {
  return (
    <FormControl id={id} isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <ChakraInput name={name} {...props} ref={ref} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputComponent)
