import { Dropdown, Menu, Table, TableProps } from "antd"
import { ButtonNoPadding } from "components/lib"
import { Pin } from "components/pin"
import dayjs from "dayjs"
import React from "react"
import { Link } from "react-router-dom"
import { useEditProject } from "utils/project"
import { useProjectModel } from "utils/url"
import { User } from "./search-panel"
export interface Project {
    id: number,
    name: string,
    personId: number,
    pin: boolean,
    organization: string,
    created: number
}
interface ListProps extends TableProps<Project> {
    users: User[],
    refresh?: () => void
}
// moment.js已经停止维护，用day.js Api和它很像
export const List = ({users, ...props} : ListProps)=> {
    const { mutate } = useEditProject()
    const { open } = useProjectModel()
    // 柯里化
    const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(props.refresh)
    return <Table 
    rowKey={"id"}
    pagination={false} 
    columns={[
        {
            title: <Pin checked={true} disabled={true}/>,
            render(value, project) {
                return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}/>
            }
        },
        {
            title: '名称',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render(value, project) {
                return <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
            }
        },
        {
            title: '部门',
            dataIndex: 'organization',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: '负责人',
            render(value, project) {
                return <span>
                    {users.find((user:User) => user.id === project.personId)?.name || "未知"}
                </span>
            }
        },
        {
            title: '创建时间',
            render(value, project) {
                return <span>
                    {project.created ? dayjs(project.created).format('YYYY-MM-DD'): '无'}
                </span>
            }
        },
        {
            render(value, project) {
                return <Dropdown overlay={
                    <Menu>
                        <Menu.Item key={'edit'}>
                        <ButtonNoPadding type={'link'} onClick={open}>编辑</ButtonNoPadding>
                        </Menu.Item>
                        <Menu.Item key={'edit'}>
                          {/* <ButtonNoPadding type={'link'} onClick={() => {}}>删除</ButtonNoPadding> */}
                        </Menu.Item>
                    </Menu>
                }>
                    <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
                </Dropdown>
            }
        }
    ]} 
    {...props}>
    </Table>
}