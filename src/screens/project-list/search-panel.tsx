import { Form, Input } from "antd"
import { UserSelect } from "components/user-select"
import React from "react"
import { Project } from "types/project"
export interface User {
    id: number,
    name: string,
    email: string,
    title: string,
    organization: string,
    token: string
}
interface SearchPanelProps {
    users: User[],
    param: Partial<Pick<Project, 'name' | 'personId'>>,
    setParam: (param: SearchPanelProps['param']) => void
}
export const SearchPanel = ({param, setParam, users}: SearchPanelProps)=> {
    
    return <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
        <Form.Item>
            <Input type="text" value={param.name} onChange={evt=> setParam({
                ...param,
                name: evt.target.value
            })}/>
        </Form.Item>
        <Form.Item>
            <UserSelect defaultOptionName={'负责人'} value={param.personId} onChange={ value => setParam({
                ...param,
                personId: value
            })}/>
        </Form.Item>
    </Form>
}