import { Select } from "antd";
import React from "react";
import { Raw } from "types";
// 提取原select的props
type SelectProps = React.ComponentProps<typeof Select>
// Omit删掉重复定义的参数
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value: Raw | null | undefined,
    onChange: (value?: number) => void,
    defaultOptionName? : string,
    options?:{ name: string, id: number}[]
}
export const IdSelect = (props: IdSelectProps) => {
    const {value, onChange, defaultOptionName, options, ...restProps} = props
    return <Select 
        {...restProps}
        value={toNumber(value)} 
        onChange={value =>onChange(toNumber(value))}>
            {
                defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
            }
            {options?.map(option => {
                return <Select.Option value={option.id}>{option.name}</Select.Option>
            })}
    </Select>
}
const toNumber = (value: unknown)=> isNaN(Number(value)) ? 0 : Number(value)