import { FormControl, FormLabel, Input } from "@chakra-ui/react"

export default function UnrequiredField({fieldName, type, value, handleFieldChange}: any) {
    return (
        <>
            <FormControl pt='4'>
                <FormLabel>{fieldName}:</FormLabel>
                    <Input type={type} placeholder={fieldName} value={value} onChange={handleFieldChange}/>
            </FormControl>
        </>
    )
}