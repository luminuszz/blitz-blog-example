import { forwardRef, ForwardRefRenderFunction } from "react"

import {
  Textarea as ChakraTextarea,
  TextareaProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react"
import { FieldError } from "react-hook-form"

interface Props extends TextareaProps {
  error?: string | FieldError
  label: string
  id?: string
  name?: string
}

type TextAreaRef = HTMLTextAreaElement

const TextareaComponent: ForwardRefRenderFunction<TextAreaRef, Props> = (
  { error, label, id, name, ...props },
  ref
) => {
  return (
    <FormControl id={id} isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <ChakraTextarea name={name} isInvalid={!!error} {...props} ref={ref} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export const Textarea = forwardRef(TextareaComponent)
